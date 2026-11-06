from studybot.database import Database
from pathlib import Path
import os

database_path = Path(os.getenv("DATABASE_PATH", "data/bot.sqlite3"))
group_uuid = os.getenv("GROUP_UUID", "ab0c54d0-1624-11f1-9d39-005056aae53e")

def toggle_homework_done(homework_id, user_id):
    db = Database(database_path)

    return db.toggle_homework_done(homework_id, user_id)


