from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # Import CORS from flask_cors
import re
from config import Config
from models import User, Score, db  # Import the Score model

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
# Your existing register route here...

# Route for user login
# Your existing login route here...

# Route for the home page
# Your existing home route here...

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

if __name__ == '__main__':
    app.run(debug=True)
