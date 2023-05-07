from datetime import datetime
from datetime import timedelta
from datetime import timezone
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt, set_access_cookies, unset_jwt_cookies
from ..debugme_toolkit import db
from ..models.User import User, UserSchema

authorization = Blueprint("authorization", __name__, url_prefix="/api")

@authorization.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response

@authorization.route('/login', methods=['POST'])
def login():
    email = request.form.get('email', '')
    password = request.form.get('password', '')

    user = db.session.query(User).filter(User.email==email).first()
    if user:
        is_password_correct = check_password_hash(user.password, password)

        if is_password_correct:
            access_token = create_access_token(identity=user.id)
            response = jsonify({
                "user": {
                    'name': user.name,
                    'email': user.email,
                    'userRank': user.userRank,
                    'access_token': access_token
                }})

            set_access_cookies(response, access_token)
            return response
    response = jsonify({'error': 'Wrong Credentials'})
    return response, 401

@authorization.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@authorization.route('/whoami', methods=['GET'])
@jwt_required()
def whoami():
    user_schema = UserSchema()
    user_id = get_jwt_identity()
    user = db.session.query(User).filter(User.id==user_id).first()

    return user_schema.jsonify(user), 200
