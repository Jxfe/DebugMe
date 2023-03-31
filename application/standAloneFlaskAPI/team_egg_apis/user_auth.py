from flask_restful import Resource, abort
from werkzeug.security import check_password_hash
from . import db


class UserAuth(Resource):
    class User(db.Model):
        __tablename__ = 'User'
        id = db.Column(db.Integer, primary_key=True, autoincrement=True)
        name = db.Column(db.String(255), nullable=False)
        email = db.Column(db.String(255), nullable=False, unique=True)
        password = db.Column(db.String(255), nullable=False)
        userRank = db.Column(db.String(255))
        created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.current_timestamp())

    def __init__(self):
        self.User_Model = self.User

    def get(self, user_name, user_password):
        result = self.User_Model.query.filter_by(name=user_name).first()

        if not result:
            abort(404, message='User not in database')

        if check_password_hash(result.password, user_password):
            return {'message': 'Successful password match'}, 200
        else:
            abort(403, message='Passwords did not match')
