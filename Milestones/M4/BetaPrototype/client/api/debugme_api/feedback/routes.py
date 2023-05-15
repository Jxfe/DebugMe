from flask import request, jsonify, Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from debugme_api.config import Config
from ..debugme_toolkit import db
from sqlalchemy import create_engine, text, func
from ..models.Feedback import Feedback, FeedbackSchema
from ..models.Premium import Premium

feedback = Blueprint('feedback', __name__)

@feedback.route('/api/feedback/<int:postID>', methods=['GET'])
def get_feedback(postID):
    engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
    with engine.connect() as connection:
        result = connection.execute(
            text('SELECT * FROM Feedback WHERE postID =' + str(postID) + ';'))

        feedbacks = result.fetchall()
        connection.close()

    feedbackSchema = FeedbackSchema(many=True)
    response = feedbackSchema.dump(feedbacks)

    return jsonify(response), 200

@feedback.route('/api/feedback', methods=['POST'])
@jwt_required(refresh=True)
def create_feedback():
    #print(request.form)
    userID = get_jwt_identity()
    rating = request.form.get('rating', '')
    message = request.form.get('message', '')
    postID = request.form.get('postID')

    if not userID or not rating or not postID:
        abort(400, message='Invalid request')

    feedbackSchema = FeedbackSchema()
    newFeedback = Feedback(userID, rating, message, postID)
    db.session.add(newFeedback)
    db.session.commit()

    updateGuideRating(guide_id=postID)

    response = feedbackSchema.dump(newFeedback)

    return jsonify(response), 201

def updateGuideRating(guide_id):
    guide = Premium.query.get(guide_id)
    rating_avg = Feedback.query.with_entities(func.avg(Feedback.rating)).filter(Feedback.postID==guide_id).all()

    guide.rating = rating_avg[0][0]
    db.session.commit()
