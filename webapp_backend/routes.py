from flask import Blueprint, jsonify, render_template
from .data_fabric import get_schedule, get_all_homework
from .data_manager import toggle_homework_done

webapp_routes = Blueprint("webapp", __name__)


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
    
    return jsonify(get_all_homework())


@webapp_routes.post("/api/homework/toggle_done")
def api_toggle_homework_done():
    return toggle_homework_done()