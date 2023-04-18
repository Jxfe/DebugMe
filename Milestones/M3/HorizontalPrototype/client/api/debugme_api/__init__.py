from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from flask_cors import CORS, cross_origin
from flask_restful import Api
from debugme_api.config import Config, app_config

db = SQLAlchemy()
api = Api()

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(app_config[config_name])

    CORS(app, resources={r"/*": {"origins": "*"}})

    db.init_app(app)
    api.init_app(app)

    #### Test DB connection
    # with app.app_context():
    #   try:
    #       db.session.execute(text('SELECT 1'))
    #       print('\n\n----------- Connection successful !')
    #   except Exception as e:
    #       print('\n\n----------- Connection failed ! ERROR : ', e)

    #### Register subdirectory routes in app
    from debugme_api.testing.routes import tests
    app.register_blueprint(tests)

    return app