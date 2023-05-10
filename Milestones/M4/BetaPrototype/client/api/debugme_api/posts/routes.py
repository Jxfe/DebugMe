from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from debugme_api.config import Config
from debugme_api.models.Reply import Reply, ReplySchema
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
        connection.close()

    posts = []
    postSchema = PostSchema()
    for row in rows:
        posts.append(postSchema.dump(row))

    return jsonify(posts), 200

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

    return postSchema.jsonify(newPost), 201

@posts.route('/api/comments', methods=['POST'])
@jwt_required(refresh=True)
def get_comments():
    post_id = request.form['post_id']

    replies = db.session.query(Reply).filter(Reply.post_id==post_id)

    response = []
    replySchema = ReplySchema()
    for reply in replies:
        response.append(replySchema.dump(reply))

    return jsonify(response), 200

