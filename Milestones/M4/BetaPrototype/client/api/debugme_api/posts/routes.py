from flask import request, flash, jsonify, Blueprint, render_template
from flask_jwt_extended import jwt_required, get_jwt_identity
from debugme_api.config import Config
from ..debugme_toolkit import db
from sqlalchemy import create_engine, text
from ..models.Post import Post, PostSchema

posts = Blueprint('posts', __name__)

@posts.route('/api/posts', methods=['GET'])
@jwt_required(refresh=True)
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
@jwt_required(refresh=True)
def create_post():
    title = request.form['title']
    content = request.form['content']
    user_id = get_jwt_identity()
    image_path = request.form['image_path']
    is_premium_str = request.form['is_premium']

    if is_premium_str == 'true':
        is_premium = True
    else:
        is_premium = False

    newPost = Post(title, content, user_id, image_path, is_premium)
    postSchema = PostSchema()
    db.session.add(newPost)
    db.session.commit()

    return postSchema.jsonify(newPost)