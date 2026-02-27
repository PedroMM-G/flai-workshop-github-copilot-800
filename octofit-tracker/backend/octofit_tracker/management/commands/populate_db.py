from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        self.stdout.write('Deleting existing data...')
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()

        # Create users (superheroes)
        self.stdout.write('Creating users...')
        users_data = [
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'age': 45, 'team': 'Team Marvel'},
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'age': 22, 'team': 'Team Marvel'},
            {'name': 'Black Widow', 'email': 'blackwidow@marvel.com', 'age': 35, 'team': 'Team Marvel'},
            {'name': 'Thor', 'email': 'thor@marvel.com', 'age': 1500, 'team': 'Team Marvel'},
            {'name': 'Batman', 'email': 'batman@dc.com', 'age': 38, 'team': 'Team DC'},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'age': 800, 'team': 'Team DC'},
            {'name': 'The Flash', 'email': 'flash@dc.com', 'age': 28, 'team': 'Team DC'},
            {'name': 'Superman', 'email': 'superman@dc.com', 'age': 35, 'team': 'Team DC'},
        ]
        users = {}
        for u in users_data:
            user = User.objects.create(**u)
            users[u['name']] = user
            self.stdout.write(f"  Created user: {user.name}")

        # Create teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            members=['Iron Man', 'Spider-Man', 'Black Widow', 'Thor']
        )
        team_dc = Team.objects.create(
            name='Team DC',
            members=['Batman', 'Wonder Woman', 'The Flash', 'Superman']
        )
        self.stdout.write(f"  Created team: {team_marvel.name}")
        self.stdout.write(f"  Created team: {team_dc.name}")

        # Create activities
        self.stdout.write('Creating activities...')
        activities_data = [
            {'user': 'Iron Man', 'activity_type': 'Flying', 'duration': 60.0, 'date': date(2024, 1, 10)},
            {'user': 'Spider-Man', 'activity_type': 'Web Swinging', 'duration': 45.0, 'date': date(2024, 1, 10)},
            {'user': 'Black Widow', 'activity_type': 'Combat Training', 'duration': 90.0, 'date': date(2024, 1, 11)},
            {'user': 'Thor', 'activity_type': 'Hammer Throwing', 'duration': 30.0, 'date': date(2024, 1, 11)},
            {'user': 'Batman', 'activity_type': 'Martial Arts', 'duration': 120.0, 'date': date(2024, 1, 12)},
            {'user': 'Wonder Woman', 'activity_type': 'Sparring', 'duration': 75.0, 'date': date(2024, 1, 12)},
            {'user': 'The Flash', 'activity_type': 'Running', 'duration': 15.0, 'date': date(2024, 1, 13)},
            {'user': 'Superman', 'activity_type': 'Flight Training', 'duration': 50.0, 'date': date(2024, 1, 13)},
        ]
        for a in activities_data:
            activity = Activity.objects.create(**a)
            self.stdout.write(f"  Created activity: {activity.user} - {activity.activity_type}")

        # Create leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        leaderboard_data = [
            {'user': 'Iron Man', 'score': 950},
            {'user': 'Thor', 'score': 980},
            {'user': 'Batman', 'score': 870},
            {'user': 'Superman', 'score': 1000},
            {'user': 'Spider-Man', 'score': 820},
            {'user': 'Wonder Woman', 'score': 930},
            {'user': 'The Flash', 'score': 990},
            {'user': 'Black Widow', 'score': 860},
        ]
        for l in leaderboard_data:
            entry = Leaderboard.objects.create(**l)
            self.stdout.write(f"  Created leaderboard entry: {entry.user} - {entry.score}")

        # Create workouts
        self.stdout.write('Creating workouts...')
        workouts_data = [
            {
                'name': 'Avenger Strength Circuit',
                'description': 'High-intensity strength training inspired by Earth\'s mightiest heroes.',
                'exercises': ['Push-ups x50', 'Pull-ups x20', 'Squats x100', 'Deadlift 200kg x5']
            },
            {
                'name': 'Justice League Cardio Blast',
                'description': 'Extreme cardio workout to match the endurance of DC\'s finest.',
                'exercises': ['Sprint 1km', 'Jump rope 5min', 'Box jumps x30', 'Burpees x40']
            },
            {
                'name': 'Spider Agility Drill',
                'description': 'Agility and flexibility workout based on Spider-Man\'s acrobatics.',
                'exercises': ['Wall crawl 2min', 'Backflips x10', 'Ladder drills x5', 'Tumbling runs x3']
            },
            {
                'name': 'Dark Knight Endurance',
                'description': 'Batman\'s brutal endurance and martial arts conditioning program.',
                'exercises': ['5km run', 'Martial arts combos x100', 'Rope climbing x10', 'Plank 5min']
            },
        ]
        for w in workouts_data:
            workout = Workout.objects.create(**w)
            self.stdout.write(f"  Created workout: {workout.name}")

        self.stdout.write(self.style.SUCCESS('Successfully populated the octofit_db database with test data!'))
