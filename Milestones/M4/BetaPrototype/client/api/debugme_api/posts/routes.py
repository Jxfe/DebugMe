from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from debugme_api.config import Config
from debugme_api.models.Reply import Reply, ReplySchema
from ..debugme_toolkit import db
from sqlalchemy import create_engine, text, and_
from ..models.Post import Post, PostSchema, PostRepliesSchema

POST_TABLE_CODES = {"post": 0, "guide": 1}

posts = Blueprint('posts', __name__)

@posts.route('/api/posts', methods=['GET'])
@jwt_required(refresh=True)
def get_posts():
    input = request.args.get('search', '')

    if input != '':
        engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
        with engine.connect() as connection:
            search = "'%" + input + "%'"
            result = connection.execute(text('SELECT * FROM Post WHERE (title LIKE ' + search + ' AND is_premium=' + str(POST_TABLE_CODES['post']) + ') ORDER BY Post.created_at DESC;'))
            posts = result.fetchall()
            connection.close()
    else:
        posts = Post.query.filter(Post.is_premium==POST_TABLE_CODES['post']).order_by(Post.created_at.desc())

    response = []
    postRepliesSchema = PostRepliesSchema()
    for post in posts:
        response.append(postRepliesSchema.dump(post))

    return jsonify(response), 200

@posts.route('/api/getpost', methods=['GET'])
@jwt_required(refresh=True)
def get_post():
    post_id = request.args.get('id', 0)

    post = Post.query.get(post_id)
    postReplySchema = PostRepliesSchema()

    response = postReplySchema.dump(post)

    return jsonify(response), 200

@posts.route('/api/posts', methods=['POST'])
@jwt_required(refresh=True)
def create_post():
    title = request.form.get('title', '')
    content = request.form.get('content', '')
    user_id = get_jwt_identity()
    image_path = request.form.get('image_path', '')
    is_premium = POST_TABLE_CODES['post']

    postSchema = PostSchema()
    newPost = Post(title, content, user_id, image_path, is_premium)

    db.session.add(newPost)
    db.session.commit()

    response = postSchema.dump(newPost)

    return jsonify(response), 201

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

@posts.route('/api/addcomment', methods=['POST'])
@jwt_required(refresh=True)
def add_comment():
    user_id = get_jwt_identity()
    post_id = request.form.get('post_id', '')
    content = request.form.get('content', '')
    image_path = request.form.get('image_path', '')

    replySchema = ReplySchema()
    newReply = Reply(content, user_id, post_id, image_path)

    db.session.add(newReply)
    db.session.commit()

    response = replySchema.dump(newReply)

    return jsonify(response), 201

@posts.route('/api/guides', methods=['GET'])
@jwt_required(refresh=True)
def get_guides():
    input = request.args.get('search', '')
    search = "'%" + input + "%'"

    engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)

    with engine.connect() as connection:
        if search:
            result = connection.execute(text('SELECT * FROM Post WHERE (title LIKE ' + search + ' AND is_premium=' + str(POST_TABLE_CODES['guide']) + ');'))
        else:
            result = connection.execute(text('SELECT * FROM Post WHERE is_premium=' + str(POST_TABLE_CODES['guide']) + ';'))
        posts = result.fetchall()
        connection.close()

    response = []
    postSchema = PostSchema()
    for post in posts:
        response.append(postSchema.dump(post))

    return jsonify(response), 200

@posts.route('/api/guides', methods=['POST'])
@jwt_required(refresh=True)
def create_guide():
    title = request.form.get('title', '')
    content = request.form.get('content', '')
    user_id = get_jwt_identity()
    image_path = request.form.get('image_path', '')
    is_premium = POST_TABLE_CODES['guide']

    postSchema = PostSchema()
    newPost = Post(title, content, user_id, image_path, is_premium)

    db.session.add(newPost)
    db.session.commit()

    response = postSchema.dump(newPost)

    return jsonify(response), 201