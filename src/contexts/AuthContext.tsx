import {createContext, useContext, useState, type ReactNode, useEffect} from "react";

type User = {
    email: string;
}

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    function login(userData: User, token: string) {
        const user = JSON.stringify(userData);

        setUser(userData);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
    }

    function logout() {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        console.log(token);
        if (token !== null  && user !== null) {
            setToken(token);
            setUser(JSON.parse(user));
        }

        setIsLoading(false);
    }, [])

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used with a AuthProvider');
    }
    return context;
}