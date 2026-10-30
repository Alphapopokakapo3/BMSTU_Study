from studybot.database import Database
from pathlib import Path
import os
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
import json

database_path = Path(os.getenv("DATABASE_PATH", "data/bot.sqlite3"))
group_uuid = os.getenv("GROUP_UUID", "ab0c54d0-1624-11f1-9d39-005056aae53e")

MOSCOW = ZoneInfo("Europe/Moscow")




from studybot.schedule import validate_payload

def get_schedule():
    db = Database(database_path)
    cached = db.cache(group_uuid)
    if cached:
        return json.loads(cached["payload"])
    else:
        raise ValueError("Нет подходящего cache")


def get_homework():
    pass