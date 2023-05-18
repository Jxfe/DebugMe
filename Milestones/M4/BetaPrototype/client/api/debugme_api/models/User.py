import datetime
from debugme_api.debugme_toolkit import db, ma
# from debugme_api.models.Messages import MessagesSchema
# from debugme_api.models.Saved import SavedUserSchema
# from debugme_api.models.Mentoring import MentoringSessionSchema

class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    userRank = db.Column(db.Integer, nullable=True, default=0)
    bio = db.Column(db.Text)
    image_path = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # messages = db.relationship("Messages", lazy="joined", viewonly=True)
    # saves = db.relationship("Saved", lazy="joined", viewonly=True )
    # mentoring = db.relationship("MentoringSesions", lazy="joined", viewonly=True)

    def __init__(self, name, email, password, userRank=0, bio=None, image_path=None):
        self.name = name
        self.email = email
        self.password = password
        self.userRank = userRank
        self.bio = bio
        self.image_path = image_path

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'userRank', 'bio', 'image_path') 

# class UserProfileSchema(ma.SQLAlchemyAutoSchema):
#     messages = ma.Nested(MessagesSchema, many=True)
#     saves = ma.Nested(SavedUserSchema, many=True)
#     mentoring = ma.Nested(MentoringSessionSchema, many=True)
#     class Meta:
#         model = User