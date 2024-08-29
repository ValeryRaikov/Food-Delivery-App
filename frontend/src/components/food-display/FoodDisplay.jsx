import { useContext } from 'react';

import { StoreContext } from '../../context/StoreContext';

import FoodItem from '../food-item/FoodItem';
import './FoodDisplay.css';

export default function FoodDisplay({ category }) {
    const { food_list } = useContext(StoreContext);

    return (
        <div className="food-display" id="food-display">
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item, idx) => <FoodItem key={idx} {...item} />)}
            </div>
        </div>
    );
}