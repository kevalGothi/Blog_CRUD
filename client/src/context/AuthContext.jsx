import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        if (res.data.success) {
            localStorage.setItem('user', JSON.stringify(res.data.data));
            setUser(res.data.data);
            return res.data.data;
        }
    };

    const register = async (username, email, password) => {
        const res = await api.post('/auth/register', { username, email, password });
        if (res.data.success) {
            localStorage.setItem('user', JSON.stringify(res.data.data));
            setUser(res.data.data);
            return res.data.data;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
