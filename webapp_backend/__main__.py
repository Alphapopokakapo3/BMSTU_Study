from . import create_app

debug = True

if __name__ == "__main__":
    app = create_app(debug)
    app.run(host="127.0.0.1", port=5000, debug=debug)