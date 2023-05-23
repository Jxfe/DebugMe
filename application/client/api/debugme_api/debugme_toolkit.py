from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_botox import Boto3

db = SQLAlchemy()
api = Api()
ma = Marshmallow()
jwt = JWTManager()
botox = Boto3()