from src.models import base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from src.utils import current_date_time
from src.policies.audit_log import AuditLogPolicy

class AuditLog(base):
    __tablename__ = 'audit_logs'
    __policy__ = AuditLogPolicy

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
