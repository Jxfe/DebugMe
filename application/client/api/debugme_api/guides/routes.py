from flask import request, jsonify, Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..debugme_toolkit import db, generate_presigned_url, upload_image
from sqlalchemy import and_
from ..models.Premium import Premium, PremiumSchema, GuideFeedbackSchema
from ..models.Saved import Saved, SavedSchema, SavedUserSchema
from ..models.Feedback import Feedback

SAVED_TABLE_CODES = {'post': 0, 'guide': 1}
DEFAULT_GUIDE_IMAGE = "/logo.png"

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
        guide_data = guideFeedbackSchema.dump(guide)

        if guide.image_path:
            url = generate_presigned_url(image_path=guide.image_path)

            if url is None:
                guide_data['image_url'] = DEFAULT_GUIDE_IMAGE
            else:
                guide_data['image_url'] = url

        else:
            guide_data['image_url'] = DEFAULT_GUIDE_IMAGE

        response.append(guide_data)

    return jsonify(response), 200

@guides.route('/getguide', methods=['GET'])
@jwt_required(refresh=True)
def get_guide():
    user_id = get_jwt_identity()
    guide_id = request.args.get('id', 0)

    guide = Premium.query.get(guide_id)
    guideFeedbackSchema = GuideFeedbackSchema()

    savedSchema = SavedSchema(many=True)
    saves = Saved.query.filter(Saved.user_id==user_id).order_by(Saved.created_at.desc())

    response = guideFeedbackSchema.dump(guide)
    response['saves'] = savedSchema.dump(saves)

    return jsonify(response), 200

@guides.route('/getguideimage', methods=['GET'])
def get_guide_image():
    guide_id = request.args.get('id', 0)

    guide = Premium.query.get(guide_id)

    if guide and guide.image_path:
        url = generate_presigned_url(guide.image_path)

        if url is None:
            return jsonify({'url': DEFAULT_GUIDE_IMAGE})
            #return jsonify({'error': 'Error in getting credentials'}), 500

        else:
            return jsonify({'url': url}), 200

    else:
        return jsonify({'url': DEFAULT_GUIDE_IMAGE})

@guides.route('/guides', methods=['POST'])
@jwt_required(refresh=True)
def create_guide():
    title = request.form.get('title', '')
    content = request.form.get('content', '')
    user_id = get_jwt_identity()

    image = request.files.get('image_path')
    if image:
        image_path = upload_image(image=image, user_id=user_id)

    else:
        image_path = ''

    guideSchema = PremiumSchema()
    newGuide = Premium(title, content, user_id, image_path, rating=0.0)

    db.session.add(newGuide)
    db.session.commit()

    response = guideSchema.dump(newGuide)

    return jsonify(response), 201

@guides.route('/saveguide', methods=['POST'])
@jwt_required(refresh=True)
def save_guide():
    user_id = get_jwt_identity()
    guide_id = request.form.get('guide_id', '')
    is_premium = SAVED_TABLE_CODES['guide']
    saved_schema = SavedSchema()

    saved = Saved.query.filter(and_(Saved.post_id==guide_id, Saved.user_id==user_id)).first()

    if saved:
        response = "You've already saved this guide."
        return jsonify(response), 409
    else:
        new_save = Saved(post_id=guide_id, user_id=user_id, is_premium=is_premium)

        db.session.add(new_save)
        db.session.commit()

        response = saved_schema.dump(new_save)
        return jsonify(response), 201

@guides.route('/removesavedguide', methods=['POST'])
@jwt_required(refresh=True)
def remove_guide():
    user_id = get_jwt_identity()
    guide_id = request.form.get('guide_id', '')
    saved_schema = SavedSchema()

    save = Saved.query.filter(and_(Saved.post_id==guide_id, Saved.user_id==user_id)).first()

    if save:
        Saved.query.filter(and_(Saved.post_id==guide_id, Saved.user_id==user_id)).delete(synchronize_session='fetch')
        db.session.commit()

        response = saved_schema.dump(save)
        return jsonify(response), 200

    else:
        response = "You haven't liked this post yet."
        return jsonify(response), 409


@guides.route('/deleteguide', methods=['DELETE', 'POST'])
@jwt_required(refresh=True)
def delete_guide():
    user_id = get_jwt_identity()
    guide_id = request.form.get('id', None)

    if guide_id is None:
        abort(400, 'Missing id parameter')

    elif guide_id == '':
        abort(400, 'id parameter is blank')

    guide = Premium.query.get(guide_id)

    if guide is None:
        abort(400, 'Guide does not exist')

    elif guide.user_id != user_id:
        abort(400, 'You can only delete guides you authored')

    else:
        Feedback.query.filter(Feedback.premiumID==guide_id).delete(synchronize_session='fetch')
        Saved.query.filter(Saved.post_id==guide_id).delete(synchronize_session='fetch')

        db.session.delete(guide)
        db.session.commit()

    response = {"message": 'Guide has been successfully removed'}

    return jsonify(response), 200