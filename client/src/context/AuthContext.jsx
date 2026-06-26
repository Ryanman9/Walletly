import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authAPI } from "../api/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "walletly_token";
const USER_KEY = "walletly_user";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem(USER_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    const persistUser = (userData, token) => {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        setUser(userData);
    };

    const clearAuth = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
    };

    useEffect(() => {
        const verifySession = async () => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const data = await authAPI.getProfile();
                setUser(data.user);
                localStorage.setItem(USER_KEY, JSON.stringify(data.user));
            } catch {
                clearAuth();
            } finally {
                setLoading(false);
            }
        };

        verifySession();
    }, []);

    const register = useCallback(async (formData) => {
        setAuthError(null);
        const data = await authAPI.register(formData);
        persistUser(data.user, data.token);
        return data;
    }, []);

    const login = useCallback(async (formData) => {
        setAuthError(null);
        const data = await authAPI.login(formData);
        persistUser(data.user, data.token);
        return data;
    }, []);

    const logout = useCallback(async () => {
        try {
            await authAPI.logout();
        } catch(error){
            setAuthError(error.response.data.message)
        } finally {
            clearAuth();
        }
    }, []);

    const updateUser = useCallback((updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    }, []);

    const isAuthenticated = Boolean(user);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                authError,
                isAuthenticated,
                register,
                login,
                logout,
                updateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
};