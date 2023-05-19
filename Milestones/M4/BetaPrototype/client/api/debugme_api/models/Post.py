import datetime
from debugme_api.debugme_toolkit import db, ma
from .Reply import ReplyUserSchema
from .Likes import LikesUserSchema
from .User import UserSchema

class Post(db.Model):
    __tablename__ = 'Post'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_path = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    author = db.relationship("User", lazy="joined", viewonly=True)
    replies = db.relationship("Reply", lazy="joined",viewonly=True)
    likes = db.relationship("Likes", lazy="joined",viewonly=True)

    def __init__(self, title, content, user_id, image_path=None):
        self.title = title
        self.content = content
        self.user_id = user_id
        self.image_path = image_path

class PostSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'content', 'user_id', 'image_path')

class PostRepliesSchema(ma.SQLAlchemyAutoSchema):
    replies = ma.Nested(ReplyUserSchema, many=True)
    likes = ma.Nested(LikesUserSchema, many=True)
    author = ma.Nested(UserSchema)
    class Meta:
        model = Post