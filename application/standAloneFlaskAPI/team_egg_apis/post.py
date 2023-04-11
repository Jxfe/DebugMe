from flask_restful import Resource, reqparse, abort, fields, marshal_with
from sqlalchemy.ext.automap import automap_base
from . import db


class Post(Resource):
    resource_fields = {
        'id': fields.Integer,
        'content': fields.String,
        'user_id': fields.Integer,
        'forum_id': fields.Integer,
        'created_at': fields.DateTime,
        'updated_at': fields.DateTime,

    }

    def __init__(self):

        self._set_up_basic_form_parser()

        self.post_table = db.Table('Post', db.metadata, autoload_with=db.engine)

        self.Base = automap_base()
        self.Base.prepare(db.engine, reflect=True)
        self.Post_Model = self.Base.classes.Post

    @marshal_with(resource_fields)
    def get(self, user_id):

        result = db.session.query(self.Post_Model).filter_by(user_id=user_id).first()
        if not result:
            abort(404, message='Post not in database')

        return result, 200

    @marshal_with(resource_fields)
    def put(self, user_id):
        args = self.post_parser.parse_args()

        result = db.session.query(self.Post_Model).filter_by(user_id=args['user_id']).first()

        if result:
            abort(409, message='Post already in database')
        elif not self._is_valid_post(args['content']):
            abort(403, message='Not valid content')
        else:
            new_post = self._add_post_to_database(args)
            return new_post, 201

    @marshal_with(resource_fields)
    def patch(self, user_id):
        args = self.post_parser.parse_args()

        update_post = db.session.query(self.Post_Model).filter_by(user_id=user_id).first()
        if not update_post:
            abort(404, message='No user by that name')

        if args['content']:
            update_post.content = args['content']
        if args['email']:
            update_post.forum_id = args['forum_id']
        if args['updated_at']:
            update_post.updated_at = args['updated_at']

        db.session.commit()

        return update_post, 200

    def _is_valid_post(self, post):
        return True

    def _is_valid_image(self, img):
        return True

    def _add_post_to_database(self, post_info):

        new_post = self.Post_Model(content=post_info['content'],
                                   user_id=post_info['user_id'],
                                   forum_id=post_info['forum_id']

                                   )
        db.session.add(new_post)
        db.session.commit()
        return new_post

    def _set_up_basic_form_parser(self):
        self.post_parser = reqparse.RequestParser()
        self.post_parser.add_argument("content", type=str, help="content of the post", required=False, location='form')
        self.post_parser.add_argument("user_id", type=str, help="ID of user making post", required=False,
                                      location='form')
        self.post_parser.add_argument("forum_id", type=str, help="ID of form post is in", required=False,
                                      location='form')
        self.post_parser.add_argument("created_at", type=str, help="When the post was made", required=False,
                                      location='form')
        self.post_parser.add_argument("updated_at", type=str, help="When the post was last updated", required=False,
                                      location='form')
