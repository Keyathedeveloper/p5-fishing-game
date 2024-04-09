from app import app, db
from models import User

def seed_users():
    try:
        with app.app_context():
            # Create sample users
            user1 = User(username='user1', email='user1@example.com')
            user1.set_password('password1')
            user2 = User(username='user2', email='user2@example.com')
            user2.set_password('password2')

            # Add users to the database
            db.session.add(user1)
            db.session.add(user2)
            db.session.commit()
            print("Sample users seeded successfully.")
    except Exception as e:
        print("Error seeding sample users:", e)
        db.session.rollback()

if __name__ == '__main__':
    seed_users()
