from src import api
from src.routes._dynamic_resource import DynamicResource
from src.models.Todo.model import Todo
from src.auth.jwt import token_required
from src.auth.actor import resolve_actor

class TodoResource(DynamicResource):
    def before_create(self, args):
        args["user_id"] = resolve_actor()["id"]
        return args
    
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
    TodoResource,
    "/todos",
    resource_class_args=(Todo, ["user_id"])
)