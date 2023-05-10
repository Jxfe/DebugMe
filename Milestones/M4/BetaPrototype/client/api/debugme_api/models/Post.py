import datetime
from debugme_api.debugme_toolkit import db, ma

class Post(db.Model):
    __tablename__ = 'Post'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_path = db.Column(db.String(255))
    is_premium = db.Column(db.Boolean, nullable=False, default=False)
    user_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    def __init__(self, title, content, user_id, image_path=None, is_premium=False):
        self.title = title
        self.content = content
        self.user_id = user_id
        self.image_path = image_path
        self.is_premium = is_premium

class PostSchema(ma.Schema):
    class Meta:
        fields = ('title', 'content', 'user_id', 'image_path', 'is_premium')
