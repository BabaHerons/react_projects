from src import app, create_db

if __name__ == "__main__":
    create_db()
    app.run(debug=True, host="0.0.0.0")