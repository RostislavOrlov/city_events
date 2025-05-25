# app.py

from flask import Flask
from flask_jwt_extended import JWTManager
from config import Config
from models import db, bcrypt
from routes import auth_bp, events_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)

@app.before_first_request
def create_tables():
    db.create_all()

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(events_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)