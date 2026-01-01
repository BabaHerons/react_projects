from src import api
from src.routes._dynamic_resource import DynamicResource
from src.models.auditLogs import AuditLog
from src.auth.jwt import token_required

class AuditLogResource(DynamicResource):
    @token_required(['admin'])
    def get(self):
        return super().get()

api.add_resource(
    AuditLogResource,
    "/logs",
    resource_class_args=(AuditLog, [])
)