import { useContext } from "react";

import axios from "axios";

import { StoreContext } from "../context/StoreContext";

export const useAddToCart = () => {
    const { BASE_URL, cartItems, setCartItems, token } = useContext(StoreContext);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({...prev, [itemId]: 1}));
        } else {
            setCartItems(prev => ({...prev, [itemId]: prev[itemId] + 1}));
        }

        if (token) {
            await axios.post(`${BASE_URL}/api/cart/add`, { itemId }, { headers: { token } });
        }
    };

    return addToCart;
};