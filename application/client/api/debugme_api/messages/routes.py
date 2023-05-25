from flask import request, jsonify, Blueprint
from flask_restful import abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from debugme_api.config import Config
from ..debugme_toolkit import db
from sqlalchemy import create_engine, text
from ..models.Messages import Messages, MessagesSchema

messages = Blueprint('messages', __name__)


@messages.route('/api/messages', methods=['GET'])
@jwt_required(refresh=True)
def get_messages():
    engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
    with engine.connect() as connection:
        user_id = get_jwt_identity()
        result = connection.execute(
            text('SELECT Messages.id, Messages.content, Sender.id as sender_id, Sender.email as sender_email, Receiver.id as receiver_id, Receiver.email as receiver_email, Messages.created_at FROM Messages LEFT JOIN User AS Receiver ON Messages.receiver_id = Receiver.id LEFT JOIN User AS Sender ON Messages.sender_id = Sender.id WHERE sender_id =' + str(user_id) + ' OR ' + 'receiver_id = ' + str(user_id) + ';'))

        messages = result.fetchall()
        connection.close()

    response = {}
    messagesSchema = MessagesSchema()
    for message in messages:
        otherUserEmail = message.receiver_email if message.sender_id == user_id else message.sender_email
        if otherUserEmail in response:
            current = response[otherUserEmail]
            current.append(messagesSchema.dump(message))
            response[otherUserEmail] = current
        else:
            response[otherUserEmail] = [messagesSchema.dump(message)]

    return jsonify(response), 200


@messages.route('/api/messages', methods=['POST'])
@jwt_required(refresh=True)
def create_post():
    content = request.form.get('content', '')
    sender_id = request.form.get('sender_id')
    sender_email = request.form.get('sender_email')
    receiver_id = request.form.get('receiver_id')
    receiver_email = request.form.get('receiver_email')

    if not sender_id or not receiver_id:
        abort(404, message='Invalid reqeust')

    messageSchema = MessagesSchema()
    newMessage = Messages(content, sender_id, sender_email,
                          receiver_id, receiver_email)
    db.session.add(newMessage)
    db.session.commit()

    response = messageSchema.dump(newMessage)

    return jsonify(response), 201
