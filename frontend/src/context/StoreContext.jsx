import { createContext, useEffect, useState } from "react";

import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const BASE_URL = 'http://localhost:3030';
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const contextValue = {
        BASE_URL,
        food_list,
        cartItems,
        setCartItems,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;