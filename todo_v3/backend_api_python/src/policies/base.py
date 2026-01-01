class ModelPolicy:
    read_only: bool = False
    allow_patch: bool = True
    allow_delete: bool = True
    order_by: str | None = "updated_at"
