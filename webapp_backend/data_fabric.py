from studybot.database import Database
from pathlib import Path
import os
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
import json
from sqlite3 import Row

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

def json_homework_from_row(row: Row):
    return dict(row)

def get_all_homework():
    db = Database(database_path)
    homework_data = db.homework_list(1000172856)

    homework = [json_homework_from_row(row) for row in homework_data]

    return homework