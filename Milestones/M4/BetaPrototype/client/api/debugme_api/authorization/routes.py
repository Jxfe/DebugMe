from datetime import datetime
from datetime import timedelta
from datetime import timezone
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt, set_access_cookies, unset_jwt_cookies, set_refresh_cookies
from ..debugme_toolkit import db
from ..models.User import User, UserSchema

ROLES = {"basic": 0, "premium": 1, "mentor": 2, "admin": 3}

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

    if not email or not password:
        response = {'message': "Missing email or password"}
        return response, 400

    user = db.session.query(User).filter(User.email==email).first()
    if user:
        is_password_correct = check_password_hash(user.password, password)

        if is_password_correct:
            roles = get_roles(user.userRank)

            additional_claims = {
                    'id': user.id,
                    'username': user.name,
                    'email': user.email,
                    'userRank': user.userRank,
                    'roles': roles
                }

            access_token = create_access_token(identity=user.id, additional_claims=additional_claims)
            refresh_token = create_refresh_token(identity=user.id, additional_claims=additional_claims)

            additional_claims.update({'access_token': access_token})
            response = jsonify({"user": additional_claims})

            set_refresh_cookies(response, refresh_token)
            return response, 200

    response = jsonify({'message': 'Unauthorized'})
    return response, 401

@authorization.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"message": "Logout Successful"})
    unset_jwt_cookies(response)
    return response, 200

@authorization.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh_user_token():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)

    response = jsonify({'access_token': access_token})

    return response, 200

@authorization.route('/becomementor', methods=['PUT'])
@jwt_required(refresh=True)
def become_mentor():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    user.userRank = ROLES['mentor']
    db.session.commit()

    response = {"message": "You are now a Mentor!"}

    return jsonify(response), 200

@authorization.route('/becomepremium', methods=['PUT'])
@jwt_required(refresh=True)
def become_premium():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    user.userRank = ROLES['premium']
    db.session.commit()

    response = {"message": "You are now a Premium user!"}

    return jsonify(response), 200


@authorization.route('/whoami', methods=['GET'])
@jwt_required(refresh=True)
def whoami():
    user_id = get_jwt_identity()
    user = db.session.query(User).filter(User.id==user_id).first()

    response = jsonify({'username': user.name, 'email': user.email, 'userRank': user.userRank, 'roles': get_roles(user.userRank)})

    return response, 200

def get_roles(userRank):
    roles = []

    if userRank is not None:
        if userRank == 3:
            roles.append(ROLES['admin'])
        elif userRank == 2:
            roles.append(ROLES['basic'])
            roles.append(ROLES['mentor'])
        elif userRank == 1:
            roles.append(ROLES['basic'])
            roles.append(ROLES['premium'])
        elif userRank == 0:
            roles.append(ROLES['basic'])

    return roles