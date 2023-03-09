from flask import Flask
from flask_restful import Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy


class UserAPI(Resource):

    resource_fields = {
        'id' : fields.Integer,
        'email': fields.String,
        'password': fields.String,
        'name' : fields.String,
        'notes' : fields.String
    }


    def get(self):
        pass



