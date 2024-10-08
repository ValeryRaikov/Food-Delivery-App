import { useContext } from 'react';

import { StoreContext } from '../../context/StoreContext';

import FoodItem from '../food-item/FoodItem';
import './FoodDisplay.css';

export default function FoodDisplay({ category }) {
    const { foodList } = useContext(StoreContext);

    return (
        <div className="food-display" id="food-display">
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {foodList.map((item, idx) => {
                    if (category === 'All' || category === item.category) {
                        return <FoodItem key={idx} {...item} />
                    }
                })}
            </div>
        </div>
    );
}