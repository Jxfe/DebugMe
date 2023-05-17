from flask import request, jsonify, Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..debugme_toolkit import db
from sqlalchemy import or_, and_
from debugme_api.models.Messages import Messages, MessagesSchema
from debugme_api.models.Mentoring import MentoringSession, MentoringUserSessionSchema
from debugme_api.models.Saved import Saved, SavedUserSchema

MENTORING_TABLE_STATUS_CODES = {'request': 0, 'accept': 1, 'reject': 2}

profile = Blueprint('profile', __name__, url_prefix='/api')

@profile.route('/profile', methods=['GET'])
@jwt_required(refresh=True)
def get_profile():
    user_id = get_jwt_identity()

    messages = Messages.query.filter(or_(Messages.sender_id==user_id, Messages.receiver_id==user_id)).order_by(Messages.created_at.desc())

    mentorSessions = MentoringSession.query.filter(MentoringSession.mentor_id==user_id).order_by(MentoringSession.created_at.desc())

    menteeSessions = MentoringSession.query.filter(MentoringSession.mentee_id==user_id).order_by(MentoringSession.created_at.desc())

    mentoringRequests = MentoringSession.query.filter(and_(MentoringSession.mentor_id==user_id, MentoringSession.status==MENTORING_TABLE_STATUS_CODES['request']))

    saved = Saved.query.filter(Saved.user_id==user_id).order_by(Saved.created_at.desc())

    messagesSchema = MessagesSchema(many=True)
    mentoringUserSessionSchema = MentoringUserSessionSchema(many=True)
    savedUserSchema = SavedUserSchema(many=True)

    response = {
        'messages': messagesSchema.dump(messages),
        'mentorSessions': mentoringUserSessionSchema.dump(mentorSessions),
        'menteeSessions': mentoringUserSessionSchema.dump(menteeSessions),
        'mentoringRequests': mentoringUserSessionSchema.dump(mentoringRequests),
        'saved': savedUserSchema.dump(saved)
    }

    return jsonify(response), 200