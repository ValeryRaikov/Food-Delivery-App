import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const BASE_URL = 'http://localhost:3030';
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');
    const [foodList, setFoodList] = useState([]);

    const fetchFoodList = async () => {
        const response = await axios.get(`${ BASE_URL }/api/food/list`);
        setFoodList(response.data.data);
    }

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();

            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
            }
        }

        loadData();
    }, [fetchFoodList]);

    const contextValue = {
        BASE_URL,
        cartItems,
        setCartItems,
        token,
        setToken,
        foodList, 
        setFoodList,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;