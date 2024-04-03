#!/usr/bin/env python3

# Standard library imports
import os

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Game, Score

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Create some users
        for _ in range(10):
            user = User(
                username=fake.user_name(),
                password=fake.password(length=12)
            )
            db.session.add(user)

        # Create some games
        for _ in range(5):
            game = Game(
                name=fake.word(),
                created_at=fake.date_time_between(start_date="-30d", end_date="now")
            )
            db.session.add(game)

        # Create some scores
        for _ in range(20):
            score = Score(
                user_id=fake.random_int(min=1, max=10),
                game_id=fake.random_int(min=1, max=5),
                score=fake.random_int(min=0, max=100),
                created_at=fake.date_time_between(start_date="-30d", end_date="now")
            )
            db.session.add(score)

        # Commit all changes to the database
        db.session.commit()

        print("Seed completed successfully.")
