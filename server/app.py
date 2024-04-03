from .schemas import UserSchema, GameSchema
from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from config import Config
from models import User, Game, Score
from resources.user import UserResource
from resources.game import GameResource
from resources.score import ScoreResource

# Initialize app and setup database
app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)

# Import API resources
api = Api(app)

# Add resources to API
api.add_resource(UserResource, '/users')
api.add_resource(GameResource, '/games')
api.add_resource(ScoreResource, '/scores')

# Define routes for handling HTTP requests
@app.route('/')
def index():
    return '<h1>HungryPenguin</h1>'

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(username=data['username'], email=data['email'])
    db.session.add(user)
    db.session.commit()
    return user.to_dict(), 201

if __name__ == '__main__':
    app.run(port=5555, debug=True)
