import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent))

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from config import Config
from resources import UsersResource  # Corrected import statement
from flask_migrate import Migrate

# Initialize app and setup database
app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import API resources
from flask_restful import Api
api = Api(app)

# Add resources to API
api.add_resource(UsersResource, '/api/users')  # Adjusted resource class name

# Add route for FishGame component
@app.route('/game')
def game():
    return render_template('game.html')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
