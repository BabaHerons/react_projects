from src import api, fernet
from src.routes._dynamic_resource import DynamicResource
from src.models.User.model import User
from src.jwt import token_required

class UserResource(DynamicResource):
    def before_create(self, args):
        encrypted_password = fernet.encrypt(args["password"].encode())
        args["password"] = encrypted_password
        return args

    def before_update(self, args):
        if 'password' in args:
            encrypted_password = fernet.encrypt(args["password"].encode())
            args["password"] = encrypted_password
        return args
    
    @token_required(["super_admin"])
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