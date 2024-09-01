import { useContext } from "react";
import { toast } from "react-toastify";

import axios from "axios";

import { AdminContext } from "../context/AdminContext";

export const useEditFood = () => {
    const { BASE_URL, fetchList } = useContext(AdminContext);

    const editFood = async (foodData, foodId) => {
        const response = await axios.put(`${BASE_URL}/api/food/edit/${foodId}`, foodData);

        if (!response.data.success) {
            toast.error(response.data.message);
            return;
        }

        fetchList();  

        toast.success(response.data.message);
    }
    
    return editFood;
}