from flask_restful import Resource, reqparse, abort, fields
from . import db


class Search(Resource):
    resource_fields = {
        'key': fields.String,
        'category': fields.String
    }

    def __init__(self):
        self.user_table = db.Table('User', db.metadata, autoload_with=db.engine)
        self.post_table = db.Table('Post', db.metadata, autoload_with=db.engine)
        self._set_up_search_parser()

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

        if len(found_items['found']) == 0:
            abort(400, message='No Items matched the search')

        return found_items, 200

    def _search_user(self, key):
        all_users = db.session.query(self.user_table).all()

        found_items = []

        for user in all_users:

            if key in user.name or key in user.email:
                found_items.append({'user name': user.name, 'user email': user.email})

        return found_items

    def _search_posts(self, key):
        all_posts = db.session.query(self.post_table).all()

        found_items = []

        for post in all_posts:

            if key in post.content:
                found_items.append({'content': post.content})

        return found_items

    def _set_up_search_parser(self):
        self.search_parser = reqparse.RequestParser()
        self.search_parser.add_argument('key', type=str, help="Needs a key to search", required=True, location='args')
        self.search_parser.add_argument('category', type=str, help="Needs a Category to search in", required=True,
                                        location='args')
