import { useContext } from "react";

import axios from "axios";

import { StoreContext } from "../context/StoreContext";

export const useRemoveFromCart = () => {
    const { BASE_URL ,setCartItems, token } = useContext(StoreContext);

    const removeFromCart = async (itemId) => {
        setCartItems(prev => ({...prev, [itemId]: prev[itemId] - 1}));

        if (token) {
            await axios.post(`${BASE_URL}/api/cart/remove`, { itemId }, { headers: { token } });
        }
    };

    return removeFromCart;
};