import { useContext } from "react";
import { toast } from "react-toastify";

import axios from "axios";

import { AdminContext } from "../context/AdminContext";

export const useAddFood = () => {
    const { BASE_URL, fetchList } = useContext(AdminContext);

    const addFood = async (foodData) => {
        const response = await axios.post(`${BASE_URL}/api/food/add`, foodData);

        if (!response.data.success) {
            toast.error(response.data.message);
            return;
        }

        fetchList();  

        toast.success(response.data.message);
    }
    
    return addFood;
}