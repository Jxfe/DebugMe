import time
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api


db = None

def create_app(config_name):
    global db
    app = Flask(__name__, static_folder='../../client/build', static_url_path='/')

    #if db == None:
    #    print('Making db')
    #    setup_database(app)
    #    db = SQLAlchemy(app)
    #    print(db == None)
    print('Making db')
    setup_database(app)
    db = SQLAlchemy(app)## # Need, for now.
    print(db == None)## @app.route('/')
    
    ## def index():
    ##     return app.send_static_file('index.html')

    # Needed only for initial testing, not required in the long run.
    
    
    
    
    #@app.route('/api/time')
    #def get_current_time():
    #    return {'time': time.time()}

    return app
    
def setup_api(app):
    api = Api(app)
    return api

def get_db():
    return db


def setup_database(app):
    
    SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username="admin",
    password="Team_2_Egg!",
    hostname="debugme.cdvwzysjp5ac.us-west-2.rds.amazonaws.com",
    databasename='debugme'  # ="User", #databasename="the database name you chose, probably yourusername$comments",
    )
    app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
    app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
