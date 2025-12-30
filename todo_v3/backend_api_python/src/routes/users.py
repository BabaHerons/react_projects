from src import api
from src.routes._dynamic_resource import DynamicResource
from src.models.User.model import User
from src.jwt import token_required

class UserResource(DynamicResource):
    @token_required()
    def get(self):
        return super().get()

    @token_required()
    def post(self):
        return super().post()
    
    @token_required()
    def patch(self):
        return super().patch()
    
    @token_required()
    def delete(self):
        return super().delete()

api.add_resource(
    UserResource,
    "/users",
    resource_class_args=(User, [])
)