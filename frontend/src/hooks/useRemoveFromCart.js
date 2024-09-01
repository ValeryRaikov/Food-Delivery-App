import { useContext } from "react";

import { StoreContext } from "../context/StoreContext";

export const useRemoveFromCart = () => {
    const { setCartItems } = useContext(StoreContext);

    const removeFromCart = (itemId) => {
        setCartItems(prev => ({...prev, [itemId]: prev[itemId] - 1}));
    };

    return removeFromCart;
};