import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent))

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from resources import UsersResource  # Corrected import statement

# Initialize app and setup database
app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)

# Import API resources
from flask_restful import Api
api = Api(app)

# Add resources to API
api.add_resource(UsersResource, '/api/users')  # Adjusted resource class name

# Remove redundant route definitions for '/'
# Route handlers for these URLs are already handled by the API resources

if __name__ == '__main__':
    app.run(port=5555, debug=True)
