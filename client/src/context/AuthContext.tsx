import { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Check local storage for existing token on load
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const isAuthenticated = !!token;

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            // Optional: Set default header for axios here if not using interceptor
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = (newToken: string) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
        window.location.href = '/admin/login'; // Force redirect
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};