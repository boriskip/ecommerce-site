import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axiosPrivate";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartQuantity, setCartQuantity] = useState(0);

    const fetchCartQuantity = async () => {
        try {
            const response = await axios.get("/api/cart");
            const total = response.data.reduce((sum, item) => sum + item.quantity, 0);
            setCartQuantity(total);
        } catch (error) {
            console.error("Ошибка при получении корзины", error);
        }
    };

    useEffect(() => {
        fetchCartQuantity();
    }, []);

    return (
        <CartContext.Provider value={{ cartQuantity, setCartQuantity, fetchCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
