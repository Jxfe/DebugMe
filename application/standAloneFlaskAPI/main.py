from team_egg_apis import app, api
from team_egg_apis.user import User
from team_egg_apis.user_auth import UserAuth
from team_egg_apis.post import Post
from team_egg_apis.search import Search

if __name__ == '__main__':
    api.add_resource(User, '/user/<string:user_name>')
    api.add_resource(UserAuth, '/user-auth/<string:user_name>/<string:user_password>')
    api.add_resource(Post, '/post/<int:user_id>')
    api.add_resource(Search, '/search/')
    app.run(debug=True)




