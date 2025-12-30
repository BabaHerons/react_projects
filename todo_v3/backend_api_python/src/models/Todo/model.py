from src.models import base
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from src.utils import current_date_time


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