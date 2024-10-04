from pydantic import BaseModel

class Jinja2RenderRequest(BaseModel):
    YAML: str
    Jinja: str