"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/app/api/users";

interface AuthContextType {
    isAuthenticated: boolean;
    email: string | null;
    isAdmin: boolean;
    isLoading: boolean;
    logout: () => void;
    login: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [email, setEmail] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsAuthenticated(false);
            setEmail(null);
            setIsAdmin(false);
            setIsLoading(false);
        } else {
            getMe()
                .then((response) => {
                    if (response.status === 200) {
                        setIsAuthenticated(true);
                        setEmail(response.data.email);
                        setIsAdmin(response.data.type === "admin");
                    } else {
                        handleLogout(); 
                    }
                })
                .catch(() => {
                    handleLogout(); 
                })
                .finally(() => setIsLoading(false));
        }
    }, [router]);

    const login = (token: string) => {
        localStorage.setItem("token", token);

        getMe()
            .then((response) => {
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    setEmail(response.data.email);
                    setIsAdmin(response.data.type === "admin");
                    if (response.data.type === "admin") {
                        router.push("/admin");
                    } else {
                        router.push("/");
                    }
                } else {
                    handleLogout(); 
                }
            })
            .catch(() => handleLogout());
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setEmail(null);
        setIsAdmin(false);
        localStorage.removeItem("token");
        router.push("/login");
    };

    const logout = () => {
        handleLogout();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, email, isAdmin, isLoading, logout, login }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
