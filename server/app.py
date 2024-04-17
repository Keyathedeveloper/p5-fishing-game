import re
from flask import Flask, request, jsonify, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from datetime import timedelta
from Config import config
from models import User, db, HighScore, PowerUp

app = Flask(__name__)
app.config.from_object(Config)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)  # Set session expiry time
db.init_app(app)
migrate = Migrate(app, db)
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
            return jsonify({'error': 'Email already exists'}), 409
        if existing_user_username:
            return jsonify({'error': 'Username already exists'}), 409

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
            session.permanent = True  # Make the session permanent
            session['user_id'] = user.id  # Store user ID in the session
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid email or password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route for user logout
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)  # Remove user ID from the session
    return jsonify({'message': 'Logout successful'}), 200

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

# Route to update a user
@app.route('/users/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        data = request.get_json()
        if 'username' in data:
            user.username = data['username']
        if 'email' in data:
            # Validate email format
            email = data['email']
            if not re.match(r'^[\w\.-]+@[\w\.-]+$', email):
                return jsonify({'error': 'Invalid email format'}), 400
            user.email = email

        db.session.commit()
        return jsonify({'message': 'User updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Route to delete a user
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Route to retrieve all scores
@app.route('/scores', methods=['GET'])
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

# Route to retrieve all high scores with associated usernames
@app.route('/highscores', methods=['GET'])
def get_high_scores():
    try:
        # Query the database to join HighScore with User to get username along with score value
        high_scores_with_username = db.session.query(HighScore, User.username).join(User, HighScore.user_id == User.id).all()

        # Format the data as a list of dictionaries containing username and score value
        score_data = [{'username': username, 'score_value': score.score_value} for score, username in high_scores_with_username]

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
    if 'user_id' in session:
        return redirect(url_for('penguin_fish_game'))  # Redirect authenticated users to the game
    else:
        return 'Welcome to HungryPenguin!'

# Route for the game page (PenguinFishGame)
@app.route('/game')
def penguin_fish_game():
    if 'user_id' not in session:
        return redirect(url_for('login'))  # Redirect unauthenticated users to the login page
    else:
        # Render your PenguinFishGame here
        return 'PenguinFishGame'

if __name__ == '__main__':
    app.run(debug=True)
