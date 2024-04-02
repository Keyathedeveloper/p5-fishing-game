from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager
from flask_jwt_extended import JWTManager

app = Flask(__name__)

# Load the environment variables from the .env file
app.config.from_envvar('ENV_FILE')

# Set up the database
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Set up the CORS
CORS(app)

# Set up the login and authentication
login_manager = LoginManager(app)
jwt = JWTManager(app)

# Define the models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    roles = db.relationship('Role', secondary='user_role', backref='users')

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    users = db.relationship('User', secondary='user_role', backref='roles')

class UserRole(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    players = db.relationship('Player', secondary='game_player', backref='games')

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    games = db.relationship('Game', secondary='game_player', backref='players')

class GamePlayer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)

# Define the database tables
db.create_all()

# Define the API routes
@app.route('/api/games', methods=['GET'])
def get_games():
    games = Game.query.all()
    return jsonify([game.serialize() for game in games])

@app.route('/api/games', methods=['POST'])
def create_game():
    name = request.json['name']
    description = request.json['description']

    game = Game(name=name, description=description)
    db.session.add(game)
    db.session.commit()

    return jsonify(game.serialize()), 201

@app.route('/api/games/<int:game_id>', methods=['PUT'])
def update_game(
