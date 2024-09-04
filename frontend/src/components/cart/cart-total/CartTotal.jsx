import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGetTotalCartAmount } from '../../../hooks/useGetTotalCartAmount';

import './CartTotal.css';

export default function CartTotal() {
    const getTotalCartAmount = useGetTotalCartAmount();
    const [deliveryFee, setDeliveryFee] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getTotalCartAmount() < 50
            ? setDeliveryFee(5)
            : setDeliveryFee(0)
    }, [getTotalCartAmount]);

    return (
        <div className="cart-total">
            {location.pathname === '/cart' 
                ? <div className="cart-total-header">
                    <h2>Cart Total</h2>
                    <p className="info">Free delivery for orders over $50</p>
                </div>
                : <h2>Cart Total</h2>
            }
            <div>
                <div className="cart-total-details">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount().toFixed(2)}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Delivery fee</p>
                    <p>${deliveryFee.toFixed(2)}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <b>Total</b>
                    <b>${(getTotalCartAmount() + deliveryFee).toFixed(2)}</b>
                </div>
            </div>
            <button onClick={() => navigate('/order')}>{
                location.pathname === '/cart' 
                    ? 'Proceed to Checkout'
                    : 'Proceed to Payment'
                }</button>
        </div>
    );
}