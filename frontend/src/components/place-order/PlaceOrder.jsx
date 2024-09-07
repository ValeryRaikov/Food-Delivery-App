import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { StoreContext } from '../../context/StoreContext';
import { useGetTotalCartAmount } from '../../hooks/useGetTotalCartAmount';
import CartTotal from '../cart/cart-total/CartTotal';

import './PlaceOrder.css';
import axios from 'axios';

export default function PlaceOrder() {
    const { BASE_URL, token, foodList, cartItems } = useContext(StoreContext);
    const getTotalCartAmount = useGetTotalCartAmount();
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phoneNumber: '',
    });

    const onChangeHandler = (e) => {
        const fiedlName = e.target.name;
        const value = e.target.value;

        setData(prevdata => ({...prevdata, [fiedlName]: value}));
    }

    const placeOrder = async (e) => {
        e.preventDefault();

        let orderItems = [];
        foodList.map(item => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo['quantity'] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 5,
        };
        
        let response = await axios.post(`${BASE_URL}/api/order/place`, orderData, { headers: { token } });

        if (!response.data.success) {
            toast.error(response.data.message);
            return;
        }

        const { sessionUrl } = response.data;
        window.location.replace(sessionUrl);
    }

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery information</p>
                <div className="multi-fields">
                    <input 
                        onChange={onChangeHandler} 
                        value={data.firstName} 
                        type="text" 
                        name="firstName" 
                        placeholder="First name" 
                        required
                    />
                    <input 
                        onChange={onChangeHandler} 
                        value={data.lastName} 
                        type="text" 
                        name="lastName" 
                        placeholder="Last name" 
                        required
                    />
                </div>
                <input 
                    onChange={onChangeHandler} 
                    value={data.email} 
                    type="email" 
                    name="email" 
                    placeholder="Email address" 
                    required
                />
                <input 
                    onChange={onChangeHandler} 
                    value={data.street} 
                    type="text" 
                    name="street"
                    placeholder="Street" 
                    required
                 />
                <div className="multi-fields">
                    <input
                        onChange={onChangeHandler} 
                        value={data.city} 
                        type="text" 
                        name="city" 
                        placeholder="City" 
                        required
                    />
                    <input 
                        onChange={onChangeHandler} 
                        value={data.state} 
                        type="text" 
                        name="state" 
                        placeholder="State" 
                        required
                    />
                </div>
                <div className="multi-fields">
                    <input 
                        onChange={onChangeHandler}
                        value={data.postalCode} 
                        type="text" 
                        name="postalCode" 
                        placeholder="Postal code" 
                        required
                    />
                    <input 
                        onChange={onChangeHandler} 
                        value={data.country}
                        type="text" 
                        name="country"
                        placeholder="Country" 
                        required
                    />
                </div>
                <input 
                    onChange={onChangeHandler} 
                    value={data.phoneNumber} 
                    type="text" 
                    name="phoneNumber" 
                    placeholder="Phone number" 
                    className="last-input" 
                    required
                />
            </div>
            <div className="place-order-right">
                <CartTotal />
            </div>
        </form>
    );
}