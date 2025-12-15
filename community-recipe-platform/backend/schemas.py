from pydantic import BaseModel, Field
from typing import Optional
class UserBase(BaseModel):
    username: str
class UserCreate(UserBase):
    password: str = Field(..., min_length=6)
class User(UserBase):
    id: int
    class Config:
        from_attributes = True
class Token(BaseModel):
    access_token: str
    token_type: str
class RecipeBase(BaseModel):
    title: str
    ingredients: str
    instructions: str
    visibility: Optional[bool] = True
class RecipeCreate(RecipeBase):
    pass
class Recipe(RecipeBase):
    id: int
    owner_id: int 
    class Config:
        from_attributes = True
