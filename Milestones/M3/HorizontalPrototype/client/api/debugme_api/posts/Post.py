from flask import request,jsonify, make_response
from flask_restful import Resource
from debugme_api.config import Config
from ..debugme_toolkit import db
from sqlalchemy import create_engine, text

class Post(Resource):
    def get(self):
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

    def post(self):
        #id = request.form['id']
        content = request.form['content']
        user_id = request.form['user_id']
        forum_id = request.form['forum_id']

        engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)

        with engine.connect() as connection:
            connection.execute(text('INSERT INTO Post (content, user_id, forum_id) VALUES (\'%s\', \'%s\', \'%s\')' %(content, user_id, forum_id)))
            connection.commit()

        response = jsonify({"status": "success", "message": "User created successfully"})
        response.status_code = 201

        return response