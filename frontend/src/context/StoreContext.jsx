import { createContext, useEffect, useState } from "react";

import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({children}) => {
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;