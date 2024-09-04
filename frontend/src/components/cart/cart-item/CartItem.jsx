import { useContext } from 'react';

import { StoreContext } from '../../../context/StoreContext';
import { useRemoveFromCart } from '../../../hooks/useRemoveFromCart';

import './CartItem.css';

export default function CartItem({
    _id,
    name,
    price,
    image,
}) {
    const { BASE_URL, cartItems } = useContext(StoreContext);
    const removeFromCart = useRemoveFromCart();

    return (
        <div>
            <div className="cart-items-title cart-items-item">
                <img src={`${BASE_URL}/images/${image}`} />  
                <p>{name}</p>
                <p>${price}</p>
                <p>{cartItems[_id]}</p>
                <p>${price * cartItems[_id]}</p>
                <p onClick={() => removeFromCart(_id)} className="cross">x</p>
            </div>
            <hr />
        </div>
    );
}