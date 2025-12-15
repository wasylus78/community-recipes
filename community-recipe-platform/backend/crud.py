from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext
from typing import List
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
def get_password_hash(password):
    return pwd_context.hash(password)
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()
def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password) 
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
def create_recipe(db: Session, recipe: schemas.RecipeCreate, owner_id: int):
    db_recipe = models.Recipe(**recipe.model_dump(), owner_id=owner_id) 
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe
def get_public_recipes(db: Session):
    return db.query(models.Recipe).filter(models.Recipe.visibility == True).all()
def get_recipe_by_id(db: Session, recipe_id: int):
    return db.query(models.Recipe).filter(models.Recipe.id == recipe_id).first()
def delete_recipe(db: Session, recipe: models.Recipe):
    db.delete(recipe)
    db.commit()
def update_recipe(db: Session, recipe_id: int, updated_data: schemas.RecipeCreate):
    db_recipe = get_recipe_by_id(db, recipe_id)
    if not db_recipe: return None
    for key, value in updated_data.model_dump(exclude_unset=True).items():
        setattr(db_recipe, key, value)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe
