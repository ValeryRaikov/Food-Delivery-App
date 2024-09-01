import { useContext } from 'react';

import { AdminContext } from '../../context/AdminContext';

import FoodItem from '../food-item/FoodItem';
import './ListProduct.css';

export default function ListProduct() {
    const { list } = useContext(AdminContext);

    return (
        <div className="list-product flex-col">
            <p>All Foods Available</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.length === 0 
                    ? <p className="warning-msg">No food in the catalogue!</p>
                    : list.map(item => <FoodItem key={item._id} {...item} />)
                }
            </div>
        </div>
    );
}