import { useGetTotalCartAmount } from '../../hooks/useGetTotalCartAmount';
import CartTotal from '../cart/cart-total/CartTotal';

import './PlaceOrder.css';

export default function PlaceOrder() {
    const getTotalCartAmount = useGetTotalCartAmount();

    return (
        <form className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery information</p>
                <div className="multi-fields">
                    <input type="text" placeholder="First name" />
                    <input type="text" placeholder="Last name" />
                </div>
                <input type="email" placeholder="Email address" />
                <input type="text" placeholder="Street" />
                <div className="multi-fields">
                    <input type="text" placeholder="City" />
                    <input type="text" placeholder="State" />
                </div>
                <div className="multi-fields">
                    <input type="text" placeholder="Postal code" />
                    <input type="text" placeholder="Country" />
                </div>
                <input type="text" placeholder="Phone number" className="last-input" />
            </div>
            <div className="place-order-right">
                <CartTotal />
            </div>
        </form>
    );
}