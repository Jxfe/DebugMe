from flask import Flask
from flask_cors import CORS
from debugme_api.config import app_config
from debugme_api.debugme_toolkit import db, api, ma, jwt, botox

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(app_config[config_name])

    CORS(app, resources={r"/*": {"origins": "*"}})

    db.init_app(app)     # init SQLAlchemy DB
    ma.init_app(app)     # init Marshmallow. Note: must come after db init
    jwt.init_app(app)    # init JSON Web Token Manager.
    botox.init_app(app)  # init Flask-Botox (boto3)

    #### Register subdirectory blueprints in app
    from debugme_api.posts.routes import posts
    from debugme_api.registration.routes import registration
    from debugme_api.authorization.routes import authorization
    app.register_blueprint(authorization)
    app.register_blueprint(registration)
    app.register_blueprint(posts)

    #### Register subdirectory resource in app
    #from debugme_api.posts.Posts import Posts
    #from .registration.Registration import Registration
    #api.add_resource(Posts, '/api/posts')
    #api.add_resource(Registration, '/api/register')
    #api.init_app(app)    # This line must come after adding api resources.

    return app