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

@tests.route('/api/posts', methods=['GET'])
def get_posts():
    input = request.args.get('search', '')
    search = "'%" + input + "%'"

    engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)

    with engine.connect() as connection:
      if search:
          result = connection.execute(text('SELECT * FROM Post WHERE content LIKE ' + search))
      else:
          result = connection.execute(text('SELECT * FROM Post'))

    rows = result.fetchall()
    posts = []
    for row in rows:
        posts.append({
            "id": row[0],
            "content": row[1],
            "user_id": row[2],
            "forum_id": row[3],
            "created_at": row[4],
            "updated_at": row[5]
        })

    return jsonify(posts)