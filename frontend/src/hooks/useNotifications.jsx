// src/hooks/useNotifications.jsx
import { useEffect, useState } from "react";
import axiosPrivate from "../api/axiosPrivate";

export default function useNotifications() {
    const [count, setCount] = useState(0);

    const fetchNotifications = async () => {
        try {
            const res = await axiosPrivate.get("/api/notifications");
            setCount(res.data.count || 0);
        } catch (error) {
            console.error("Failed to load notifications:", error);
            setCount(0);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return { count, fetchNotifications };

}