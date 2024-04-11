from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    """
    A user of the application.
    """
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password: str):
        """
        Set the password for the user.

        :param password: The plain-text password to set.
        """
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        """
        Check if the provided password matches the user's password hash.

        :param password: The plain-text password to check.
        :return: `True` if the password is correct, `False` otherwise.
        """
        return check_password_hash(self.password_hash, password)

    def verify_password(self, password: str) -> bool:
        """
        Verify if the provided password is correct.

        :param password: The plain-text password to verify.
        :return: `True` if the password is correct, `False` otherwise.
        """
        return self.check_password(password)

    def __repr__(self):
        return f"User(id={self.id}, username={self.username}, email={self.email})"

class Score(db.Model):
    """
    Model to track user scores.
    """
    __tablename__ = 'scores'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref='scores')
    score_value = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Score(id={self.id}, user_id={self.user_id}, score={self.score_value})"

class HighScore(db.Model):
    """
    Model to track the high score.
    """
    __tablename__ = 'high_scores'

    id = db.Column(db.Integer, primary_key=True)
    score_value = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref='high_scores')

    def __repr__(self):
        return f"HighScore(id={self.id}, user_id={self.user_id}, score={self.score_value})"

class PowerUp(db.Model):
    """
    Model to manage power-ups in the game.
    """
    __tablename__ = 'power_ups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    effect = db.Column(db.String(255), nullable=False)
    duration = db.Column(db.Integer, nullable=True)  # Duration in seconds, nullable for permanent power-ups

    def __repr__(self):
        return f"PowerUp(id={self.id}, name={self.name}, effect={self.effect}, duration={self.duration})"
