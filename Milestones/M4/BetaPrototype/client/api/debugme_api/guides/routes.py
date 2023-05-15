from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from debugme_api.config import Config
from ..debugme_toolkit import db
from sqlalchemy import create_engine, text, and_
from ..models.Premium import Premium, PremiumSchema, GuideFeedbackSchema

guides = Blueprint('guides', __name__, url_prefix='/api')

@guides.route('/guides', methods=['GET'])
@jwt_required(refresh=True)
def get_guides():
    input = request.args.get('search', '')

    if input != '':
        search = "%" + input + "%"

        guides = Premium.query.filter(Premium.title.like(search)).order_by(Premium.created_at.desc())
    else:
        guides = Premium.query.order_by(Premium.created_at.desc())

    response = []
    guideFeedbackSchema = GuideFeedbackSchema()
    for guide in guides:
        response.append(guideFeedbackSchema.dump(guide))

    return jsonify(response), 200

@guides.route('/getguide', methods=['GET'])
@jwt_required(refresh=True)
def get_guide():
    guide_id = request.args.get('id', 0)

    guide = Premium.query.get(guide_id)
    guideFeedbackSchema = GuideFeedbackSchema()

    response = guideFeedbackSchema.dump(guide)

    return jsonify(response), 200

@guides.route('/guides', methods=['POST'])
@jwt_required(refresh=True)
def create_guide():
    title = request.form.get('title', '')
    content = request.form.get('content', '')
    user_id = get_jwt_identity()
    image_path = request.form.get('image_path', '')

    guideSchema = PremiumSchema()
    newGuide = Premium(title, content, user_id, image_path, rating=0.0)

    db.session.add(newGuide)
    db.session.commit()

    response = guideSchema.dump(newGuide)

    return jsonify(response), 201