import { useContext } from 'react';
import { toast } from 'react-toastify';

import { StoreContext } from '../../context/StoreContext';
import { useAddToCart } from '../../hooks/useAddToCart';
import { useRemoveFromCart } from '../../hooks/useRemoveFromCart';

import { assets } from '../../assets/assets';
import './FoodItem.css';

export default function FoodItem({
    _id,
    name,
    price,
    description,
    image,
}) {
    const { BASE_URL, cartItems, token } = useContext(StoreContext);
    const addToCart = useAddToCart();
    const removeFromCart = useRemoveFromCart();

    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <img src={`${BASE_URL}/images/${image}`} className="food-item-img" />
                {!cartItems[_id]
                    ? <img 
                        onClick={token
                            ? () => addToCart(_id)
                            : () => toast.error('Login to purchase food!')
                        } 
                        src={assets.add_icon_white} 
                        className="add" 
                    />
                    : <div className="food-item-counter">
                        <img 
                            onClick={() => removeFromCart(_id)} 
                            src={assets.remove_icon_red} 
                        />
                        <p>{cartItems[_id]}</p>
                        <img 
                            onClick={() => addToCart(_id)} 
                            src={assets.add_icon_green} 
                        />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} />
                </div>
                <p className="food-item-description">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    );
}