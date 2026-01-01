from flask import request
from src.auth.jwt import decode_token

def resolve_actor(anonymous:bool = False):
    # Token explicitly ignored
    if anonymous:
        return {
            "id": 0,
            "role": "anonymous",
            "name": "anonymous"
        }

    data = decode_token(request.headers.get("token"))

    return {
        "id": data["user_id"],
        "role": data["role"],
        "name": data["name"]
    }
