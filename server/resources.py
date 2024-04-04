from flask import request
from flask_restful import Resource
from models import db, User
from schemas import UserSchema

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class UsersResource(Resource):
    def get(self, user_id=None):
        if user_id:
            user = User.query.get_or_404(user_id)
            return user_schema.jsonify(user)
        else:
            users = User.query.all()
            return users_schema.jsonify(users)

    def post(self):
        try:
            data = request.get_json()
            # Validate and deserialize request data
            user = user_schema.load(data)
            db.session.add(user)
            db.session.commit()
            return user_schema.jsonify(user), 201
        except Exception as e:
            return {"message": str(e)}, 400

    def put(self, user_id):
        try:
            user = User.query.get_or_404(user_id)
            data = request.get_json()
            # Validate and deserialize request data
            user = user_schema.load(data, instance=user)
            db.session.commit()
            return user_schema.jsonify(user)
        except Exception as e:
            return {"message": str(e)}, 400
