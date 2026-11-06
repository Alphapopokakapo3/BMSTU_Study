from studybot.database import Database
from pathlib import Path
import os
import time
import json
import hashlib
import hmac
from urllib.parse import urlencode, parse_qsl
import uuid

token = os.getenv("BOT_TOKEN", "").strip()
TOKENS_PATH = "./data/access_tokens.json"

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
    parsed = parse_qsl(init_data, keep_blank_values=True)

    print(init_data)

    hash_value = dict(parsed).get("hash")

    user_id = json.loads(dict(parsed).get('user'))['id']
    auth_date = int(dict(parsed)['auth_date'])

    filtered = filter(lambda x: x[0] != "hash", parsed)

    sorted_data = sorted(filtered, key=lambda x: x[0])

    prepared = "\n".join(f"{key}={value}" for key, value in sorted_data)

    secret = hmac.new(b"WebAppData", token.encode(), hashlib.sha256).digest()

    calculated_hash = hmac.new(
        secret, prepared.encode(), hashlib.sha256
    ).hexdigest()

    return calculated_hash == hash_value and int(time.time()) - auth_date < 60*60, user_id


def generate_access_token():
    return str(uuid.uuid4())

def init_tokens_file():
    if not os.path.exists(TOKENS_PATH) or os.path.getsize(TOKENS_PATH) == 0:
        with open(TOKENS_PATH, "w") as file:
            json.dump({}, file)

def get_all_access_tokens():
    with open(TOKENS_PATH, "r") as file:
        data = json.load(file)
        return data

def find_user_by_access_token(data: dict, token: str):
    return

def write_access_tokens(data: dict):
    with open(TOKENS_PATH, "w") as file:
        json.dump(data, file)
        return True
    return False