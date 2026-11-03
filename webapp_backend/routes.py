from flask import Blueprint, jsonify, render_template, request
from .data_fabric import get_schedule, get_all_homework
from .data_manager import toggle_homework_done
from .auth import generate_mock_init_data

webapp_routes = Blueprint("webapp", __name__)
dev_routes = Blueprint("dev", __name__)

DEV_ID = 1000172856

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
    return jsonify(get_schedule())

@webapp_routes.get("/api/homework/all")
def api_get_all_homework():
    
    return jsonify(get_all_homework(DEV_ID))


@webapp_routes.post("/api/homework/toggle_done/<homework_id>")
def api_toggle_homework_done(homework_id):
    toggle_homework_done(homework_id, DEV_ID)

    return jsonify(get_all_homework(DEV_ID))


@webapp_routes.post("/api/auth/telegram")
def api_auth_by_telegram_init_data():
    authorization = request.headers.get('Authorization', '')

    if authorization.startswith("tma "):
        initData = authorization.split(" ")[1]

        return jsonify(initData);
    return ""


@dev_routes.get("/api/dev/mock-init-data/")
def api_dev_get_mock_init_data():
    return jsonify({"initData": generate_mock_init_data(1000172856)})