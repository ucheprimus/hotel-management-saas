import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Set up axios interceptor for token refresh or error handling
    useEffect(() => {
        // Add a request interceptor to include token in all requests
        const interceptor = axios.interceptors.request.use(
            (config) => {
                const currentToken = localStorage.getItem('token');
                if (currentToken) {
                    config.headers.Authorization = `Bearer ${currentToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, []);

    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/v1/user');
            setUser(response.data.user);
        } catch (error) {
            // If token is invalid, logout
            if (error.response?.status === 401) {
                logout();
            } else {
                setLoading(false);
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/v1/auth/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            return user;
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post('/api/v1/auth/register', userData);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            return user;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};