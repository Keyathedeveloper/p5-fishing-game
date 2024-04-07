from flask_restful import Resource, reqparse
from models import User, db
from schemas import UserSchema

user_schema = UserSchema()

class UserResource(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True, help='Username is required')
        parser.add_argument('email', type=str, required=True, help='Email is required')
        parser.add_argument('password', type=str, required=True, help='Password is required')
        args = parser.parse_args()

        # Check if the username or email already exists
        existing_user = User.query.filter_by(username=args['username']).first()
        if existing_user:
            return {'message': 'Username already exists'}, 400
        existing_email = User.query.filter_by(email=args['email']).first()
        if existing_email:
            return {'message': 'Email already exists'}, 400

        # Create a new user
        new_user = User(username=args['username'], email=args['email'])
        new_user.set_password(args['password'])
        db.session.add(new_user)
        db.session.commit()

        return user_schema.dump(new_user), 201

    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404
        return user_schema.dump(user), 200

    def put(self, user_id):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str)
        parser.add_argument('email', type=str)
        args = parser.parse_args()

        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404

        # Update user information
        if args['username']:
            user.username = args['username']
        if args['email']:
            user.email = args['email']
        db.session.commit()

        return user_schema.dump(user), 200

    def delete(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully'}, 200
