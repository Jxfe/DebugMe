import datetime
from debugme_api.debugme_toolkit import db, ma


class Messages(db.Model):
    __tablename__ = 'Messages'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    receiver_id = db.Column(
        db.Integer, db.ForeignKey('User.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    sender = db.relationship("User", foreign_keys=[sender_id])
    receiver = db.relationship("User", foreign_keys=[receiver_id])

    def __init__(self, content, sender_id, sender_email, receiver_id, receiver_email):
        self.content = content
        self.sender_id = sender_id
        self.sender_email = sender_email
        self.receiver_id = receiver_id
        self.receiver_email = receiver_email


class MessagesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'content', 'sender_id', 'sender_email',
                  'receiver_id', 'receiver_email', 'created_at')
