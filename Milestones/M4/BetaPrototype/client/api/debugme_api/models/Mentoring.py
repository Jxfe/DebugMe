import datetime
from debugme_api.debugme_toolkit import db, ma
from debugme_api.models.User import UserSchema

class MentoringSession(db.Model):
    __tablename__ = 'MentoringSessions'

    id = db.Column(db.Integer, primary_key=True)
    mentee_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    mentor_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    status = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    #mentee = db.relationship("User", foreign_keys=[mentee_id])
    #mentor = db.relationship("User", foreign_keys=[mentor_id])
    mentee = db.relationship("User", lazy="joined", foreign_keys=[mentee_id], viewonly=True)
    mentor = db.relationship("User", lazy="joined", foreign_keys=[mentor_id], viewonly=True)

    def __init__(self, mentee_id, mentor_id, status=0):
        self.mentee_id = mentee_id
        self.mentor_id = mentor_id
        self.status = status

class MentoringSessionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'mentee_id', 'mentor_id', 'status', 'created_at')

class MentoringUserSessionSchema(ma.SQLAlchemyAutoSchema):
    mentor = ma.Nested(UserSchema)
    mentee = ma.Nested(UserSchema)
    class Meta:
        model = MentoringSession