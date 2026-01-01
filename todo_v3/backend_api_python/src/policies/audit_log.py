from src.policies.base import ModelPolicy

class AuditLogPolicy(ModelPolicy):
    read_only = True
    allow_patch = False
    allow_delete = False
    order_by = "created_at"
