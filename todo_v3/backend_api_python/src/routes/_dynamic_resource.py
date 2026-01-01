from flask_restful import Resource
from flask import request
from sqlalchemy import desc
from src import create_session
from src.auth.jwt import token_required
from src.utils import (
    validate_arguments,
    # current_date_time,
    entries,
    offset,
    get_model_fields,
    log_audit
)
import datetime
from src.policies.base import ModelPolicy
from src.auth.actor import resolve_actor
from flask import g


class DynamicResource(Resource):
    def __init__(self, model, filter_keys=None):
        """
        Initialize the dynamic resource.

        :param model: SQLAlchemy model class.
        :param filter_keys: List of keys to use for dynamic filtering (e.g., ['student_id', 'staff_id']).
        """
        self.model = model
        self.filter_keys = filter_keys if filter_keys else []

    # MODEL'S POLICY
    def get_model_policy(self, model):
        return getattr(model, "__policy__", ModelPolicy)

    # 🔹 HOOK: runs before create
    def before_create(self, args: dict) -> dict:
        return args
    
    # 🔹 HOOK: runs after create
    def after_create(self, record, session):
        pass

    # 🔹 HOOK: runs before update
    def before_update(self, args: dict) -> dict:
        return args

    # 🔹 HOOK: runs after update
    def after_update(self, record, old_data, session):
        pass

    # 🔹 HOOK: runs after delete
    def after_delete(self, record, session):
        pass

    def get_actor(self):
        use_anonymous = getattr(g, "audit_anonymous", False)
        return resolve_actor(anonymous=use_anonymous)

    # @token_required()
    def get(self):
        """
        Handle dynamic GET requests with optional filtering by ID or dynamic keys.
        """
        try:
            session = create_session()

            # Filter by ID if provided
            if "id" in request.args:
                record_id = request.args.get("id")
                record = session.query(self.model).filter_by(id=record_id).first()
                if record:
                    return record.as_dict(exclude_columns=['updated_by_relationship']), 200
                return {"message": "Something went wrong", "error": f"Record not found with id {record_id}"}, 404

            # Filter by "updated_after' if provided
            if "updated_after" in request.args:
                if not hasattr(self.model, "updated_at"):
                    return {"message": "updated_after not supported for this resource"}, 400
                updated_after = request.args.get("updated_after")
                updated_after = datetime.datetime.strptime(updated_after, '%d/%m/%Y, %H:%M:%S')
                records = session.query(self.model).filter(self.model.updated_at > updated_after).all()
                result = [record.as_dict(exclude_columns=['updated_by_relationship']) for record in records]
                if result:
                    return result
                return [], 200
            
            # Handle args=all for specific columns
            if "args" in request.args and request.args.get("args") == "all":
                requested_columns = request.args.get("columns", "").split(",")
                if not requested_columns or requested_columns == [""]:
                    return {"message": "Please specify columns in the query parameters."}, 400

                actor = self.get_actor()
                if actor["role"] == "super_admin":
                    requested_columns += ["updated_by", "updated_at"]
                else:
                    super_admin_list = ["updated_by", "updated_at"]
                    for i in super_admin_list:
                        if i in requested_columns:
                            requested_columns.remove(i)

                records = session.query(self.model).all()
                if not records:
                    return {"message": "Something went wrong", "error": "No records found."}, 404
                result = [
                    record.as_dict(include_columns=requested_columns)
                    for record in records
                ]
                return result, 200

            # Filter by all matching dynamic key in the request arguments
            if "args" in request.args and request.args.get("args") == "filter":
                # Get all filter parameters (exclude 'args')
                filter_params = {k: v for k, v in request.args.items() 
                                if k not in ['args']}
                
                if not filter_params:
                    return {"message": "Please specify filter parameters in the query."}, 400
                    
                # Build the query with all filter conditions
                query = session.query(self.model)
                for key, value in filter_params.items():
                    # Only filter by columns that exist in the model
                    if hasattr(self.model, key):
                        query = query.filter(getattr(self.model, key) == value)
                    else:
                        return {"message": "Invalid filter parameter", 
                            "error": f"Column '{key}' does not exist"}, 400
                        
                records = query.all()
                if not records:
                    return {"message": "No records found matching the filter criteria"}, 404
                    
                return [record.as_dict(exclude_columns=['updated_by_relationship']) 
                        for record in records], 200

            # Filter by the first matching dynamic key in the request arguments
            for key in self.filter_keys:
                if key in request.args:
                    filter_value = request.args.get(key)
                    records = session.query(self.model).filter_by(**{key: filter_value}).all()
                    if records:
                        return [record.as_dict(exclude_columns=['updated_by_relationship']) for record in records], 200
                    else:
                        return {"message": "Something went wrong", "error": f"No records found for {key.replace('_', ' ').title()}"}, 404

            # Fetch all records with pagination if no specific filter is provided
            n = entries()
            k = offset()

            policy = self.get_model_policy(self.model)

            order_field = policy.order_by

            if order_field and hasattr(self.model, order_field):
                query = session.query(self.model).order_by(
                    desc(getattr(self.model, order_field))
                )
            else:
                query = session.query(self.model).order_by(desc(self.model.id))

            records = query.limit(n).offset(k).all()
            # print("============================================")
            # print("Query Start\n")
            # print([record.as_dict(exclude_columns=['updated_by_relationship', 'password']) for record in records])
            # print("\nQuery End")
            # print("============================================\n")
            return [record.as_dict(exclude_columns=['updated_by_relationship', 'password']) for record in records], 200

        except Exception as e:
            return {"message": "Something went wrong", "error": str(e)}, 500
        finally:
            session.close()

    # @token_required()
    def post(self):
        """
        Handle dynamic POST requests for creating new records.
        """

        # CHECKING THE MODEL'S POLICY
        policy = self.get_model_policy(self.model)
        if policy.read_only:
            return {"message": "Creation not allowed for this resource"}, 403

        args, status_code = validate_arguments(get_model_fields(self.model))
        if status_code == 400:
            return args, 400

        session = create_session()

        # 🔹 before hook
        args = self.before_create(args)

        try:
            if self.model.__name__ != "EventLogs":
                existing_record = session.query(self.model).filter_by(**args).first()
                if existing_record:
                    return {"message": "Record already exists."}, 422

            record = self.model(**args)
            session.add(record)
            session.commit()

            result = record.as_dict(exclude_columns=['updated_by_relationship', 'password'])

            # Logs
            actor = self.get_actor()
            log_audit(actor["id"], actor["role"], actor["name"], "POST", self.model.__name__, result['id'], new_data=result)
            
            # 🔹 after hook
            self.after_create(record, session)

            return {"message": "Record added successfully", "record": result}, 201
        except Exception as e:
            return {"message": "Something went wrong", "error": str(e)}, 500
        finally:
            session.close()

    # @token_required()
    def patch(self):
        """
        Handle dynamic PATCH requests for updating existing records.
        """

        # CHECKING THE MODEL'S POLICY
        policy = self.get_model_policy(self.model)
        if not policy.allow_patch:
            return {"message": "Update not allowed for this resource"}, 403

        if "id" not in request.args:
            return {"message": "Please provide id"}, 404

        record_id = request.args["id"]
        args, status_code = validate_arguments(get_model_fields(self.model, for_patch=True))
        if status_code == 400:
            return args, 400

        # 🔹 before hook
        args = self.before_update(args)

        try:
            session = create_session()
            record = session.query(self.model).filter_by(id=record_id).first()

            if not record:
                return {"message": "Record not found"}, 404

            old_data = record.as_dict(exclude_columns=['updated_by_relationship'])
            for key, value in args.items():
                if value is not None:
                    setattr(record, key, value)

            session.add(record)
            session.commit()

            updated_record = record.as_dict(exclude_columns=['updated_by_relationship'])

            # Logs
            actor = self.get_actor()
            log_audit(actor["id"], actor["role"], actor["name"], "PATCH", self.model.__name__, record.id, old_data, updated_record)

            # 🔹 after hook
            self.after_update(record, old_data, session)

            return {"message": "Record updated successfully", "reocrd": updated_record}
        except Exception as e:
            return {"message": "Something went wrong", "error": str(e)}, 500
        finally:
            session.close()

    # @token_required()
    def delete(self):
        """
        Handle dynamic DELETE requests for deleting records by ID.
        """

        # CHECKING THE MODEL'S POLICY
        policy = self.get_model_policy(self.model)
        if not policy.allow_delete:
            return {"message": "Delete not allowed for this resource"}, 403
        
        if "id" not in request.args:
            return {"message": "Please provide id"}, 404

        record_id = request.args["id"]
        try:
            session = create_session()
            record = session.query(self.model).filter_by(id=record_id).first()

            if not record:
                return {"message": "Record not found"}, 404
            
            old_data = record.as_dict(exclude_columns=['updated_by_relationship'])

            session.delete(record)
            session.commit()

            # Logs
            actor = self.get_actor()
            log_audit(actor["id"], actor["role"], actor["name"], "DELETE", self.model.__name__, old_data['id'], old_data)

            # 🔹 after hook
            self.after_delete(record, session)

            return {"message": "Record deleted successfully"}
        except Exception as e:
            return {"message": "Something went wrong", "error": str(e)}, 500
        finally:
            session.close()
