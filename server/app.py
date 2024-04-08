from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hungry-penguin.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)  # Initialize Flask-Migrate

# Route for user registration
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        new_user = User(username=data['username'], email=data['email'])
        new_user.set_password(data['password'])
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
