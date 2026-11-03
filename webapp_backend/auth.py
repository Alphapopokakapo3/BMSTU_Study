from studybot.database import Database
from pathlib import Path
import os
import time
import json
import hashlib
import hmac
from urllib.parse import urlencode

token = os.getenv("BOT_TOKEN", "").strip()

def generate_mock_init_data(user_id):
    fields = {
        "auth_date": str(int(time.time())),
        "user": json.dumps(
            {"id": user_id,
             "first_name": "Local",
             "username": "local_test"}, separators=[",", ":"]
        )
    }

    check_string = "\n".join(
        f"{key}={value}" for key, value in sorted(fields.items())
    )
    secret = hmac.new(b"WebAppData", token.encode(), hashlib.sha256).digest()
    fields["hash"] = hmac.new(
        secret, check_string.encode(), hashlib.sha256
    ).hexdigest()

    return urlencode(fields)

def validate_telegram_init_data(init_data: str):
    pass