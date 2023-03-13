from team_egg_apis import db
from flask_login import UserMixin
from sqlalchemy.sql import func


class Forum(db.Model):
    # database schema
    id = db.Column(db.Integer, primary_key=True)
    post = db.Column(db.String(1000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class User(db.Model, UserMixin):
    # database schema
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    name = db.Column(db.String(150))
    posts = db.relationship('Forum')
