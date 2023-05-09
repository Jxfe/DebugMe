import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()    # Load environment variables from .env

class Config:
    """Add credentials here. Note: you must have a .env file on this directory, with the
    desired values.
    """
    # Debugme Secret Key
    SECRET_KEY=os.environ.get('SECRET_KEY')

    # JSON Web Token settings
    JWT_SECRET_KEY=SECRET_KEY
    JWT_TOKEN_LOCATION=['cookies']
    JWT_COOKIE_SECURE=False
    JWT_ACCESS_TOKEN_EXPIRES=timedelta(minutes=15)
    JWT_REFRESH_TOKEN_EXPIRES=timedelta(days=1)

    # AWS Database settings
    AWS_USERNAME=os.environ.get('AWS_USERNAME')
    AWS_PASSWORD=os.environ.get('AWS_PASSWORD')
    AWS_DB_HOSTNAME=os.environ.get('AWS_DB_HOSTNAME')
    AWS_DB_NAME=os.environ.get('AWS_DB_NAME')

class ProductionConfig(Config):
    """Production Credentials go here, like production DB settings
    Args:
        Config (_type_): _description_
    """
    Config.SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username=Config.AWS_USERNAME,
    password=Config.AWS_PASSWORD,
    hostname=Config.AWS_DB_HOSTNAME,
    databasename=Config.AWS_DB_NAME
    )
    Config.SQLALCHEMY_POOL_RECYCLE=299
    Config.SQLALCHEMY_TRACK_MODIFICATIONS=False
    Config.SQLALCHEMY_ECHO=False
    Config.DEBUG=False

class DevelopmentConfig(Config):
    """Production Credentials go here, like local DB settings
    Args:
        Config (_type_): _description_
    """
    Config.DEBUG=True

app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}