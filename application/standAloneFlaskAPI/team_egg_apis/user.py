from flask_restful import Resource, reqparse, abort, fields, marshal_with
from sqlalchemy.ext.automap import automap_base
from . import db
from werkzeug.security import generate_password_hash


class User(Resource):
    resource_fields = {
        'id': fields.Integer,
        'name': fields.String,
        'email': fields.String,
        'password': fields.String,

    }

    def __init__(self):
        self._set_up_add_user_parser()
        self._set_up_basic_user_parser()

        self.user_table = db.Table('User', db.metadata, autoload_with=db.engine)

        self.Base = automap_base()
        self.Base.prepare(db.engine, reflect=True)
        self.User_Model = self.Base.classes.User

    @marshal_with(resource_fields)
    def get(self, user_name):

        result = db.session.query(self.User_Model).filter_by(name=user_name).first()
        if not result:
            abort(404, message='User not in database')

        return result, 200

    @marshal_with(resource_fields)
    def put(self, user_name):
        args = self.add_user_parser.parse_args()

        result = db.session.query(self.User_Model).filter_by(email=args['email']).first()

        if result:
            abort(409, message='User already in database')
        elif not self._is_valid_password(args['password']):
            abort(403, message='Not a valid password')
        else:
            new_user = self._add_use_to_database(args)
            return new_user, 201

    @marshal_with(resource_fields)
    def patch(self, user_name):
        args = self.user_parser.parse_args()

        patch_user = db.session.query(self.User_Model).filter_by(name=user_name).first()
        if not patch_user:
            abort(404, message='No user by that name')

        if args['name']:
            patch_user.name = args['name']
        if args['email']:
            patch_user.email = args['email']
        if args['password']:
            patch_user.password = generate_password_hash(args['password'], method='sha256')

        db.session.commit()

        return patch_user, 200



    def _is_valid_password(self, password):
        return True

    def _add_use_to_database(self, user_info):

        hashed_password = generate_password_hash(user_info['password'], method='sha256')

        new_user = self.User_Model(name=user_info['name'],
                                   email=user_info['email'],
                                   password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    def _set_up_add_user_parser(self):
        self.add_user_parser = reqparse.RequestParser()
        self.add_user_parser.add_argument("email", type=str, help="Email is required", required=True, location='form')
        self.add_user_parser.add_argument("password", type=str, help="Must pass a password", required=True,
                                          location='form')
        self.add_user_parser.add_argument("name", type=str, help="Name is required", required=True, location='form')

    def _set_up_basic_user_parser(self):
        self.user_parser = reqparse.RequestParser()
        self.user_parser.add_argument("email", type=str, help="Email is required", required=False, location='form')
        self.user_parser.add_argument("password", type=str, help="Must pass a password", required=False,
                                      location='form')
        self.user_parser.add_argument("name", type=str, help="Name is required", required=False, location='form')
