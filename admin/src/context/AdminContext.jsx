import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";

const BASE_URL = 'http://localhost:3030';

export const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${BASE_URL}/api/food/list`);

        if (!response.data.success) {
            toast.error('Error fetching data!');
            return;
        } 

        setList(response.data.data);
    };

    useEffect(() => {
        fetchList();
    }, []);

    const contextValue = {
        BASE_URL,
        list,
        fetchList,
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
}

export default AdminContextProvider;