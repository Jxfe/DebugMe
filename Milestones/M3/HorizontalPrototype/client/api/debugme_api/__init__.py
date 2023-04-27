from flask import Flask
from flask_cors import CORS
from debugme_api.config import app_config
from debugme_api.debugme_toolkit import db, api

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(app_config[config_name])

    CORS(app, resources={r"/*": {"origins": "*"}})

    db.init_app(app)
    api.init_app(app)

    #### Register subdirectory routes in app
    from debugme_api.testing.routes import tests
    from debugme_api.events.routes import events
    app.register_blueprint(tests)
    app.register_blueprint(events)

    return app