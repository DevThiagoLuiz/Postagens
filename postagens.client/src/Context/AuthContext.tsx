import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    bio?: string;
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => Promise<void>;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [user, setUser] = useState<User | null>(null);


    const login = async (newToken: string, user: User) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(newToken);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    const updateUser = (updated: Partial<User>) => {
        setUser((prev) => (prev ? { ...prev, ...updated } : null));
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
    return context;
};
