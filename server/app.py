import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent))

from flask import Flask, request, jsonify
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from config import Config
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

# Remove redundant route definitions for '/api/users'
# Route handlers for these URLs are already handled by UserResource

@app.route('/')
def index():
    return '<h1>HungryPenguin</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)
