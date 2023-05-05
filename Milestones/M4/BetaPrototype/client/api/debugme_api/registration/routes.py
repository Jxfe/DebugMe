from flask import request, jsonify, Blueprint
from ..debugme_toolkit import db
from ..models.User import User, UserSchema
from werkzeug.security import generate_password_hash

registration = Blueprint('register', __name__)

@registration.route('/api/register', methods=['POST'])
def register():
    name = request.form.get('name', False)
    email = request.form.get('email', False)
    password = request.form.get('password', False)

    encrypted_pwd = generate_password_hash(password, method='pbkdf2:sha512')

    new_user = User(name, email, encrypted_pwd)
    user_schema = UserSchema()
    db.session.add(new_user)
    db.session.commit()

    return user_schema.jsonify(new_user)

@registration.route('/api/checkEmailDuplicate', methods=['POST'])
def check_email_duplicate():
    email = request.form.get('email', False)

    result = db.session.query(User).filter(User.email==email).first()
    user_schema = UserSchema()

    return user_schema.jsonify(result)