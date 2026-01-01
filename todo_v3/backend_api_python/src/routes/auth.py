from src import api, create_session, fernet
from flask_restful import Resource
from src.auth.jwt import create_token, token_required
from src.models.User.model import User
from src.utils import args, log_audit
from src.auth.actor import resolve_actor


login_args = args(["username", "password"])

class Login(Resource):
    def post(self):
        args = login_args.parse_args()
        # print(args)
        session = create_session()
        
        user = session.query(User).filter_by(username = args["username"]).first()
        if not user:
            return {"message":"Wrong username or password"}, 404
        if not user.is_active:
            return {"message": "Inactive User."}, 401
        
        if fernet.decrypt(user.password).decode() != args["password"]:
            return {"message": "Invalid username or password"}, 404

        token = create_token(user.id, user.role, user.name)
        data = {"token":token, "user":user.as_dict(exclude_columns=['password'])}

        log_audit(user.id, user.role, user.name, "Log_in", "Auth", "0")
       
        session.close()
        return data

class Logout(Resource):
    @token_required()
    def post(self):
        actor = resolve_actor()
        log_audit(actor["id"], actor["role"], actor["name"], "Log_out", "Auth", "0")
        return {"message":"Log out is successfull"}

class Verify_Token(Resource):
    @token_required()
    def get(self):
        return {"message":"Token is valid"}

# USED JUST FOR DUMPING -- TO AWAKE THE DB
class Dump(Resource):
    def get(self):
        session = create_session()
        master_branch = session.query(User).filter_by(id = '100000').first()
        if master_branch:
            return {"message":"Dumped Success."}
        return {"message": "Active but not found."}



api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Verify_Token, '/verify-token')
api.add_resource(Dump, '/dump')