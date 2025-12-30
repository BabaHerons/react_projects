import datetime, jwt, base64, io, json
from pytz import timezone
from flask import request
from flask_restful import reqparse
import os
from dotenv import load_dotenv
from sqlalchemy.inspection import inspect


filepath = os.path.join(os.path.abspath(os.path.dirname(__file__)), ".env")
load_dotenv(dotenv_path=filepath)

secret_token_key = os.environ.get('SECRET_TOKEN_KEY')

def current_date_time():
    now = datetime.datetime.now(timezone('Asia/Kolkata'))
    return now

def entries():
    if 'entries' in request.args:
        try:
            number = int(request.args['entries'])
        except:
            return 100
    else:
        number = 100
    return number

def offset():
    if 'offset' in request.args:
        try:
            number = int(request.args['offset'])
        except:
            return 0
    else:
        number = 0
    return number

def args(l:list):
    arguments = reqparse.RequestParser()
    for i in l:
        arguments.add_argument(i, help = f"Please provide {i}", required=False)
    return arguments

def hospital_db():
    data = jwt.decode(request.headers.get('token'), secret_token_key, algorithms=['HS256'])
    return f"HRS_EPSR_{data['hospital_id']}"

def get_user():
    data = jwt.decode(request.headers.get('token'), secret_token_key, algorithms=['HS256'])
    return data["user_id"]

def get_role():
    data = jwt.decode(request.headers.get('token'), secret_token_key, algorithms=['HS256'])
    return data["user_position"]

def current_date_time_to_id():
    now = datetime.datetime.now(timezone('Asia/Kolkata'))
    return now.strftime("%Y%m%d%H%M%S%f")

def get_model_fields(model, exclude_columns=[], for_patch=False):
    """
    Generate a list of tuples with column names and their `nullable` property for an SQLAlchemy model.

    Args:
        model: The SQLAlchemy model class to inspect.
        exclude_columns (list): A list of column names to exclude.

    Returns:
        list: A list of tuples where each tuple contains the column name and whether it's nullable.
    """

    if exclude_columns is None:
        exclude_columns = []

    exclude_columns = set(exclude_columns) | {
        "id",
        "created_at",
        "updated_at",
        "updated_by",
        "updated_at",
    }
    # Use SQLAlchemy's inspection system to get model's columns
    inspector = inspect(model)
    
    fields = []
    for column in inspector.mapper.columns:
        if column.name in exclude_columns:
            continue

        is_required = (
            not column.nullable
            and column.default is None
            and column.server_default is None
        )

        if for_patch:
            is_required = False

        fields.append((column.name, is_required))
    
    return fields

def custom_args(fields: list):
    """
    Create a RequestParser based on a list of tuples.

    :param fields: List of tuples where each tuple is (field_name, is_required).
                   is_required is a boolean indicating if the field is mandatory.
    """
    arguments = reqparse.RequestParser()
    for field_name, _ in fields:
        arguments.add_argument(field_name, required=False)
    return arguments

def validate_arguments(fields: list):
    """
    Validate parsed arguments and return uniform error messages.
    
    :param arguments: RequestParser instance.
    :param fields: List of tuples where each tuple is (field_name, is_required).
    """
    parsed_args = custom_args(fields).parse_args()

    # Iterate through fields to check required fields
    for field_name, is_required in fields:
        if is_required and not parsed_args.get(field_name):
            # Return the first missing required field's message
            return {"message": f"Missing required field: {field_name}"}, 400
    
    # Normalize booleans after validation
    for key, val in parsed_args.items():
        if isinstance(val, str):  # Only normalize string inputs
            if val.lower() in ("true", "1", "yes", "y", "t"):
                parsed_args[key] = True
            elif val.lower() in ("false", "0", "no", "n", "f"):
                parsed_args[key] = False
        elif isinstance(val, (int, bool)):  # Normalize int 0/1 as booleans
            if val in (0, 1):
                parsed_args[key] = bool(val)

    # If validation passes
    return parsed_args, 200

def safe_datetime(value, format='%b %d, %Y; %I:%M:%S %p'):
    """
    Safely format a datetime object or string.
    :param value: The datetime object or string to format.
    :param format: Desired output format.
    :return: Formatted datetime string or None if invalid.
    """
    if value is None:
        return None

    if isinstance(value, datetime.datetime):
        return value.strftime(format)

    try:
        # Attempt to parse string to datetime
        parsed_date = datetime.datetime.strptime(value, format)
        return parsed_date.strftime(format)
    except (ValueError, TypeError):
        return None

def serialize_model(model, datetime_format='%b %d, %Y; %I:%M:%S %p'):
    """
    Dynamically serialize a SQLAlchemy model instance into a dictionary.
    Formats datetime fields using the safe_datetime function.
    :param model: The SQLAlchemy model instance to serialize.
    :param datetime_format: Format to use for datetime fields.
    :return: Serialized dictionary.
    """
    if model is None:
        return None

    serialized_data = {}
    for column in inspect(model).mapper.column_attrs:
        value = getattr(model, column.key)
        if isinstance(value, datetime.datetime):  # Check if the value is a datetime
            serialized_data[column.key] = safe_datetime(value, datetime_format)
        else:
            serialized_data[column.key] = value

    return serialized_data

def serialize_instance(model, visited=None, datetime_format='%b %d, %Y; %I:%M:%S %p', max_depth=10, current_depth=0):
    """
    Serialize a SQLAlchemy model instance with its columns and relationships.
    Avoids circular references and limits recursion depth.
    :param model: SQLAlchemy model instance.
    :param visited: Set to track visited objects and prevent infinite recursion.
    :param datetime_format: Format for datetime fields.
    :param max_depth: Maximum depth of recursion for relationships.
    :param current_depth: Current depth of serialization.
    :return: Serialized dictionary.
    """
    if model is None:
        return None

    if visited is None:
        visited = set()

    # Prevent circular references
    model_id = (model.__class__, id(model))
    if model_id in visited:
        return None
    visited.add(model_id)

    # Prevent exceeding max depth
    if current_depth > max_depth:
        return None

    # Serialize columns
    data = serialize_model(model, datetime_format)

    # Serialize relationships
    # relationships = {}
    # for rel in inspect(model).mapper.relationships:
    #     rel_name = rel.key
    #     rel_value = getattr(model, rel_name)

    #     if rel.uselist:  # If it's a list of related objects
    #         relationships[rel_name] = [
    #             serialize_instance(item, visited, datetime_format, max_depth, current_depth + 1)
    #             for item in rel_value
    #         ]
    #     else:  # If it's a single related object
    #         relationships[rel_name] = serialize_instance(rel_value, visited, datetime_format, max_depth, current_depth + 1)

    # data.update(relationships)
    visited.remove(model_id)  # Remove from visited to allow re-serialization if needed
    return data

