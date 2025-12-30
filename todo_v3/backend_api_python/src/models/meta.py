import datetime
from sqlalchemy.orm import class_mapper
from sqlalchemy.ext.declarative import DeclarativeMeta
from src.utils import safe_datetime

# Define a custom metaclass
class BaseModelMeta(DeclarativeMeta):
    def __init__(cls, name, bases, dct):
        def as_dict(
            self,
            include_relationships=True,
            include_columns=None,
            exclude_columns=None,
            datetime_format='%b %d, %Y; %I:%M:%S %p',
        ):
            """
            Convert the object to a dictionary with optional field filtering and formatting.

            :param include_relationships: Include related objects if True.
            :param include_columns: List of specific columns to include.
            :param exclude_columns: List of specific columns to exclude.
            :param datetime_format: Format for datetime fields.
            :return: Dictionary representation of the object.
            """
            result = {}
            for c in class_mapper(self.__class__).columns:
                # Skip excluded columns
                if exclude_columns and c.key in exclude_columns:
                    continue
                # Include only specific columns if provided
                if include_columns and c.key not in include_columns:
                    continue

                value = getattr(self, c.key)
                # Apply safe_datetime formatting to datetime fields
                if isinstance(value, datetime.datetime):
                    result[c.key] = safe_datetime(value, format=datetime_format)
                else:
                    result[c.key] = value
            
            # Include computed properties
            for attr_name in dir(self.__class__):
                if exclude_columns and attr_name in exclude_columns:
                    continue
                if include_columns and attr_name not in include_columns:
                    continue

                attr = getattr(self.__class__, attr_name, None)
                if isinstance(attr, property):  # Check if it's a property
                    result[attr_name] = getattr(self, attr_name)

            if include_relationships:
                for rel in class_mapper(self.__class__).relationships:
                    # Skip excluded relationships
                    if exclude_columns and rel.key in exclude_columns:
                        continue
                    # Include only specific relationships if provided
                    if include_columns and rel.key not in include_columns:
                        continue

                    value = getattr(self, rel.key)
                    if value is not None:
                        if isinstance(value, list):
                            result[rel.key] = [
                                v.as_dict(
                                    include_relationships=False,
                                    datetime_format=datetime_format,
                                )
                                for v in value
                            ]
                        else:
                            result[rel.key] = value.as_dict(
                                include_relationships=False,
                                datetime_format=datetime_format,
                            )

            return result

        if "as_dict" not in dct:
            setattr(cls, "as_dict", as_dict)

        super().__init__(name, bases, dct)

