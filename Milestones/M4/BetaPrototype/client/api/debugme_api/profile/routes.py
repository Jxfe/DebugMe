from flask import request, jsonify, Blueprint
from flask_restful import abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from debugme_api.config import Config
from ..debugme_toolkit import db
from sqlalchemy import create_engine, text, or_
from debugme_api.models.Messages import Messages, MessagesSchema
from debugme_api.models.Mentoring import MentoringSession, MentoringSessionSchema
from debugme_api.models.Saved import Saved, SavedSchema

profile = Blueprint('profile', __name__, url_prefix='/api')

@profile.route('/profile', methods=['GET'])
@jwt_required(refresh=True)
def get_profile():
    user_id = get_jwt_identity()

    messages = Messages.query.filter(or_(Messages.sender_id==user_id, Messages.receiver_id==user_id)).order_by(Messages.created_at.desc())

    mentorSessions = MentoringSession.query.filter(MentoringSession.mentor_id==user_id).order_by(MentoringSession.created_at.desc())

    menteeSessions = MentoringSession.query.filter(MentoringSession.mentee_id==user_id).order_by(MentoringSession.created_at.desc())

    saved = Saved.query.filter(Saved.user_id==user_id).order_by(Saved.created_at.desc())

    messagesSchema = MessagesSchema(many=True)
    mentoringSessionSchema = MentoringSessionSchema(many=True)
    savedSchema = SavedSchema(many=True)

    response = {
        'messages': messagesSchema.dump(messages),
        'mentorSessions': mentoringSessionSchema.dump(mentorSessions),
        'menteeSessions': mentoringSessionSchema.dump(menteeSessions),
        'saved': savedSchema.dump(saved)
    }

    return jsonify(response), 200