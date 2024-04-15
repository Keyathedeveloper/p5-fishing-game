from app import app, db
from models import User, Score, HighScore

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

def seed_scores():
    try:
        with app.app_context():
            # Retrieve user objects
            user1 = User.query.filter_by(username='user1').first()
            user2 = User.query.filter_by(username='user2').first()

            # Create sample scores for each user
            score1_user1 = Score(user_id=user1.id, score_value=10)
            score2_user1 = Score(user_id=user1.id, score_value=15)
            score1_user2 = Score(user_id=user2.id, score_value=20)

            # Add scores to the database
            db.session.add_all([score1_user1, score2_user1, score1_user2])
            db.session.commit()
            print("Sample scores seeded successfully.")
    except Exception as e:
        print("Error seeding sample scores:", e)
        db.session.rollback()

def seed_high_scores():
    try:
        with app.app_context():
            # Retrieve user objects
            user1 = User.query.filter_by(username='user1').first()
            user2 = User.query.filter_by(username='user2').first()

            # Create sample high scores for each user
            high_score1_user1 = HighScore(user_id=user1.id, score_value=25)
            high_score1_user2 = HighScore(user_id=user2.id, score_value=30)

            # Add high scores to the database
            db.session.add_all([high_score1_user1, high_score1_user2])
            db.session.commit()
            print("Sample high scores seeded successfully.")
    except Exception as e:
        print("Error seeding sample high scores:", e)
        db.session.rollback()

if __name__ == '__main__':
    seed_users()
    seed_scores()
    seed_high_scores()
