import { useContext } from 'react';

import { StoreContext } from '../../context/StoreContext';

import CartItem from './cart-item/CartItem';
import CartTotal from './cart-total/CartTotal';

import './Cart.css';

export default function Cart() {
    const { cartItems, food_list } = useContext(StoreContext);

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, idx) => {
                    if (cartItems[item._id] > 0) {
                        return <CartItem key={idx} {...item} />;
                    }
                })}
            </div>
            <div className="cart-bottom">
                <CartTotal />
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promocode, enter it here:</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder="Promocode" />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}