#!/usr/bin/env python3

# Standard library imports
import os

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        # Create some users
        for _ in range(10):
            user = User(
                username=fake.user_name(),
                password=fake.password(length=12)
            )
            db.session.add(user)
            db.session.commit()

        # Create some games
        for _ in range(5):
            game = Game(
                name=fake.word(),
                created_at=fake.date_time_between(start_date="-30d", end_date="now")
            )
            db.session.add(game)
            db.session.commit()

        # Create some scores
        for _ in range(20):
            score = Score(
                user_id=rc(1, 10),
                game_id=rc(1, 5),
                score=rc(0, 100),
                created_at=fake.date_time_between(start_date="-30d", end_date="now")
            )
            db.session.add(score)
            db.session.commit()
