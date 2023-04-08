from flask_restful import Resource, reqparse, abort, fields
#from flask_cors import cross_origin
from . import get_db


class Search(Resource):
    resource_fields = {
        'key': fields.String,
        'category': fields.String
    }

    def __init__(self):
        self.db = get_db()
        self.user_table = self.db.Table('User', self.db.metadata, autoload_with=self.db.engine)
        self.post_table = self.db.Table('Post', self.db.metadata, autoload_with=self.db.engine)
        self._set_up_search_parser()
        
    #@cross_origin()
    def get(self):
        args = self.search_parser.parse_args()

        if args['key']:
            key = args['key']
        if args['category']:
            category = args['category']

        found_items = {}

        if category == 'User':
            found_items['found'] = self._search_user(key)
        elif category == 'Post':
            found_items['found'] = self._search_posts(key)
        else:
            abort(400, message='Invalid category')

        # if len(found_items['found']) == 0:
        #     abort(400, message='No Items matched the search')

        return found_items, 200

    def _search_user(self, key):
        all_users = self.db.session.query(self.user_table).all()

        found_items = []

        for user in all_users:

            if key in user.name or key in user.email:
                found_items.append({'id': user.id, 'name': user.name, 'email': user.email, 'created_at' : user.created_at.isoformat()})

        return found_items

    def _search_posts(self, key):
        all_posts = self.db.session.query(self.post_table).all()

        found_items = []

        for post in all_posts:

            if key in post.content:
                found_items.append({'id': post.id, 'content': post.content, 'created_at' : post.created_at.isoformat() })

        return found_items

    def _set_up_search_parser(self):
        self.search_parser = reqparse.RequestParser()
        self.search_parser.add_argument('key', type=str, help="Needs a key to search", required=True, location='args')
        self.search_parser.add_argument('category', type=str, help="Needs a Category to search in", required=True,
                                        location='args')
