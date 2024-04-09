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
