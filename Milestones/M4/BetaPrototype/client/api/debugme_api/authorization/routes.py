from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from ..debugme_toolkit import db
from ..models.User import User, UserSchema

authorization = Blueprint("authorization", __name__, url_prefix="/api")

@authorization.route('/login', methods=['POST'])
def login():
    email = request.form.get('email', '')
    password = request.form.get('password', '')

    user = db.session.query(User).filter(User.email==email).first()

    if user:
        is_password_correct = check_password_hash(user.password, password)

        if is_password_correct:
            refresh_token = create_refresh_token(identity=user.id)
            access_token = create_access_token(identity=user.id)

            return jsonify({
                "user": {
                    'name': user.name,
                    'email': user.email,
                    'userRank': user.userRank,
                    'access_token': access_token,
                    'refresh_token': refresh_token
                }
            }), 200

    return jsonify({'error': 'Wrong Credentials'}), 401

@authorization.route('/whoami', methods=['POST'])
@jwt_required()
def whoami():
    user_schema = UserSchema()
    user_id = get_jwt_identity()
    user = db.session.query(User).filter(User.id==user_id).first()

    return user_schema.jsonify(user), 200

@authorization.route('/refresh', methods=['GET', 'POST'])
def refresh():
    pass

