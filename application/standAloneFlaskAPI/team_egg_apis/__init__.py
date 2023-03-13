from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
#from .user import User
from os import path

DB_NAME = 'database.db'

app = Flask(__name__)

app.config['SECRET_KEY'] = 'Team EEEEGGS asdf as fa'
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'

api = Api(app)
db = SQLAlchemy(app)

if not path.exists('' + DB_NAME):
    with app.app_context():
        db.create_all()
else:
    print('Already have one')

#api.add_resource(User, '/test')



