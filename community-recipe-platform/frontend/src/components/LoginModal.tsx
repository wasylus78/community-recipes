'use client';
import useUserStore from '@/store/userStore';
import React, { useState } from 'react';
interface LoginModalProps {
    onClose: () => void;
}
// POPRAWIONY BAZOWY URL Z DODANYM PREFIXEM /api/v1/auth
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1/auth';
const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
    const login = useUserStore((state) => state.login);
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const endpoint = isRegistering ? `${API_BASE_URL}/register` : `${API_BASE_URL}/token`;
        const method = isRegistering ? 'POST' : 'POST';
        const body = isRegistering 
            ? JSON.stringify({ username, password })
            : new URLSearchParams({ username, password }).toString();
        const headers = isRegistering 
            ? { 'Content-Type': 'application/json' }
            : { 'Content-Type': 'application/x-www-form-urlencoded' };
        try {
            const response = await fetch(endpoint, { method, headers, body });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.detail || 'Wystąpił nieznany błąd podczas autoryzacji.');
                return;
            }
            if (isRegistering) {
                // Po rejestracji automatycznie próbujemy się zalogować
                await handleLoginAfterRegistration(username, password);
            } else {
                const data = await response.json();
                login(data.access_token, username);
                onClose();
            }
        } catch (err) {
            setError('Błąd połączenia z serwerem API.');
        }
    };
    const handleLoginAfterRegistration = async (username: string, password_data: string) => {
        const loginEndpoint = `${API_BASE_URL}/token`;
        const loginBody = new URLSearchParams({ username, password: password_data }).toString();
        const loginHeaders = { 'Content-Type': 'application/x-www-form-urlencoded' };
        
        const response = await fetch(loginEndpoint, { method: 'POST', headers: loginHeaders, body: loginBody });
        if (response.ok) {
            const data = await response.json();
            login(data.access_token, username);
            onClose();
        } else {
            setError('Rejestracja udana, ale automatyczne logowanie nie powiodło się.');
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white p-6 rounded-lg shadow-xl w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4">{isRegistering ? 'Rejestracja' : 'Logowanie'}</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa użytkownika</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hasło</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        {isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <button onClick={() => setIsRegistering(!isRegistering)} className="text-blue-600 hover:underline">
                        {isRegistering ? 'Mam już konto. Przejdź do logowania.' : 'Nie masz konta? Zarejestruj się.'}
                    </button>
                </div>
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl">
                    &times;
                </button>
            </div>
        </div>
    );
};
export default LoginModal;
