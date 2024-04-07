from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hungry-penguin.db'
db = SQLAlchemy(app)

# Import models here after initializing SQLAlchemy
from models import User

# Move the db.create_all() call into an application context
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
