from flask_restful import Resource, abort
from werkzeug.security import check_password_hash
from . import get_db


class UserAuth(Resource):
    
    

    def __init__(self):
        self.db = get_db()
        self.user_table = self.db.Table('User', self.db.metadata, autoload_with=self.db.engine)

        self.Base = automap_base()
        self.Base.prepare(self.db.engine, reflect=True)
        # print('Testing connection with user table \n\n\n')
        # print((self.user_table))
        # print('Should say User\n\n\n')
        self.User_Model = self.Base.classes.User

    def get(self, user_name, user_password):
        result = self.User_Model.query.filter_by(name=user_name).first()

        if not result:
            abort(404, message='User not in database')

        if check_password_hash(result.password, user_password):
            return {'message': 'Successful password match'}, 200
        else:
            abort(403, message='Passwords did not match')
