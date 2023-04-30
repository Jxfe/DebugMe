from flask import request,jsonify, make_response
from flask_restful import Resource
from debugme_api.config import Config
from ..debugme_toolkit import db
from ..models.Post import Post, PostSchema
from sqlalchemy import create_engine, text

class Posts(Resource):
    def get(self):
        input = request.args.get('search', '')
        search = "'%" + input + "%'"

        engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)

        with engine.connect() as connection:
          if search:
              result = connection.execute(text('SELECT * FROM Post WHERE content LIKE ' + search))
          else:
              result = connection.execute(text('SELECT * FROM Post'))

        rows = result.fetchall()
        posts = []
        for row in rows:
            posts.append({
                "id": row[0],
                "content": row[1],
                "user_id": row[2],
                "forum_id": row[3],
                "created_at": row[4],
                "updated_at": row[5]
            })

        return jsonify(posts)

    def post(self):
        content = request.form['content']
        user_id = request.form['user_id']
        forum_id = request.form['forum_id']

        newPost = Post(content, user_id, forum_id)
        postSchema = PostSchema()
        db.session.add(newPost)
        db.session.commit()

        return postSchema.jsonify(newPost)