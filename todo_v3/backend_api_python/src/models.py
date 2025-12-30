from src import base
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from src.utils import current_date_time


# User Login Table
class User(base):
    __tablename__ = "users"
    id = Column(Integer(), primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    username = Column(String(100), nullable=False, unique=True)
    password = Column(String(200), nullable=False)
    email = Column(String(150), nullable=False, unique=True)
    mob = Column(String(100), nullable=False, unique=True)
    address = Column(String(250), nullable=True)
    role = Column(String(200), nullable=False)
    is_active = Column(Boolean, nullable=False)

    # LOGS
    created_at = Column(DateTime(), nullable=False, default=current_date_time)
    updated_at = Column(DateTime(), nullable=False, default=current_date_time, onupdate=current_date_time)

class Todo(base):
    __tablename__ = "todos"
    id = Column(Integer(), primary_key=True, nullable=False)
    title = Column(String(100), nullable=False)
    desccription = Column(String(500), nullable=True)
    completed = Column(Boolean, nullable=False)

    # LOGS
    user_id = Column(Integer(), ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(), nullable=False, default=current_date_time)
    updated_at = Column(DateTime(), nullable=False, default=current_date_time, onupdate=current_date_time)

    # RELATIONSHIP
    updated_by_relationship = relationship("User", foreign_keys = [user_id])

class AuditLog(base):
    __tablename__ = 'audit_logs'
    id = Column(Integer(), primary_key=True, nullable=False)

    # WHO (immutable identity)
    actor_id = Column(Integer(), ForeignKey("users.id"), nullable=False)

    # WHO (historical snapshot)
    actor_role = Column(String(500), nullable=False)
    actor_name = Column(String(500), nullable=False)

    # CONTEXT OF ACTION
    action = Column(String(500), nullable=False) #create, update, delete, view, login
    entity_type = Column(String(500), nullable=False) #student, attendance, medical_record (Table Name)
    entity_id = Column(String(500), nullable=False) #(Record ID)

    # WHAT CHANGED
    old_data = Column(JSON(), nullable=True)
    new_data = Column(JSON(), nullable=True)

    # REQUEST CONTEXT (forensics)
    ip_address = Column(String(50), nullable=True)
    user_agent = Column(Text(), nullable=True)
    request_id = Column(String(500), nullable=True)

    # SYSTEM CONTEXT
    source = Column(String(50), nullable=True)  #web, mobile, api, system
    status = Column(String(50), nullable=True)  #success, failed
    failure_reason = Column(String(500), nullable=True)

    # TIME (immutable)
    created_at = Column(DateTime(), nullable=False, default=current_date_time)

    # RELATIONSHIP
    updated_by_relationship = relationship("User", foreign_keys = [actor_id])

