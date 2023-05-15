import datetime
from debugme_api.models.User import UserSchema
from debugme_api.debugme_toolkit import db, ma

class Reply(db.Model):
    __tablename__ = 'Reply'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    image_path = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('Post.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    author = db.relationship("User", lazy="joined", viewonly=True)

    def __init__(self, content, user_id, post_id, image_path=None):
        self.content = content
        self.user_id = user_id
        self.post_id = post_id
        self.image_path = image_path

class ReplySchema(ma.Schema):
    class Meta:
        fields = ('id', 'content', 'image_path', 'user_id', 'post_id', 'created_at', 'updated_at')

class ReplyUserSchema(ma.SQLAlchemyAutoSchema):
    author = ma.Nested(UserSchema)
    class Meta:
        model = Reply