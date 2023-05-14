import datetime
from debugme_api.debugme_toolkit import db, ma

class Likes(db.Model):
    __tablename__ = 'Likes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    post_id = db.Column(db.Integer, db.ForeignKey('Posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    is_premium = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, post_id, user_id, is_premium):
        self.post_id = post_id
        self.user_id = user_id
        self.is_premium = is_premium

class LikesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'post_id', 'user_id', 'is_premium', 'created_at')