from flask import Flask
from flask_cors import CORS
from debugme_api.config import app_config
from debugme_api.debugme_toolkit import db, api, ma

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(app_config[config_name])

    CORS(app, resources={r"/*": {"origins": "*"}})

    db.init_app(app)
    ma.init_app(app)    # Marshmallow init must come after db init

    #### Register subdirectory blueprints in app
    from debugme_api.posts.routes import posts
    #app.register_blueprint(posts)

    #### Register subdirectory resource in app
    from debugme_api.posts.Posts import Posts
    api.add_resource(Posts, '/api/posts')
    api.init_app(app)    # This line must come after adding api resources.

    return app