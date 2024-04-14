import re
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from flask_cors import CORS  # Import CORS from flask_cors
from config import Config
from models import User, db, HighScore, PowerUp

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
# Initialize Flask-Migrate
migrate = Migrate(app, db)
# Initialize Flask-JWT-Extended
jwt = JWTManager(app)
# Enable CORS for all origins
CORS(app)

# Route for user registration
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        required_fields = ['username', 'email', 'password']
        if not all(key in data for key in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Validate email format
        email = data['email']
        if not re.match(r'^[\w\.-]+@[\w\.-]+$', email):
            return jsonify({'error': 'Invalid email format'}), 400

        # Enforce password complexity rules
        password = data['password']
        if len(password) < 8:
            return jsonify({'error': 'Password must be at least 8 characters long'}), 400
        # Add additional complexity rules as needed...

        # Check if email or username already exists
        existing_user_email = User.query.filter_by(email=email).first()
        existing_user_username = User.query.filter_by(username=data['username']).first()
        if existing_user_email:
            return jsonify({'error': 'Email already exists'}), 409  # 409 Conflict status code
        if existing_user_username:
            return jsonify({'error': 'Username already exists'}), 409  # 409 Conflict status code

        # If email and username are unique, proceed with registration
        new_user = User(username=data['username'], email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500



# Route for user login
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        required_fields = ['email', 'password']
        if not all(key in data for key in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        user = User.query.filter_by(email=data['email']).first()
        if user and user.check_password(data['password']):
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid email or password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to retrieve all users
@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        user_data = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]
        return jsonify(user_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
# Route to retrieve a specific user by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = User.query.get(user_id)
        if user:
            user_data = {'id': user.id, 'username': user.username, 'email': user.email}
            return jsonify(user_data), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
# Route to retrieve all scores
@app.route('/scores', methods=['GET'])

# Route to retrieve scores for the logged-in user
@app.route('/scores/user', methods=['GET'])
@jwt_required()  # Use JWT token to authenticate the user
def get_user_scores():
    try:
        # Retrieve the user ID from the JWT token
        current_user_id = get_jwt_identity()

        # Query the database for scores associated with the user's user_id
        user_scores = Score.query.filter_by(user_id=current_user_id).all()

        # Format the score data
        score_data = [{'id': score.id, 'user_id': score.user_id, 'score_value': score.score_value} for score in user_scores]

        # Return the score data as JSON response
        return jsonify(score_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def get_scores():
    try:
        scores = Score.query.all()
        score_data = [{'id': score.id, 'user_id': score.user_id, 'score_value': score.score_value} for score in scores]
        return jsonify(score_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
# Route to add a new score
@app.route('/scores', methods=['POST'])
def add_score():
    try:
        data = request.get_json()
        required_fields = ['user_id', 'score_value']
        if not all(key in data for key in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        user_id = data['user_id']
        score_value = data['score_value']
        # Check if user exists
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        # Add the score for the user
        new_score = Score(user_id=user_id, score_value=score_value)
        db.session.add(new_score)
        db.session.commit()
        return jsonify({'message': 'Score added successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Route to retrieve all high scores
@app.route('/highscores', methods=['GET'])
def get_high_scores():
    try:
        high_scores = HighScore.query.all()
        score_data = [{'id': score.id, 'user_id': score.user_id, 'score_value': score.score_value} for score in high_scores]
        return jsonify(score_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to add a new high score
@app.route('/highscores', methods=['POST'])
def add_high_score():
    try:
        data = request.get_json()
        required_fields = ['user_id', 'score_value']
        if not all(key in data for key in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        user_id = data['user_id']
        score_value = data['score_value']
        # Check if user exists
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        # Add the high score for the user
        new_high_score = HighScore(user_id=user_id, score_value=score_value)
        db.session.add(new_high_score)
        db.session.commit()
        return jsonify({'message': 'High score added successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Route to retrieve all power-ups
@app.route('/powerups', methods=['GET'])
def get_power_ups():
    try:
        power_ups = PowerUp.query.all()
        power_up_data = [{'id': power_up.id, 'name': power_up.name, 'description': power_up.description, 'effect': power_up.effect, 'duration': power_up.duration} for power_up in power_ups]
        return jsonify(power_up_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to add a new power-up
@app.route('/powerups', methods=['POST'])
def add_power_up():
    try:
        data = request.get_json()
        required_fields = ['name', 'description', 'effect', 'duration']
        if not all(key in data for key in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        # Create a new power-up instance
        new_power_up = PowerUp(name=data['name'], description=data['description'], effect=data['effect'], duration=data['duration'])
        db.session.add(new_power_up)
        db.session.commit()
        return jsonify({'message': 'Power-up added successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500



# Route for the home page
@app.route('/')
def home():
    return 'Welcome to HungryPenguin!'

if __name__ == '__main__':
    app.run(debug=True)
