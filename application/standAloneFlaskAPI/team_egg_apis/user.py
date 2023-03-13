from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with

from database_models.models import User as user_database
from database_models.models import db

class User(Resource):

    resource_fields = {
        'id': fields.Integer,
        'email': fields.String,
        'password': fields.String,
    }


    def __init__(self):

        self._set_up_add_user_parser()



    @marshal_with(resource_fields)
    def get(self, user_id):
        return {'a': 'b'}, 200

    @marshal_with(resource_fields)
    def put(self, user_id):

        args = self.add_user_parser.parse_args()

        result = user_database.query.filter_by(id=user_id).first()
        if result:
            abort(409, message = 'User alread in')

        new_user = user_database(id=user_id, email=args['email'], password=args['password'])
        user_database.db.session.add(new_user)
        user_database.db.session.commit()
        return new_user, 201


    def _set_up_add_user_parser(self):
        self.add_user_parser = reqparse.RequestParser()
        self.add_user_parser.add_argument("email", type=str, help="Email is required", required=True)
        self.add_user_parser.add_argument("password", type=str, help="Must pass a password", required=True)

