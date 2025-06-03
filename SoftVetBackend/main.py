from fastapi import FastAPI
from .Routers import user_router

tags_metadata = [
    {
        "name": "Users",
        "description": "Operations with users. The **login** logic is also here.",
    },
]

app = FastAPI(
    title="SoftVet API",
    description="API for SoftVet application",
    version="0.1.0",
    openapi_tags=tags_metadata,
)

app.include_router(user_router.router)

@app.get("/", tags=["Root"])
async def read_root():
    """
    Root endpoint that returns a welcome message.
    """
    return {"message": "Welcome to the SoftVet API!"}