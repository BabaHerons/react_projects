from src.models import base
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from src.utils import current_date_time
import enum

class UserRole(enum.Enum):
    admin = "admin"
    user = "user"

class User(base):
    __tablename__ = "users"
    id = Column(Integer(), primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    username = Column(String(100), nullable=False, unique=True)
    password = Column(String(200), nullable=False)
    email = Column(String(150), nullable=False, unique=True)
    mob = Column(String(100), nullable=False, unique=True)
    address = Column(String(250), nullable=True)
    role = Column(String(200), nullable=False, default='user')
    is_active = Column(Boolean, nullable=False, default=True)

    # LOGS
    created_at = Column(DateTime(), nullable=False, default=current_date_time)
    updated_at = Column(DateTime(), nullable=False, default=current_date_time, onupdate=current_date_time)