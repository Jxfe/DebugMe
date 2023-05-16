from flask import request, jsonify, Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from debugme_api.config import Config
from ..debugme_toolkit import db
from sqlalchemy import create_engine, text, and_
from ..models.Mentoring import MentoringSession, MentoringSessionSchema

MENTORING_TABLE_STATUS_CODES = {'request': 0, 'accept': 1, 'reject': 2}

mentoring = Blueprint('mentoring', __name__, url_prefix='/api')

@mentoring.route('/requestmentoring', methods=['POST'])
@jwt_required(refresh=True)
def request_mentoring():
    mentee_id = get_jwt_identity()
    mentor_id = request.form.get('mentor_id', None)
    status = MENTORING_TABLE_STATUS_CODES['request']

    if mentor_id is None:
        response = {'message': 'Missing Mentor id'}
        return jsonify(response), 400

    elif mentee_id == int(mentor_id):
        response = {'message': 'Mentor and Mentee are the same'}
        return jsonify(response), 400

    mentoring_request = MentoringSession.query.filter(and_(MentoringSession.mentee_id==mentee_id, MentoringSession.mentor_id==mentor_id)).first()

    if mentoring_request:
        response = {'message': 'Mentoring session already exists'}
        return jsonify(response), 409

    mentoringSessionSchema = MentoringSessionSchema()
    newMentorshipRequest = MentoringSession(mentee_id, mentor_id, status)

    response = mentoringSessionSchema.dump(newMentorshipRequest)

    db.session.add(newMentorshipRequest)
    db.session.commit()

    return jsonify(response), 201

@mentoring.route('/acceptmentoring', methods=['PUT', 'POST'])
@jwt_required(refresh=True)
def accept_request():
    mentor_id = get_jwt_identity()
    mentoring_id = request.form.get('mentoring_id', None)

    if mentoring_id is None:
        abort(400, {'error': 'Missing mentoring session id'})

    mentoring_session = MentoringSession.query.get(mentoring_id)

    if mentoring_session is None:
        abort(400, 'Mentoring session does not exist')

    if mentor_id == mentoring_session.mentee_id:
        abort(400, 'Only Mentors can approve mentoring sessions')

    mentoring_session.status = MENTORING_TABLE_STATUS_CODES['accept']
    db.session.commit()

    response = {'message': 'Mentoring Session has been accepted'}

    return jsonify(response), 200

@mentoring.route('/rejectmentoring', methods=['PUT', 'POST'])
@jwt_required(refresh=True)
def reject_request():
    mentor_id = get_jwt_identity()
    mentoring_id = request.form.get('mentoring_id', None)

    if mentoring_id is None:
        abort(400, {'error': 'Missing mentoring session id'})

    mentoring_session = MentoringSession.query.get(mentoring_id)

    if mentoring_session is None:
        abort(400, 'Mentoring session does not exist')

    if mentor_id == mentoring_session.mentee_id:
        abort(400, 'Only Mentors can reject mentoring sessions')

    mentoring_session.status = MENTORING_TABLE_STATUS_CODES['reject']
    db.session.commit()

    response = {'message': 'Mentoring Session has been rejected'}

    return jsonify(response), 200



