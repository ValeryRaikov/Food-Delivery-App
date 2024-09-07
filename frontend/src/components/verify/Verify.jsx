import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from 'axios';

import { StoreContext } from '../../context/StoreContext';

import './Verify.css';

export default function Verify() {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const { BASE_URL } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(`${BASE_URL}/api/order/verify`, { success, orderId });

        if (!response.data.success) {
            toast.error(response.data.message);
            navigate();
        }

        navigate('/my-orders');
    }

    return (
        <div className="verify">
            <div className="spinner"></div>
        </div>
    );
}