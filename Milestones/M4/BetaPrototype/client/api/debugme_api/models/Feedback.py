import datetime
from debugme_api.debugme_toolkit import db, ma

class Feedback(db.Model):
    __tablename__ = 'Feedback'
    id = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    message = db.Column(db.Text)
    postID = db.Column(db.Integer, db.ForeignKey('Post.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship("User", foreign_keys=[userID])
    post = db.relationship("Post", foreign_keys=[postID])

    def __init__(self, userID, rating, message, postID):
        self.userID = userID
        self.rating = rating
        self.message = message
        self.postID = postID


class FeedbackSchema(ma.Schema):
    class Meta:
        fields = ('id', 'userID', 'rating', 'message', 'postID', 'created_at')
