from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
from flask_cors import CORS
from dotenv import load_dotenv
import os
from cryptography.fernet import Fernet


app = Flask(__name__)
api = Api(app)
CORS(app)

filepath = os.path.join(os.path.abspath(os.path.dirname(__file__)), ".env")
load_dotenv(dotenv_path=filepath)

SECRET_TOKEN_KEY = os.environ.get('SECRET_TOKEN_KEY')

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "database.db")

# FOR GENERATING THE FERNET_KEY USING PYTHON IN SHELL
# >>> from cryptography.fernet import Fernet
# >>> key = Fernet.generate_key()

# -------------------FOR PASSWORD ENCRYPTION--------------
FERNET_KEY = bytes(os.environ.get('FERNET_KEY'), "utf-8")
fernet = Fernet(FERNET_KEY)

# ------------------- SESSION CREATION ---------------------
def create_session(engine:bool = False):
    DB = f"sqlite:///{DB_PATH}"
    if engine:
        engine = create_engine(DB)
        return engine()
    eng = create_engine(DB, poolclass=NullPool)
    session = sessionmaker(bind=eng)
    return session()

# FOR CREATING THE TABLES IN THE DB USING PYTHON IN SHELL
def create_db():
    from src.models import base
    from src.models.auditLogs import AuditLog
    from src.models.Todo.model import Todo
    from src.models.User.model import User

    DB = f"sqlite:///{DB_PATH}"
    engine = create_engine(DB)

    print("Creating DB\n")
    base.metadata.create_all(engine)
    print("DB creation Success.\n")

    session = create_session()
    user = session.query(User).filter_by(username=os.environ.get("DEFAULT_ADMIN_USERNAME")).first()
    if not user:
        print("Creating default admin user.\n")
        encrypted_password = fernet.encrypt(os.environ.get("DEFAULT_ADMIN_PASSWORD").encode())
        user = User(
            name="System Administrator",
            username=os.environ.get("DEFAULT_ADMIN_USERNAME"),
            email=os.environ.get("DEFAULT_ADMIN_EMAIL"),
            password=encrypted_password,
            mob="0000000000",
            address="System",
            role="admin",
            is_active=True,
        )

        session.add(user)
        session.commit()
        print("Default Admin creation successfull.\n") 
    else:
        print("Admin already exists.\n") 
    session.close()

# -------------------SECRET KEY-------------------------------
app.config['SECRET_KEY'] = os.environ.get("APP_SECRET_KEY")


from src.routes import auth, users, todos