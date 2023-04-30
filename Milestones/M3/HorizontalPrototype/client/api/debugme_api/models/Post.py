import datetime
from debugme_api.debugme_toolkit import db, ma

class Post(db.Model):
    __tablename__ = 'Post'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer)
    forum_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, content, user_id, forum_id):
        self.content = content
        self.user_id = user_id
        self.forum_id = forum_id

class PostSchema(ma.Schema):
    class Meta:
            fields = ('content', 'user_id', 'forum_id')
