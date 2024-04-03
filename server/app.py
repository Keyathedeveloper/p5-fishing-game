from flask import Flask, request
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from config import Config

# Initialize app and setup database
app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)

# Import models
from models import User, Game, Score

# Import API resources
from resources.user import UserResource
from resources.game import GameResource
from resources.score import ScoreResource

# Setup API
api = Api(app)

# Add resources to API
api.add_resource(UserResource, '/users')
api.add_resource(GameResource, '/games')
api.add_resource(ScoreResource, '/scores')

if __name__ == '__main__':
    app.run(debug=True)
