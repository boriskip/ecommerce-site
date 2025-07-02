import { createContext, useContext, useState, useEffect } from "react";
import axiosPrivate from "../api/axiosPrivate";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // ⏳ показывает, идёт ли загрузка
    const [error, setError] = useState(null);         // ⚠️ хранит ошибку, если что-то пошло не так

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosPrivate.get("/api/user");
                setUser(res.data);
            } catch (err) {
                console.log("⛔ Не авторизован", err?.response?.status);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logout = async () => {
        try {
            await axiosPrivate.post("/api/logout");
        } catch (err) {
            if (err.response?.status === 401) {
                console.warn("Пользователь уже не авторизован. Можно игнорировать.");
            } else {
                console.error("Ошибка при logout:", err);
            }
        } finally {
            setUser(null);
            localStorage.removeItem("user");
        }
    };

    const isAuthenticated = !!user; // true, если user не null

    return (
        <AuthContext.Provider
            value={{ user, setUser, logout, isLoading, error, isAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

