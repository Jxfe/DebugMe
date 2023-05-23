import datetime
from debugme_api.models.User import UserSchema
from debugme_api.debugme_toolkit import db, ma

class Feedback(db.Model):
    __tablename__ = 'Feedback'
    id = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    message = db.Column(db.Text)
    premiumID = db.Column(db.Integer, db.ForeignKey('Premium.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    author = db.relationship("User", lazy="joined", foreign_keys=[userID], viewonly=True)

    def __init__(self, userID, rating, message, guideID):
        self.userID = userID
        self.rating = rating
        self.message = message
        self.premiumID = guideID


class FeedbackSchema(ma.Schema):
    class Meta:
        fields = ('id', 'userID', 'rating', 'message', 'premiumID', 'created_at')

class FeedbackUserSchema(ma.SQLAlchemyAutoSchema):
    author = ma.Nested(UserSchema)
    class Meta:
        model = Feedback
