from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Używamy SQLite, domyślnie stworzymy plik 'recipes.db' w katalogu głównym projektu
SQLALCHEMY_DATABASE_URL = "sqlite:///./recipes.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Funkcja, która dostarcza sesję bazy danych dla każdego żądania (Dependency)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
