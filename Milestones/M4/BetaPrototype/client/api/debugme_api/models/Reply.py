import datetime
from debugme_api.debugme_toolkit import db, ma

class Reply(db.Model):
    __tablename__ = 'Reply'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('Post.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = db.relationship("User", foreign_keys=[user_id])
    post = db.relationship("Post", foreign_keys=[post_id])

    def __init__(self, content, user_id, post_id):
        self.content = content
        self.user_id = user_id
        self.post_id = post_id

class ReplySchema(ma.Schema):
    class Meta:
        fields = ('id', 'content', 'user_id', 'post_id', 'created_at', 'updated_at')
