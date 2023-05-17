import datetime
from debugme_api.debugme_toolkit import db, ma
from .Feedback import FeedbackUserSchema
from .User import UserSchema

class Premium(db.Model):
    __tablename__ = 'Premium'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_path = db.Column(db.String(255))
    rating = db.Column(db.Numeric(4,2))
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    author = db.relationship("User", lazy="joined", viewonly=True)
    feedback = db.relationship("Feedback", lazy="joined", viewonly=True)

    def __init__(self, title, content, user_id, image_path=None, rating=0):
        self.title = title
        self.content = content
        self.user_id = user_id
        self.image_path = image_path
        self.rating = rating

class PremiumSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'content', 'user_id', 'image_path', 'rating')

class GuideFeedbackSchema(ma.SQLAlchemyAutoSchema):
    feedback = ma.Nested(FeedbackUserSchema, many=True)
    author = ma.Nested(UserSchema)
    class Meta:
        model = Premium