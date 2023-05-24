from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_botox import Boto3
from .config import Config
from botocore.exceptions import NoCredentialsError

db = SQLAlchemy()
api = Api()
ma = Marshmallow()
jwt = JWTManager()
botox = Boto3()

def generate_presigned_url(image_path):
    s3 = botox.clients['s3']

    try:
        url = s3.generate_presigned_url(
            ClientMethod='get_object',
            Params={
                'Bucket': Config.AWS_BUCKET_NAME,
                'Key': image_path
            }
        )
        return url
    except NoCredentialsError:
        return None