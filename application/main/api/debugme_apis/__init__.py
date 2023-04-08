import time
from flask import Flask

def create_app(config_name):

    app = Flask(__name__, static_folder='../../client/build', static_url_path='/')

    # Need, for now.
    @app.route('/')
    def index():
        return app.send_static_file('index.html')

    # Needed only for initial testing, not required in the long run.
    @app.route('/api/time')
    def get_current_time():
        return {'time': time.time()}

    return app