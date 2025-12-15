from fastapi import APIRouter
from . import auth, recipes
router = APIRouter(prefix="/api/v1", tags=["API v1"])
router.include_router(auth.router, prefix="/auth")
router.include_router(recipes.router, prefix="/recipes")
