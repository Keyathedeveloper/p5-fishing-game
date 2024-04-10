import re
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # Import CORS from flask_cors
from config import Config
from models import User

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize SQLAlchemy
db = SQLAlchemy(app)

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

# Route for the home page
@app.route('/')
def home():
    return 'Welcome to HungryPenguin!'

if __name__ == '__main__':
    app.run(debug=True)
