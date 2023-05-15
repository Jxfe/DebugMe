import datetime
from debugme_api.debugme_toolkit import db, ma

class MentoringSession(db.Model):
    __tablename__ = 'MentoringSessions'

    id = db.Column(db.Integer, primary_key=True)
    mentee_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    mentor_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    status = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    mentee = db.relationship("User", foreign_keys=[mentee_id])
    mentor = db.relationship("User", foreign_keys=[mentor_id])

    def __init__(self, mentee_id, mentor_id, status=0):
        self.mentee_id = mentee_id
        self.mentor_id = mentor_id
        self.status = status

class MentoringSessionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'mentee_id', 'mentor_id', 'status', 'created_at')