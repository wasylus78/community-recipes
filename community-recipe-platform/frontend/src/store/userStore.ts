import { create } from 'zustand';
interface UserState {
    token: string | null;
    username: string | null;
    isLoggedIn: boolean;
    login: (token: string, username: string) => void;
    logout: () => void;
}
const useUserStore = create<UserState>((set) => {
    // Odczytaj stan z localStorage
    let storedToken = null;
    let storedUsername = null;
    if (typeof window !== 'undefined') {
        storedToken = localStorage.getItem('token');
        storedUsername = localStorage.getItem('username');
    }
    return {
        token: storedToken,
        username: storedUsername,
        isLoggedIn: !!storedToken,
        login: (token, username) => {
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            set({ token, username, isLoggedIn: true });
        },
        logout: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            set({ token: null, username: null, isLoggedIn: false });
        },
    };
});
export default useUserStore;
