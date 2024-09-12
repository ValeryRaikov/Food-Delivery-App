import { useContext, useEffect, useState } from 'react';

import axios from 'axios';

import { StoreContext } from '../../context/StoreContext';

import OrderItem from './order-item/OrderItem';
import './MyOrders.css';

export default function MyOrders() {
    const { BASE_URL, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios(`${BASE_URL}/api/order/user-orders`, {}, { headers: { token } });
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, idx) => <OrderItem key={idx} idx={idx} {...order} fetchOrders={fetchOrders} />)}
            </div>
        </div>
    );
}