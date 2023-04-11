from debugme_apis import create_app, setup_api

#from team_egg_apis import app, api
from debugme_apis.user import User
from debugme_apis.user_auth import UserAuth
from debugme_apis.post import Post
from debugme_apis.search import Search

app = create_app(config_name="production")
api = setup_api(app)

api.add_resource(User, '/user/<string:user_name>')
api.add_resource(UserAuth, '/user-auth/<string:user_name>/<string:user_password>')
api.add_resource(Post, '/post/<int:user_id>')
api.add_resource(Search, '/search/')

if __name__ == '__main__':

    app.run(debug=True)