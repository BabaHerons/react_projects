from src import api, fernet
from src.routes._dynamic_resource import DynamicResource
from src.models.User.model import User
from src.auth.jwt import token_required
from flask import g

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
    
    @token_required()
    def get(self):
        return super().get()

    # FOR USER REGISTERATION
    def post(self):
        g.audit_anonymous = True
        response = super().post()
        g.audit_anonymous = False
        return response
    
    @token_required()
    def patch(self):
        return super().patch()
    
    @token_required(["admin"])
    def delete(self):
        return super().delete()

api.add_resource(
    UserResource,
    "/users",
    resource_class_args=(User, [])
)