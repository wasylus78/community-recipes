from fastapi import FastAPI
from backend.routes.router import router
from backend.database import Base, engine
from backend import models 
app = FastAPI(title="Community Recipe Platform MVP")
def create_db_and_tables():
    Base.metadata.create_all(bind=engine)
    print("Database tables created/checked.")
create_db_and_tables()
app.include_router(router)
@app.get("/")
def read_root():
    return {"message": "Welcome to the Recipe Platform API. See /docs for endpoints."}
