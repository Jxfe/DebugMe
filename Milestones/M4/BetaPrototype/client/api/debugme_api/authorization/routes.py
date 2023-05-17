from datetime import datetime
from datetime import timedelta
from datetime import timezone
from flask import Blueprint, request, jsonify, abort
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt, set_access_cookies, unset_jwt_cookies, set_refresh_cookies
from ..debugme_toolkit import db
from ..models.User import User, UserSchema

ROLES = {"basic": 0, "premium": 1, "mentor": 2, "premium_mentor": 3, "admin": 4}

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

    if user.userRank == ROLES['mentor'] or user.userRank == ROLES['premium_mentor']:
        abort(400, 'You are a Mentor already')

    elif user.userRank == ROLES['basic']:
        user.userRank = ROLES['mentor']

    elif user.userRank == ROLES['premium']:
        user.userRank = ROLES['premium_mentor']

    db.session.commit()

    response = {"message": "You are now a Mentor!"}

    return jsonify(response), 200

@authorization.route('/becomepremium', methods=['PUT', 'POST'])
@jwt_required(refresh=True)
def become_premium():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.userRank == ROLES['premium'] or user.userRank == ROLES['premium_mentor']:
        abort(400, 'You are a Premium member already')

    elif user.userRank == ROLES['basic']:
        user.userRank = ROLES['premium']

    elif user.userRank == ROLES['mentor']:
        user.userRank = ROLES['premium_mentor']

    db.session.commit()

    response = {"message": "You are now a Premium user!"}

    return jsonify(response), 200

@authorization.route('/removepremium', methods=['PUT', 'POST'])
@jwt_required(refresh=True)
def remove_premium():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.userRank == ROLES['basic'] or user.userRank == ROLES['mentor']:
        abort(400, 'You are not a Premium member')

    elif user.userRank == ROLES['premium']:
        user.userRank = ROLES['basic']

    elif user.userRank == ROLES['premium_mentor']:
        user.userRank = ROLES['mentor']

    db.session.commit()

    response = {"message": "You are no longer a Premium member"}

    return jsonify(response), 200

@authorization.route('/whoami', methods=['GET'])
@jwt_required(refresh=True)
def whoami():
    user_id = get_jwt_identity()
    user = db.session.query(User).filter(User.id==user_id).first()

    response = jsonify({'user_id':user_id,  'username': user.name, 'email': user.email, 'userRank': user.userRank, 'roles': get_roles(user.userRank)})

    return response, 200

def get_roles(userRank):
    roles = []
    if userRank is not None:

        ### Admin User
        if userRank == 4:
            roles.append(ROLES['admin'])

        ### Premium Mentor
        elif userRank == 3:
            roles.append(ROLES['basic'])
            roles.append(ROLES['premium'])
            roles.append(ROLES['mentor'])

        ### Mentor
        elif userRank == 2:
            roles.append(ROLES['basic'])
            roles.append(ROLES['mentor'])

        ### Premium
        elif userRank == 1:
            roles.append(ROLES['basic'])
            roles.append(ROLES['premium'])

        ### Basic
        elif userRank == 0:
            roles.append(ROLES['basic'])

    return roles