// src/hooks/useCart.jsx
import { useContext, createContext, useState, useEffect } from 'react';
import axiosPrivate from '../api/axiosPrivate';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [isUnauthorized, setIsUnauthorized] = useState(false);

    const fetchCart = async () => {
        try {
            const res = await axiosPrivate.get('/api/cart');
            const items = res.data;
            setCartItems(items);
            setIsUnauthorized(false);
            const totalQuantity = Array.isArray(items)
                ? items.reduce((sum, item) => sum + item.quantity, 0)
                : 0;
            setCartQuantity(totalQuantity);
        } catch (error) {
            if (error.response?.status === 401) {
                setIsUnauthorized(true);
            }
            console.error('Ошибка загрузки корзины:', error);
            toast.error('Error retrieving shopping cart');
            setCartItems([]);
            setCartQuantity(0);
        }
    };

    const clearCart = () => {
        setCartItems([]);
        setCartQuantity(0);
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
                clearCart,
                isUnauthorized,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default function useCart() {
    return useContext(CartContext);
}
