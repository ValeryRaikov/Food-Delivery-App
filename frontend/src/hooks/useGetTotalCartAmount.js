import { useContext } from "react";

import { StoreContext } from "../context/StoreContext";

export const useGetTotalCartAmount = () => {
    const { cartItems, foodList } = useContext(StoreContext);

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = foodList.find(product => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        return totalAmount;
    }

    return getTotalCartAmount;
}