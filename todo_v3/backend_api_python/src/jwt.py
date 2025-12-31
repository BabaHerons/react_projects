import jwt, os
from pytz import timezone
from functools import wraps
from datetime import datetime, timedelta
from flask import request
from src import create_session, SECRET_TOKEN_KEY
from src.models.User.model import User


def token_required(allowed_roles:list=None):
    def wrapper(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            # print(request.headers)
            if 'token' in request.headers:
                token = request.headers['token']
            else:
                return {"message":"Not Authorised."}, 401
            
            try:
                data = jwt.decode(token, SECRET_TOKEN_KEY, algorithms=['HS256'])
                role = data["role"]
                
                if (allowed_roles != None) and (role not in allowed_roles):
                    return {"message": "Not allowed."}, 403

                session = create_session()
                try:
                    user = session.query(User).filter_by(id = data['user_id']).first()
                    if not user.is_active:
                        return {"message": "Inactive User"}, 401
                finally:
                    session.close()
            except:
                return {"message":"Invalid TOKEN"}, 401
            return f(*args, **kwargs)
        return decorated
    return wrapper


def create_token(user_id, role):
    token = jwt.encode({
            "user_id": user_id,
            "role":role,
            "exp": datetime.now(timezone('Asia/Kolkata')) + timedelta(days=2)
        }, SECRET_TOKEN_KEY)
    return token