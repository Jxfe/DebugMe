from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..debugme_toolkit import db, botox
from sqlalchemy import and_
from ..models.Premium import Premium, PremiumSchema, GuideFeedbackSchema
from werkzeug.utils import secure_filename
from ..models.Saved import Saved, SavedSchema, SavedUserSchema
import boto3
from botocore.exceptions import NoCredentialsError

SAVED_TABLE_CODES = {'post': 0, 'guide': 1}

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
        AWS_ACCESS_KEY = 'AKIAROYXHMJTMPJC4O4A'
        AWS_SECRET_ACCESS_KEY = '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'
        BUCKET_NAME = 'debugme'

        s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
        try:
            url = s3.generate_presigned_url(
                ClientMethod='get_object',
                Params={
                    'Bucket': BUCKET_NAME,
                    'Key': guide.image_path
                }
            )
            return jsonify({'url': url}), 200
        except NoCredentialsError:
            return jsonify({'error': 'Error in getting credentials'}), 500
    else:
        return jsonify({'error': 'No image found'}), 404

@guides.route('/guides', methods=['POST'])
@jwt_required(refresh=True)
def create_guide():
    title = request.form.get('title', '')
    content = request.form.get('content', '')
    user_id = get_jwt_identity()

    image = request.files.get('image_path')
    if image:
        filename = secure_filename(image.filename)
        AWS_ACCESS_KEY = 'AKIAROYXHMJTMPJC4O4A'
        AWS_SECRET_ACCESS_KEY = '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'
        BUCKET_NAME = 'debugme'

        # Creates an S3 client
        s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
        s3.upload_fileobj(
            Fileobj=image,
            Bucket=BUCKET_NAME,
            Key=filename,
            ExtraArgs={'ContentType': image.content_type}
        )
        image_path = filename
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
