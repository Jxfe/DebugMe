from flask import request,jsonify, make_response
from flask_restful import Resource
from debugme_api.config import Config
from ..debugme_toolkit import db
from ..models.User import User, UserSchema
from werkzeug.security import generate_password_hash

class Registration(Resource):
    def get(self):
        email = request.form['email']

        result = db.session.query(User).filter(User.email==email).first()
        user_schema = UserSchema()

        return user_schema.jsonify(result)

    def post(self):
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']

        encrypted_pwd = generate_password_hash(password, method='pbkdf2:sha512')

        new_user = User(name, email, encrypted_pwd)
        user_schema = UserSchema()
        db.session.add(new_user)
        db.session.commit()

        return user_schema.jsonify(new_user)