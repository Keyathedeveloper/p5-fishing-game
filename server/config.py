import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'my-secret-key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_COMPACT = False
    CORS_HEADERS = 'Content-Type'
    CORS_ORIGIN_WHITELIST = ['http://localhost:3000']
