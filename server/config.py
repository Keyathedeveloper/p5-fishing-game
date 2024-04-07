import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or 'sqlite:///hungry-penguin.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
