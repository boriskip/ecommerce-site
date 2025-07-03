// src/hooks/useCart.js
import { useContext, createContext, useState, useEffect } from 'react';
import axiosPrivate from '../api/axiosPrivate';
import toast from 'react-hot-toast';

// Создаём контекст
const CartContext = createContext();

// Провайдер
export function CartProvider({ children }) {
    const [cartQuantity, setCartQuantity] = useState(0);

    const fetchCartQuantity = async () => {
        try {
            const res = await axiosPrivate.get('/api/cart');
            const items = res.data;
            const totalQuantity = Array.isArray(items)
                ? items.reduce((sum, item) => sum + item.quantity, 0)
                : 0;

            setCartQuantity(totalQuantity);
        } catch (error) {
            console.error('Ошибка загрузки количества корзины:', error);
            toast.error('Ошибка получения корзины');
            setCartQuantity(0);
        }
    };

    useEffect(() => {
        fetchCartQuantity(); // Загрузка при инициализации
    }, []);

    return (
        <CartContext.Provider value={{ cartQuantity, fetchCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

// Хук для использования
export default function useCart() {
    return useContext(CartContext);
}
