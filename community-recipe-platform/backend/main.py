from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database import engine, Base
from backend.routes.router import router

Base.metadata.create_all(bind=engine)
print("Database tables created/checked.")

app = FastAPI(title="Community Recipes API")

# --- KONFIGURACJA CORS ---
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"], # Jawnie dodajemy OPTIONS!
    allow_headers=["*"],
)
# --- KONIEC KONFIGURACJI CORS ---

app.include_router(router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Community Recipes API"}
