// src/hooks/useNotifications.jsx
import { useEffect, useState } from "react";
import axiosPrivate from "../api/axiosPrivate";

export default function useNotifications() {
    const [count, setCount] = useState(0);
    const [isUnauthorized, setIsUnauthorized] = useState(false);

    const fetchNotifications = async () => {
        try {
            const res = await axiosPrivate.get("/api/notifications");
            setCount(res.data.count || 0);
            setIsUnauthorized(false);
        } catch (error) {
            if (error.response?.status === 401) {
                setIsUnauthorized(true);
            }
            setCount(0);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return { count, fetchNotifications, isUnauthorized };
}