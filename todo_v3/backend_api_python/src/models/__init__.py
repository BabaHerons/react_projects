from sqlalchemy.ext.declarative import declarative_base
from src.models.meta import BaseModelMeta

base = declarative_base(metaclass=BaseModelMeta)