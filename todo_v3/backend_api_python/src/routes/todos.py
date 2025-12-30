from src import api
from src.routes._dynamic_resource import DynamicResource
from src.models.Todo.model import Todo
from src.jwt import token_required

class TodoResource(DynamicResource):
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
    resource_class_args=(Todo, [])
)