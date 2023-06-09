from flask import request, jsonify, Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..debugme_toolkit import db, upload_image, generate_presigned_url
from sqlalchemy import or_, and_
from debugme_api.models.Messages import Messages, MessagesSchema
from debugme_api.models.Mentoring import MentoringSession, MentoringUserSessionSchema
from debugme_api.models.Saved import Saved, SavedUserSchema
from ..models.User import User, UserSchema

MENTORING_TABLE_STATUS_CODES = {'request': 0, 'accept': 1, 'reject': 2}

profile = Blueprint('profile', __name__, url_prefix='/api')

# Route to get the user profile
@profile.route('/profile', methods=['GET'])
@jwt_required(refresh=True)
def get_profile():
    user_id = get_jwt_identity()

    # Query for messages related to the user
    messages = Messages.query.filter(or_(Messages.sender_id == user_id, Messages.receiver_id == user_id)).order_by(
        Messages.created_at.desc())

    # Query for mentoring sessions where the user is a mentor
    mentorSessions = MentoringSession.query.filter(and_(MentoringSession.mentor_id == user_id,
                                                        MentoringSession.status == MENTORING_TABLE_STATUS_CODES[
                                                            'accept'])).order_by(MentoringSession.created_at.desc())

    # Query for mentoring sessions where the user is a mentee
    menteeSessions = MentoringSession.query.filter(and_(MentoringSession.mentee_id == user_id,
                                                        MentoringSession.status == MENTORING_TABLE_STATUS_CODES[
                                                            'accept'])).order_by(MentoringSession.created_at.desc())

    # Query for mentoring session requests sent by the user
    mentoringRequests = MentoringSession.query.filter(
        and_(MentoringSession.mentor_id == user_id, MentoringSession.status == MENTORING_TABLE_STATUS_CODES['request']))

    # Query for saved items by the user
    saved = Saved.query.filter(Saved.user_id == user_id).order_by(Saved.created_at.desc())

    # Initialize schema instances for data serialization
    messagesSchema = MessagesSchema(many=True)
    mentoringUserSessionSchema = MentoringUserSessionSchema(many=True)
    savedUserSchema = SavedUserSchema(many=True)

    # Prepare the response with serialized data
    response = {
        'messages': messagesSchema.dump(messages),
        'mentorSessions': mentoringUserSessionSchema.dump(mentorSessions),
        'menteeSessions': mentoringUserSessionSchema.dump(menteeSessions),
        'mentoringRequests': mentoringUserSessionSchema.dump(mentoringRequests),
        'saved': savedUserSchema.dump(saved)
    }

    return jsonify(response), 200

# Route to edit the user's name in the profile
@profile.route('/editProfileName', methods=['Post'])
@jwt_required(refresh=True)
def post_edit_edit_profile_name():
    user_id = get_jwt_identity()
    new_name = request.form.get('newName', '')

    user = db.session.query(User).filter(User.id == user_id).first()

    if user:
        user.name = new_name

        db.session.commit()
        return jsonify({'message': 'Profile updated successfully'}), 200
    else:
        return jsonify({'error': 'User not found'}), 404

# Route to edit the user's bio in the profile
@profile.route('/editProfileBio', methods=['Post'])
@jwt_required(refresh=True)
def post_edit_profile_name():
    user_id = get_jwt_identity()
    new_bio = request.form.get('newBio', '')

    user = db.session.query(User).filter(User.id == user_id).first()

    if user:
        user.bio = new_bio

        db.session.commit()
        return jsonify({'message': 'Profile updated successfully'}), 200
    else:
        return jsonify({'error': 'User not found'}), 404

# Route to edit the user's profile image
@profile.route('/editProfileImage', methods=['Post'])
@jwt_required(refresh=True)
def post_edit_image():
    user_id = get_jwt_identity()
    new_image = request.files.get('newImagePath', '')
    image_path = upload_image(image=new_image, user_id=user_id)
    url = generate_presigned_url(image_path)

    user = db.session.query(User).filter(User.id == user_id).first()

    if user:
        user.image_path = url

        db.session.commit()
        return jsonify({'message': 'Profile updated successfully'}), 200
    else:
        return jsonify({'error': 'User not found'}), 404
