from flask import Blueprint, jsonify, render_template
from .data_fabric import get_schedule

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