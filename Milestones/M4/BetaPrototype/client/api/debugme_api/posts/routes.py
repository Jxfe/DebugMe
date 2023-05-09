from flask import request, flash, jsonify, Blueprint, render_template
from debugme_api.config import Config
from ..debugme_toolkit import db
from sqlalchemy import create_engine, text
from ..models.Post import Post, PostSchema

posts = Blueprint('posts', __name__)

@posts.route('/api/posts', methods=['GET'])
def get_posts():
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

@posts.route('/api/posts', methods=['POST'])
def create_post():
    content = request.form['content']
    user_id = request.form['user_id']
    forum_id = request.form['forum_id']

    newPost = Post(content, user_id, forum_id)
    postSchema = PostSchema()
    db.session.add(newPost)
    db.session.commit()

    return postSchema.jsonify(newPost)