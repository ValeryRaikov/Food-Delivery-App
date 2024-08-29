import { useContext } from "react";

import { StoreContext } from "../../context/StoreContext";

export const useAddToCart = () => {
    const { cartItems, setCartItems } = useContext(StoreContext);

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({...prev, [itemId]: 1}));
        } else {
            setCartItems(prev => ({...prev, [itemId]: prev[itemId] + 1}));
        }
    };

    return addToCart;
};