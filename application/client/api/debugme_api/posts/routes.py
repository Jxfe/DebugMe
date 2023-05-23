from flask import request, jsonify, Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from debugme_api.config import Config
from debugme_api.models.Reply import Reply, ReplySchema
from ..debugme_toolkit import db
from sqlalchemy import create_engine, text, and_
from ..models.Post import Post, PostSchema, PostRepliesSchema
from ..models.Likes import Likes, LikesSchema

LIKES_TABLE_CODES = {'post': 0, 'guide': 1}

posts = Blueprint('posts', __name__, url_prefix='/api')

@posts.route('/posts', methods=['GET'])
@jwt_required(refresh=True)
def get_posts():
    input = request.args.get('search', '')

    if input != '':
        search = "%" + input + "%"

        posts = Post.query.filter(Post.title.like(search)).order_by(Post.created_at.desc())
    else:
        posts = Post.query.order_by(Post.created_at.desc())

    response = []
    postRepliesSchema = PostRepliesSchema()
    for post in posts:
        response.append(postRepliesSchema.dump(post))

    return jsonify(response), 200

@posts.route('/getpost', methods=['GET'])
@jwt_required(refresh=True)
def get_post():
    post_id = request.args.get('id', 0)

    post = Post.query.get(post_id)
    postReplySchema = PostRepliesSchema()

    response = postReplySchema.dump(post)

    return jsonify(response), 200

@posts.route('/deletepost', methods=['DELETE'])
@jwt_required(refresh=True)
def delete_post():
    user_id = get_jwt_identity()
    post_id = request.form.get('id', None)

    if post_id is None:
        abort(400, 'No id parameter found on request')

    elif post_id == '':
        abort(400, 'No value given for id parameter')

    post = Post.query.get(post_id)

    if post is None:
        abort(400, 'No post found')

    elif post.user_id != user_id:
        abort(400, 'You can only delete post you authored')

    else:
        delete_post(post)

    response = {'message': 'Post has been deleted'}

    return jsonify(response), 200

@posts.route('/posts', methods=['POST'])
@jwt_required(refresh=True)
def create_post():
    title = request.form.get('title', '')
    content = request.form.get('content', '')
    user_id = get_jwt_identity()
    image_path = request.form.get('image_path', '')

    postSchema = PostSchema()
    newPost = Post(title, content, user_id, image_path)

    db.session.add(newPost)
    db.session.commit()

    response = postSchema.dump(newPost)

    return jsonify(response), 201

@posts.route('/comments', methods=['POST'])
@jwt_required(refresh=True)
def get_comments():
    post_id = request.form['post_id']

    replies = db.session.query(Reply).filter(Reply.post_id==post_id)

    response = []
    replySchema = ReplySchema()
    for reply in replies:
        response.append(replySchema.dump(reply))

    return jsonify(response), 200

@posts.route('/addcomment', methods=['POST'])
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

@posts.route('/likepost', methods=['POST'])
@jwt_required(refresh=True)
def like():
    user_id = get_jwt_identity()
    post_id = request.form.get('post_id', '')
    is_premium = LIKES_TABLE_CODES['post']
    likes_schema = LikesSchema()

    like = Likes.query.filter(and_(Likes.post_id==post_id, Likes.user_id==user_id)).first()

    if like:
        response = "You've already liked this post."
        return jsonify(response), 409
    else:
        new_like = Likes(post_id=post_id, user_id=user_id, is_premium=is_premium)

        db.session.add(new_like)
        db.session.commit()

        response = likes_schema.dump(new_like)
        return jsonify(response), 201

@posts.route('/dislikepost', methods=['POST'])
@jwt_required(refresh=True)
def dislike():
    user_id = get_jwt_identity()
    post_id = request.form.get('post_id', '')
    likes_schema = LikesSchema()

    like = Likes.query.filter(and_(Likes.post_id==post_id, Likes.user_id==user_id)).first()

    if like:
        Likes.query.filter(and_(Likes.post_id==post_id, Likes.user_id==user_id)).delete(synchronize_session='fetch')
        db.session.commit()

        response = likes_schema.dump(like)
        return jsonify(response), 200

    else:
        response = "You haven't liked this post yet."
        return jsonify(response), 409

def delete_post(post):
    Reply.query.filter(Reply.post_id==post.id).delete(synchronize_session='fetch')
    Likes.query.filter(Likes.post_id==post.id).delete(synchronize_session='fetch')
    db.session.delete(post)
    db.session.commit()