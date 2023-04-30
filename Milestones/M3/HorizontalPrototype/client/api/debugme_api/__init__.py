from flask import Flask
from flask_cors import CORS
from debugme_api.config import app_config
from debugme_api.debugme_toolkit import db
from flask_restful import Api

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(app_config[config_name])

    CORS(app, resources={r"/*": {"origins": "*"}})

    db.init_app(app)
    api = Api(app)

    #### Register subdirectory blueprints in app
    from debugme_api.posts.routes import posts
    #app.register_blueprint(posts)

    #### Register subdirectory resource in app
    from debugme_api.posts.Post import Post
    api.add_resource(Post, '/api/posts')

    return app