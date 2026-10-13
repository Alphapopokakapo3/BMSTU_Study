from flask import Flask

from .routes import webapp_routes


def create_app():
    app = Flask(__name__)
    app.register_blueprint(webapp_routes)
    return app