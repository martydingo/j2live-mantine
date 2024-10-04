from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .constants import Jinja2RenderRequest
from .ansible import renderTemplate


class API:
    headers = {"Access-Control-Allow-Origin": "*"}
    def __init__(self) -> None:
        self.API = FastAPI()

        self.API.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        @self.API.get("/")
        async def root():
            return JSONResponse({"message": "Hello World"}, headers={"Access-Control-Allow-Origin": "*"})

        @self.API.post(path="/")
        async def RenderJ2(params: Jinja2RenderRequest):
            yaml = params.YAML
            jinja = params.Jinja
            output, errored = renderTemplate(yaml, jinja)
            if errored == False:
                return JSONResponse({ "error": False, "message": output }, headers={"Access-Control-Allow-Origin": "*"})
            else:
                return JSONResponse({ "error": True, "message": output }, headers={"Access-Control-Allow-Origin": "*"})
