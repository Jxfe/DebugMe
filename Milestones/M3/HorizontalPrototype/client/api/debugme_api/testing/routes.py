from flask import request, flash, jsonify, Blueprint, render_template
from debugme_api.config import Config
from ..debugme_toolkit import db
from sqlalchemy import create_engine, text

tests = Blueprint('tests', __name__)

@tests.route("/api/config")
def testing():
    return {
        "AWS_USERNAME": Config.AWS_USERNAME,
        "AWS_PASSWORD": Config.AWS_PASSWORD,
        "AWS_DB_HOSTNAME": Config.AWS_DB_HOSTNAME,
        "AWS_DB_NAME": Config.AWS_DB_NAME,
        "SQLALCHEMY_DATABASE_URI": Config.SQLALCHEMY_DATABASE_URI
    }