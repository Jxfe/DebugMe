import datetime
from debugme_api.debugme_toolkit import db, ma

class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    userRank = db.Column(db.Integer, nullable=True, default=0)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, name, email, password, userRank=0):
        self.name = name
        self.email = email
        self.password = password
        self.userRank = userRank

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'userRank')