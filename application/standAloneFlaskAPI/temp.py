from database_models.models import User as user_database

from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy

from os import path

from flask_login import UserMixin
from sqlalchemy.sql import func


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
            abort(409, message='User alread in')

        new_user = user_database(id=user_id, email=args['email'], password=args['password'])
        user_database.db.session.add(new_user)
        user_database.db.session.commit()
        return new_user, 201

    def _set_up_add_user_parser(self):
        self.add_user_parser = reqparse.RequestParser()
        self.add_user_parser.add_argument("email", type=str, help="Email is required", required=True)
        self.add_user_parser.add_argument("password", type=str, help="Must pass a password", required=True)


DB_NAME = 'database.db'

app = Flask(__name__)

app.config['SECRET_KEY'] = 'Team EEEEGGS asdf as fa'
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'

api = Api(app)
db = SQLAlchemy(app)


class Forum(db.Model):
    # database schema
    id = db.Column(db.Integer, primary_key=True)
    post = db.Column(db.String(1000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class User(db.Model, UserMixin):
    # database schema
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    name = db.Column(db.String(150))
    posts = db.relationship('Forum')


if not path.exists('' + DB_NAME):
    with app.app_context():
        db.create_all()
else:
    print('Already have one')

api.add_resource(User, '/test')
