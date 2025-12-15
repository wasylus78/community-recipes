'use client';
import useUserStore from '@/store/userStore';
import React, { useState } from 'react';
import LoginModal from './LoginModal';
const Header: React.FC = () => {
    const { isLoggedIn, username, logout } = useUserStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleLogout = () => {
        logout();
    };
    return (
        <header className="bg-gray-800 p-4 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Recipe Platform</h1>
                <nav>
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-300">Witaj, {username}!</span>
                            <button onClick={handleLogout} className="btn bg-red-600 hover:bg-red-700">
                                Wyloguj
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                            Zaloguj / Zarejestruj
                        </button>
                    )}
                </nav>
            </div>
            {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
        </header>
    );
};
export default Header;
