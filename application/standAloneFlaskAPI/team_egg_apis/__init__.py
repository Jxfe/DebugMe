from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy

from os import path

#DB_NAME = 'database.db'

app = Flask(__name__)

#app.config['SECRET_KEY'] = 'Team EEEEGGS asdf as fa'
#app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'




SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username="admin",
    password="Team_2_Egg!",
    hostname="debugme.cdvwzysjp5ac.us-west-2.rds.amazonaws.com",
    databasename='debugme' #="User", #databasename="the database name you chose, probably yourusername$comments",
)
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

api = Api(app)
db = SQLAlchemy(app)





