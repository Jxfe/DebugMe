import datetime
from debugme_api.debugme_toolkit import db, ma
from debugme_api.models.User import UserSchema

class Likes(db.Model):
    __tablename__ = 'Likes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    post_id = db.Column(db.Integer, db.ForeignKey('Post.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    is_premium = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    author = db.relationship("User", lazy="joined", viewonly=True)

    def __init__(self, post_id, user_id, is_premium):
        self.post_id = post_id
        self.user_id = user_id
        self.is_premium = is_premium

class LikesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'post_id', 'user_id', 'is_premium', 'created_at')

class LikesUserSchema(ma.SQLAlchemyAutoSchema):
    author = ma.Nested(UserSchema)
    class Meta:
        model = Likes