from fastapi import APIRouter
from . import auth, recipes

router = APIRouter()

# Upewniamy się, że prefiksy są poprawne
router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
router.include_router(recipes.router, prefix="/recipes", tags=["Recipes"])
