import { useContext } from "react";
import { toast } from "react-toastify";

import axios from "axios";

import { AdminContext } from "../context/AdminContext";

export const useRemoveFood = () => {
    const { BASE_URL, fetchList } = useContext(AdminContext);

    const removeFood = async (foodId) => {
        const response = await axios.post(`${BASE_URL}/api/food/remove/${foodId}`);

        if (!response.data.success) {
            toast.error(response.data.message);
            return;
        }

        fetchList();  

        toast.success(response.data.message);
    }
    
    return removeFood;
}