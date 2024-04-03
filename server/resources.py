from flask_restful import Resource
from models import User
from schemas import UserSchema

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class UserResource(Resource):
    def get(self, user_id=None):
        if user_id:
            user = User.query.get_or_404(user_id)
            return user_schema.jsonify(user)
        else:
            users = User.query.all()
            return users_schema.jsonify(users)

    def post(self):
        data = request.get_json()
        user = user_schema.load(data)
        db.session.add(user)
        db.session.commit()
        return user_schema.jsonify(user), 201

    def put(self, user_id):
        user = User.query.get_or_404(user_id)
        data = request.get_json()
        user = user_schema.load(data
