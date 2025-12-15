import useUserStore from '@/store/userStore';
import React from 'react';
interface Recipe {
    id: number;
    title: string;
    ingredients: string;
    instructions: string;
    owner_id: number;
}
interface RecipeCardProps {
    recipe: Recipe;
    onDelete: (recipeId: number) => void;
}
const API_URL = 'http://127.0.0.1:8000/api/v1/recipes/';
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onDelete }) => {
    const { token, id: currentUserId } = useUserStore((state) => ({ token: state.token, id: state.id }));
    const isOwner = currentUserId === recipe.owner_id;
    const handleDelete = async () => {
        if (!confirm('Czy na pewno chcesz usunąć ten przepis?')) return;
        try {
            const response = await fetch(`${API_URL}${recipe.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                onDelete(recipe.id);
            } else {
                alert('Nie udało się usunąć przepisu. Sprawdź, czy jesteś jego właścicielem.');
            }
        } catch (error) {
            alert('Błąd połączenia z serwerem API.');
        }
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col">
            <h3 className="text-2xl font-semibold text-blue-800 mb-2">{recipe.title}</h3>
            <div className="mb-4 flex-grow">
                <p className="font-medium text-gray-700 mb-1">Składniki:</p>
                <p className="text-gray-600 whitespace-pre-line">{recipe.ingredients}</p>
                <p className="font-medium text-gray-700 mt-3 mb-1">Instrukcje:</p>
                <p className="text-gray-600 whitespace-pre-line">{recipe.instructions}</p>
            </div>
            {isOwner && (
                <button onClick={handleDelete} className="btn btn-danger mt-4 self-start">
                    Usuń Przepis
                </button>
            )}
        </div>
    );
};
export default RecipeCard;
