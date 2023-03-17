from flask_restful import Resource, reqparse, abort, fields, marshal_with
from sqlalchemy.ext.automap import automap_base
from . import db
from werkzeug.security import check_password_hash


class User_Auth(Resource):

    def __init__(self):
        self.user_table = db.Table('User', db.metadata, autoload_with=db.engine)

        self.Base = automap_base()
        self.Base.prepare(db.engine, reflect=True)
        self.User_Model = self.Base.classes.User

    def get(self, user_name, user_password):
        result = db.session.query(self.User_Model).filter_by(name=user_name).first()

        if not result:
            abort(404, message='User not in database')

        if check_password_hash(result.password, user_password):
            return {'Valid Password': True}, 200
        else:
            abort(403, message='Passwords did not match')
