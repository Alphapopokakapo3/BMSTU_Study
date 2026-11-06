from flask import Flask

from .routes import webapp_routes, dev_routes

def create_app(debug: bool):
    app = Flask(__name__)
    app.debug = debug
    if app.debug:
        app.register_blueprint(dev_routes)
    app.register_blueprint(webapp_routes)
    return app