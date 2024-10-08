import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const BASE_URL = 'https://food-delivery-app-8sgg.onrender.com';
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');
    const [foodList, setFoodList] = useState([]);

    const fetchFoodList = async () => {
        const response = await axios.get(`${ BASE_URL }/api/food/list`);
        setFoodList(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(`${BASE_URL}/api/cart/get`, {}, { headers: { token } });
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();

            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem('token'));
            }
        }

        loadData();
    }, []);

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
