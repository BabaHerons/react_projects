from flask_restful import Resource
from flask import request
from sqlalchemy import desc
from src import create_session
from src.jwt import token_required
from src.utils import (
    validate_arguments,
    # current_date_time,
    get_user,
    entries,
    offset,
    get_model_fields,
    get_role,
)
import datetime


class DynamicResource(Resource):
    def __init__(self, model, filter_keys=None):
        """
        Initialize the dynamic resource.

        :param model: SQLAlchemy model class.
        :param filter_keys: List of keys to use for dynamic filtering (e.g., ['student_id', 'staff_id']).
        """
        self.model = model
        self.filter_keys = filter_keys if filter_keys else []

    @token_required()
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

                if get_role() == "super_admin":
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
            records = session.query(self.model).order_by(desc(self.model.updated_at)).limit(n).offset(k).all()
            return [record.as_dict(exclude_columns=['updated_by_relationship']) for record in records], 200

        except Exception as e:
            return {"message": "Something went wrong", "error": str(e)}, 500
        finally:
            session.close()

    @token_required()
    def post(self):
        """
        Handle dynamic POST requests for creating new records.
        """
        args, status_code = validate_arguments(get_model_fields(self.model))
        if status_code == 400:
            return args, 400

        session = create_session()

        try:
            if self.model.__name__ != "EventLogs":
                existing_record = session.query(self.model).filter_by(**args).first()
                if existing_record:
                    return {"message": "Record already exists."}, 422
            
            # args["updated_at"] = current_date_time()
            args["updated_by"] = get_user()

            record = self.model(**args)
            session.add(record)
            session.commit()

            result = record.as_dict(exclude_columns=['updated_by_relationship'])
            return {"message": "Record added successfully", "record": result}
        except Exception as e:
            return {"message": "Something went wrong", "error": str(e)}, 500
        finally:
            session.close()

    @token_required()
    def patch(self):
        """
        Handle dynamic PATCH requests for updating existing records.
        """
        if "id" not in request.args:
            return {"message": "Please provide id"}, 404

        record_id = request.args["id"]
        args, status_code = validate_arguments(get_model_fields(self.model))
        if status_code == 400:
            return args, 400

        # args["updated_at"] = current_date_time()
        args["updated_by"] = get_user()

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

            return {"message": "Record updated successfully"}
        except Exception as e:
            return {"message": "Something went wrong", "error": str(e)}, 500
        finally:
            session.close()

    @token_required()
    def delete(self):
        """
        Handle dynamic DELETE requests for deleting records by ID.
        """
        if "id" not in request.args:
            return {"message": "Please provide id"}, 404

        record_id = request.args["id"]
        try:
            session = create_session()
            record = session.query(self.model).filter_by(id=record_id).first()

            if not record:
                return {"message": "Record not found"}, 404

            session.delete(record)
            session.commit()

            return {"message": "Record deleted successfully"}
        except Exception as e:
            return {"message": "Something went wrong", "error": str(e)}, 500
        finally:
            session.close()
