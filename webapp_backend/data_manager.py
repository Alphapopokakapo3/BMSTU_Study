from studybot.database import Database
from pathlib import Path
import os
from zoneinfo import ZoneInfo
from datetime import datetime

database_path = Path(os.getenv("DATABASE_PATH", "data/bot.sqlite3"))
group_uuid = os.getenv("GROUP_UUID", "ab0c54d0-1624-11f1-9d39-005056aae53e")

MOSCOW = ZoneInfo("Europe/Moscow")

def toggle_homework_done(homework_id, user_id):
    db = Database(database_path)

    return db.toggle_homework_done(homework_id, user_id)

def create_new_homework(user_id: int, subject: str,
                        description: str, due_at: int,
                        lesson_type: str, kind: str, due_week: int):
    db = Database(database_path)

    due_at_string = datetime.fromtimestamp(due_at, tz=MOSCOW).isoformat()

    return db.create_homework(
        subject, description, "{}", 
        due_at_string, lesson_type, "", 
        user_id, kind, "", due_week
    )
