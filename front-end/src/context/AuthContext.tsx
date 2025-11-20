import api from "../api/api";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import type { User } from "../types";

interface AuthContextType {
    token: string | null;
    setToken: (newToken: string | null) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const TOKEN_KEY = "token";
const USER_KEY = "user";

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem(TOKEN_KEY)
    );
    const [user, setUser] = useState<User | null>(() => {
        const data = localStorage.getItem(USER_KEY);
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (token) {
            api.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem(TOKEN_KEY, token);
        } else {
            delete api.defaults.headers.common["Authorization"];
            localStorage.removeItem(TOKEN_KEY);
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(USER_KEY);
        }
    }, [user]);

    const isAuthenticated = !!token;

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            user,
            setUser,
            isAuthenticated,
        }),
        [token, user, isAuthenticated]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside an AuthProvider");
    }
    return context;
};

export default AuthProvider;
