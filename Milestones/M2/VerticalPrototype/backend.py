from flask import Flask, request, jsonify, abort
from flask_mysqldb import MySQL
from flask_cors import CORS  # Import CORS
import collections

collections.Iterable = collections.abc.Iterable

app = Flask(__name__)
#CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})

# MySQL configurations
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'Team_2_Egg!'
app.config['MYSQL_HOST'] = 'debugme.cdvwzysjp5ac.us-west-2.rds.amazonaws.com'
app.config['MYSQL_DB'] = 'debugme'

mysql = MySQL(app)

@app.route('/users', methods=['POST'])
def create_user():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    userRank = request.form['userRank']

    cursor = mysql.connection.cursor()
    cursor.execute(
        'INSERT INTO User (name, email, password, userRank) VALUES (%s, %s, %s, %s)',
        (name, email, password, userRank)
    )
    mysql.connection.commit()
    cursor.close()

    return jsonify({"status": "success", "message": "User created successfully"}), 201

@app.route('/users', methods=['GET'])
def get_users():
    search = request.args.get('search', '')

    cursor = mysql.connection.cursor()

    if search:
        cursor.execute('SELECT * FROM User WHERE name LIKE %s OR email LIKE %s', (f'%{search}%', f'%{search}%'))
    else:
        cursor.execute('SELECT * FROM User')

    rows = cursor.fetchall()
    cursor.close()

    users = []
    for row in rows:
        users.append({
            "id": row[0],
            "name": row[1],
            "email": row[2],
            "password": row[3],
            "userRank": row[4],
            "created_at": row[5]
        })

    return jsonify(users)




@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM User WHERE id = %s', (user_id,))
    row = cursor.fetchone()
    cursor.close()

    if row:
        user = {
            "id": row[0],
            "name": row[1],
            "email": row[2],
            "password": row[3],
            "userRank": row[4],
            "created_at": row[5]
        }
        return jsonify(user)
    else:
        abort(404)

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    userRank = request.form['userRank']

    cursor = mysql.connection.cursor()
    cursor.execute(
        'UPDATE User SET name=%s, email=%s, password=%s, userRank=%s WHERE id=%s',
        (name, email, password, userRank, user_id)
    )
    mysql.connection.commit()
    cursor.close()

    return jsonify({"status": "success", "message": "User updated successfully"})

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    cursor = mysql.connection.cursor()
    cursor.execute('DELETE FROM User WHERE id = %s', (user_id,))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"status": "success", "message": "User deleted successfully"})



@app.route('/api/posts', methods=['GET'])
def get_posts():
    search = request.args.get('search', '')

    cursor = mysql.connection.cursor()

    if search:
        cursor.execute('SELECT * FROM Post WHERE content LIKE %(search)s ', {'search': search})
    else:
        cursor.execute('SELECT * FROM Post')

    rows = cursor.fetchall()
    cursor.close()


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

    # posts = [{
    #     "id": 1,
    #     "content": "Test",
    #     "user_id": 1234,
    #     "forum_id": 1,
    #     "created_at": "now",
    #     "updated_at": "null"
    # }]

    return jsonify(posts)

@app.route('/api/posts', methods=['POST'])
def create_post():
    id = request.form['id']
    content = request.form['content']
    user_id = request.form['user_id']
    forum_id = request.form['forum_id']

    cursor = mysql.connection.cursor()
    cursor.execute(
        'INSERT INTO Post (id, content, user_id, forum_id, created_at, updated_at) VALUES (%(id)s, %(content)s, %(user_id)s, %(forum_id)s, NOW(), NOW())',
        ({'id': id,
          'content': content,
          'user_id': user_id,
          'forum_id': forum_id})
    )
    mysql.connection.commit()
    cursor.close()

    return jsonify({"status": "success", "message": "User created successfully"}), 201


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')