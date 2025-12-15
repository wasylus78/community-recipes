from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_ 
from typing import List
from .. import crud, schemas, auth, models
from ..database import get_db
router = APIRouter(tags=["Recipes"])
@router.get("/", response_model=List[schemas.Recipe])
def read_recipes(
    search: str = Query(None, description="Search term for title or ingredients"),
    db: Session = Depends(get_db)
):
    query = db.query(models.Recipe).filter(models.Recipe.visibility == True)
    if search:
        search_filter = or_(
            models.Recipe.title.ilike(f"%{search}%"),
            models.Recipe.ingredients.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)
    return query.all()
@router.post("/", response_model=schemas.Recipe, status_code=status.HTTP_201_CREATED)
def create_recipe_for_current_user(
    recipe: schemas.RecipeCreate, 
    db: Session = Depends(get_db), 
    current_user: schemas.User = Depends(auth.get_current_user)
):
    return crud.create_recipe(db=db, recipe=recipe, owner_id=current_user.id)
@router.put("/{recipe_id}", response_model=schemas.Recipe)
def update_recipe_by_id(
    recipe_id: int, 
    updated_data: schemas.RecipeCreate,
    db: Session = Depends(get_db), 
    current_user: schemas.User = Depends(auth.get_current_user)
):
    recipe = crud.get_recipe_by_id(db, recipe_id)
    if recipe is None: raise HTTPException(status_code=404, detail="Recipe not found")
    if recipe.owner_id != current_user.id: raise HTTPException(status_code=403, detail="Not authorized to edit this recipe")
    return crud.update_recipe(db, recipe_id, updated_data)
@router.delete("/{recipe_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_recipe_by_id(
    recipe_id: int, 
    db: Session = Depends(get_db), 
    current_user: schemas.User = Depends(auth.get_current_user)
):
    recipe = crud.get_recipe_by_id(db, recipe_id=recipe_id)
    if recipe is None: raise HTTPException(status_code=404, detail="Recipe not found")
    if recipe.owner_id != current_user.id: raise HTTPException(status_code=403, detail="Not authorized to delete this recipe")
    crud.delete_recipe(db, recipe=recipe)
    return {"ok": True}
