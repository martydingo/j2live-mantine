from .api import API
from uvicorn import Server, Config
from argparse import ArgumentParser
import asyncio, subprocess

argParser = ArgumentParser()
argParser.add_argument("-e", "--environment", default="production")
args = argParser.parse_args()

j2live_api = API()


async def main():
    async with asyncio.TaskGroup() as taskGroup:
        taskGroup.create_task(run_frontend())
        taskGroup.create_task(run_backend())


async def run_frontend():
    if args.environment == "production":
        subprocess.Popen(["node", ".next/standalone/server.js"])
    elif args.environment == "development":
        subprocess.Popen(["bun", "dev"])


async def run_backend():
    config = Config(app=j2live_api.API)
    server = Server(config=config)
    await server.serve()


asyncio.run(main())
