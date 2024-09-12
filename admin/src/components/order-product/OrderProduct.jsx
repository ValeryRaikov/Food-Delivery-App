import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import axios from 'axios';

import { AdminContext } from '../../context/AdminContext';
import OrderItem from './order-item/OrderItem';

import './OrderProduct.css';

export default function OrderProduct() {
    const { BASE_URL } = useContext(AdminContext);
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(`${BASE_URL}/api/order/list-orders`);

        if (!response.data.success) {
            toast.error(response.data.message);
            return;
        }

        setOrders(response.data.data);
    }

    const statusHandler = async (e, orderId) => {
        const response = await axios.post(`${BASE_URL}/api/order/status`, {
            orderId,
            status: e.target.value,
        });

        if (!response.data.success) {
            toast.error(response.data.message);
            return;
        }

        await fetchAllOrders();
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className="order-product add">
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map(order => <OrderItem key={order._id} {...order} statusHandler={statusHandler} />)}
            </div>
        </div>
    );
}