'use client';
import React, { useState, useEffect, useCallback } from 'react';
import RecipeCard from './RecipeCard';
import AddRecipe from './AddRecipe';
import useUserStore from '@/store/userStore';
interface Recipe {
    id: number;
    title: string;
    ingredients: string;
    instructions: string;
    owner_id: number;
}
// POPRAWNY PEŁNY ADRES DLA PRZEPISÓW
const API_URL = 'http://127.0.0.1:8000/api/v1/recipes/'; 
const RecipeList: React.FC = () => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const fetchRecipes = useCallback(async () => {
        setLoading(true);
        let url = API_URL;
        if (searchQuery) {
            url += `?search=${encodeURIComponent(searchQuery)}`;
        }
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data: Recipe[] = await response.json();
                setRecipes(data);
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
        } finally {
            setLoading(false);
        }
    }, [searchQuery]);
    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);
    const handleRecipeAdded = () => {
        fetchRecipes();
    };
    const handleRecipeDelete = (recipeId: number) => {
        setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    };
    if (loading) return <div className="text-center mt-10 text-lg">Ładowanie przepisów...</div>;
    return (
        <div className="w-full">
            <div className="mb-8 flex justify-between items-center w-full max-w-6xl mx-auto">
                <input
                    type="text"
                    placeholder="Wyszukaj przepis po tytule lub składniku..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field max-w-lg"
                />
            </div>
            {isLoggedIn && <AddRecipe onRecipeAdded={handleRecipeAdded} />}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} onDelete={handleRecipeDelete} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-lg text-gray-500">Brak przepisów do wyświetlenia.</p>
                )}
            </div>
        </div>
    );
};
export default RecipeList;
