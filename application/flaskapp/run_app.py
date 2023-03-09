from website import setup_app
from flask_restful import Api
from website.myAPIs import UserAPI

app = setup_app()

if __name__ == '__main__':
    app.run(debug=True)
    api = Api(app)
    api.add_resource(UserAPI, '/')
