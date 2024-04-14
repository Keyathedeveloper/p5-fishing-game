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

            # Create sample scores
            score1 = Score(user=user1, score_value=10)
            score2 = Score(user=user2, score_value=20)

            # Add scores to the database
            db.session.add(score1)
            db.session.add(score2)
            db.session.commit()
            print("Sample scores seeded successfully.")

            # Create sample high scores
            high_score1 = HighScore(user=user1, score_value=100)
            high_score2 = HighScore(user=user2, score_value=200)

            # Add high scores to the database
            db.session.add(high_score1)
            db.session.add(high_score2)
            db.session.commit()
            print("Sample high scores seeded successfully.")

    except Exception as e:
        print("Error seeding sample data:", e)
        db.session.rollback()

if __name__ == '__main__':
    seed_users()
