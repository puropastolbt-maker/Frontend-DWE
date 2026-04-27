import { createContext, useContext, ReactNode, useEffect, useState } from "react";

type AuthUser = {
    username: string;
    role: string;
    token: string;
};

type AuthContextType = {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUserState] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Cargar el usuario desde localStorage al montar el componente
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUserState(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing stored user:", error);
                localStorage.removeItem("user");
            }
        }
        setIsLoading(false);
    }, []);

    const setUser = (newUser: AuthUser | null) => {
        setUserState(newUser);
        if (newUser) {
            localStorage.setItem("user", JSON.stringify(newUser));
            localStorage.setItem("token", newUser.token);
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    };

    const logout = () => {
        setUser(null);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-center">
                    <p className="text-lg font-medium text-gray-900">Loading MiniPOS...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
