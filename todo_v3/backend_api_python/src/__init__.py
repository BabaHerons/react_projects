from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
from sqlalchemy.ext.declarative import declarative_base
from flask_cors import CORS
from dotenv import load_dotenv
from src.models_meta import BaseModelMeta
import os


app = Flask(__name__)
api = Api(app)
CORS(app)

# -------------------FLASK SSE (SERVER SIDE EVENTS)----------------------
# app.register_blueprint(sse, url_prefix="/stream")


filepath = os.path.join(os.path.abspath(os.path.dirname(__file__)), ".env")
load_dotenv(dotenv_path=filepath)

secret_token_key = os.environ.get('SECRET_TOKEN_KEY')

# base = declarative_base(metaclass=BaseModelMeta)

# ------------------- SESSION CREATION ---------------------
# def create_session(db):
#     USERNAME = os.environ.get('user')
#     PASSWORD = os.environ.get('password')
#     SERVER = os.environ.get('server')
#     drivers = [item for item in pyodbc.drivers()]
#     driver = drivers[-1]
#     DB = f"mssql+pyodbc://{USERNAME}:{PASSWORD}@{SERVER}/{db}?driver={driver}"
#     eng = create_engine(DB, poolclass=NullPool)
#     session = sessionmaker(bind=eng)
#     # print(eng.pool.status())
#     return session()

# FOLLOWING CODE IS NEEDED WHEN CREATING TABLES IN DB
# USERNAME = os.environ.get('user')
# PASSWORD = os.environ.get('password')
# SERVER = os.environ.get('server')
# drivers = [item for item in pyodbc.drivers()]
# driver = drivers[-1]
# DB = f"mssql+pyodbc://{USERNAME}:{PASSWORD}@{SERVER}/HRS_EPSR_100000?driver={driver}"
# engine = create_engine(DB)

# FOR CREATING THE TABLES IN THE DB USING PYTHON IN SHELL
# >>> from src import base, engine
# >>> base.metadata.create_all(engine)

# -------------------SECRET KEY-------------------------------
app.config['SECRET_KEY'] = os.environ.get("APP_SECRET_KEY")


from src.routes import auth