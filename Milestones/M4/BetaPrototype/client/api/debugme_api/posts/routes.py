from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from debugme_api.config import Config
from debugme_api.models.Reply import Reply, ReplySchema
from ..debugme_toolkit import db
from sqlalchemy import create_engine, text
from ..models.Post import Post, PostSchema

POST_TABLE_CODES = {"post": 0, "guide": 1}

posts = Blueprint('posts', __name__)

@posts.route('/api/posts', methods=['GET'])
@jwt_required(refresh=True)
def get_posts():
    input = request.args.get('search', '')
    search = "'%" + input + "%'"

    engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)

    with engine.connect() as connection:
        if search:
            #result = connection.execute(text('SELECT * FROM Post WHERE content LIKE ' + search))
            result = connection.execute(text('SELECT * FROM Post WHERE (content LIKE ' + search + ' AND is_premium=' + str(POST_TABLE_CODES['post']) + ');'))
        else:
            #result = connection.execute(text('SELECT * FROM Post'))
            result = connection.execute(text('SELECT * FROM Post WHERE is_premium=' + str(POST_TABLE_CODES['post']) + ';'))
        posts = result.fetchall()
        connection.close()

    response = []
    postSchema = PostSchema()
    for post in posts:
        response.append(postSchema.dump(post))

    return jsonify(response), 200

@posts.route('/api/getpost', methods=['GET'])
@jwt_required(refresh=True)
def get_post():
    post_id = request.args.get('id', 0)
    postSchema = PostSchema()

    post = Post.query.get(post_id)
    response = postSchema.dump(post)

    return jsonify(response), 200

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
    post_id = request.form['post_id']
    user_id = request.form['user_id']
    content = request.form['content']
    image_path = request.form['image_path']

    replySchema = ReplySchema()
    newReply = Reply(content, user_id, post_id, image_path)

    db.session.add(newReply)
    db.session.commit()

    response = replySchema.dump(newReply)

    return jsonify(response), 201