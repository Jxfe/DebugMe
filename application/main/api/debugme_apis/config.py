import os


class Config():
    """Add credentials here
    """

    # Add AWS settings

    # Add .env settings


class ProductionConfig(Config):
    """Production Credentials go here, like production DB settings

    Args:
        Config (_type_): _description_
    """
    DEBUG=False

class DevelopmentConfig(Config):
    """Production Credentials go here, like local DB settings

    Args:
        Config (_type_): _description_
    """
    DEBUG=True

app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}