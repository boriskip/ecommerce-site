// src/hooks/useCart.jsx
import { useContext, createContext, useState, useEffect } from 'react';
import axiosPrivate from '../api/axiosPrivate';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);

    const fetchCart = async () => {
        try {
            const res = await axiosPrivate.get('/api/cart');
            const items = res.data;
            setCartItems(items);
            const totalQuantity = Array.isArray(items)
                ? items.reduce((sum, item) => sum + item.quantity, 0)
                : 0;
            setCartQuantity(totalQuantity);
        } catch (error) {
            console.error('Ошибка загрузки корзины:', error);
            toast.error('Ошибка получения корзины');
            setCartItems([]);
            setCartQuantity(0);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartQuantity,
                fetchCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default function useCart() {
    return useContext(CartContext);
}
