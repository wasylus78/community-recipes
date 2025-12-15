'use client';
import useUserStore from '@/store/userStore';
import React, { useState } from 'react';
interface AddRecipeProps {
    onRecipeAdded: () => void;
}
const API_URL = 'http://127.0.0.1:8000/api/v1/recipes/';
const AddRecipe: React.FC<AddRecipeProps> = ({ onRecipeAdded }) => {
    const token = useUserStore((state) => state.token);
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, ingredients, instructions, visibility: true }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.detail || 'Nie udało się dodać przepisu.');
                return;
            }
            // Sukces
            setSuccess('Przepis dodany pomyślnie!');
            setTitle('');
            setIngredients('');
            setInstructions('');
            onRecipeAdded(); // Odśwież listę przepisów
        } catch (err) {
            setError('Błąd połączenia z serwerem API.');
        }
    };
    return (
        <div className="mt-8 p-6 border rounded-lg shadow-lg bg-white w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-4">Dodaj Nowy Przepis</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tytuł</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Składniki (oddzielone przecinkami lub liniami)</label>
                    <textarea
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        className="input-field h-24"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instrukcje</label>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="input-field h-32"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    Zapisz Przepis
                </button>
            </form>
        </div>
    );
};
export default AddRecipe;
