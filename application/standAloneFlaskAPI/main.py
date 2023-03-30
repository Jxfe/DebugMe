from team_egg_apis import app, api
from team_egg_apis.user import User
from team_egg_apis.user_auth import UserAuth


if __name__ == '__main__':
    api.add_resource(User, '/user/<string:user_name>')
    api.add_resource(UserAuth, '/user-auth/<string:user_name>/<string:user_password>')
    app.run(debug=True)




