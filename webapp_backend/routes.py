from flask import Blueprint, jsonify, render_template, request, make_response
# from .data_fabric import get_schedule, get_all_homework, get_user_by_id, get_homework_by_id
from . import data_fabric, auth, data_manager
# from .data_manager import toggle_homework_done
# from .auth import generate_mock_init_data, validate_telegram_init_data, generate_access_token
from . import auth
import time
from functools import wraps


webapp_routes = Blueprint("webapp", __name__)
dev_routes = Blueprint("dev", __name__)

DEV_ID = 1000172856

auth.init_tokens_file()
access_tokens = auth.get_all_access_tokens()

response_codes = {
    200: "ok",
    201: "created",
    400: "bad_request",
    401: "unauthorized",
    403: "forbidden",
    404: "not_found",
    500: "internal_server_error"
}

def generate_response(code: int, message: str = ""):
    return jsonify({
        "error": response_codes[code],
        "message": message
    }), code


def auth_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_cookie = request.cookies.get("auth")
        if auth_cookie:
            item = access_tokens[auth_cookie]
            if access_tokens[auth_cookie]:
                if int(time.time()) - item['date'] < 60*60*24:
                    return f(*args, **kwargs)
                
            return generate_response(401, "Invalid authorization.")
        return generate_response(400, "Authorization required.")
    return wrapper
            
def validate_json_body(*required_fields):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            data = request.get_json()
            if isinstance(data, dict):
                missed = []
                for field in required_fields:
                    if field not in data:
                        missed.append(field)

                if not missed:
                    return func(*args, **kwargs)
                else:
                    return generate_response(400, f"Required: {", ".join(missed)}")
        return wrapper
    return decorator


@webapp_routes.get("/api/health")
def health():
    return jsonify({"status": "ok"})

@webapp_routes.get("/app")
def app():
    return render_template("index.html")

@webapp_routes.get("/sandbox")
def sandbox():
    return render_template("sandbox.html")


@webapp_routes.get("/api/schedule")
def api_schedule():
    try:
        return jsonify(data_fabric.get_schedule())
    except:
        return generate_response(500, "Have no schedule.")


@webapp_routes.get("/api/homework/all")
@auth_required
def api_get_all_homework():
    user_auth = access_tokens[request.cookies.get('auth')]
    
    return jsonify(data_fabric.get_all_homework(user_auth['user_id']))


@webapp_routes.post("/api/homework/toggle_done/<homework_id>")
@auth_required
def api_toggle_homework_done(homework_id):
    user_auth = access_tokens[request.cookies.get("auth")]

    data_manager.toggle_homework_done(homework_id, user_auth['user_id'])

    return jsonify(data_fabric.get_all_homework(user_auth['user_id']))


@webapp_routes.post("/api/auth/telegram")
def api_auth_by_telegram_init_data():
    authorization = request.headers.get('Authorization', '')

    if authorization.startswith("tma "):
        initData = authorization.split(" ")[1]

        validation = auth.validate_telegram_init_data(initData)

        if validation[0]:
            if data_fabric.get_user_by_id(validation[1]):
                res = make_response("Setting a cookie")

                access_token = auth.generate_access_token()
                access_tokens[access_token] = {"user_id": validation[1], "date": int(time.time())}

                auth.write_access_tokens(access_tokens)

                res.set_cookie("auth", access_token, max_age=60*60*24)

                return res
            return generate_response(403, "User not invited")
        return generate_response(401, "Invalid init data")
    return generate_response(400, "Authorization required.")

@dev_routes.get("/api/dev/mock-init-data/")
def api_dev_get_mock_init_data():
    return jsonify({"initData": auth.generate_mock_init_data(1000172856)})

@webapp_routes.get("/api/profile")
def api_get_profile():
    return ""

@webapp_routes.post("/api/homework/add")
def api_add_new_homework():
    return ""

@webapp_routes.get("/api/homework/<int:homework_id>")
@auth_required
def api_get_homework_by_id(homework_id):
    user_auth = access_tokens[request.cookies.get("auth")]

    data = data_fabric.get_homework_by_id(homework_id, user_auth['user_id'])
    if data:
        return jsonify(data)
    else:
        return generate_response(404, "Homework not found")
