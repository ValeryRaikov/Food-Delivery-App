import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { AdminContext } from '../../context/AdminContext';

import './FoodItem.css';

export default function FoodItem({
    _id,
    name,
    price,
    category,
    image,
}) {
    const { BASE_URL } = useContext(AdminContext);
    const navigate = useNavigate();

    return (
        <div className="list-table-format">
            <img src={`${BASE_URL}/images/${image}`} />
            <p>{name}</p>
            <p>{category}</p>
            <p>${price}</p>
            <p onClick={() => navigate(`/edit/${_id}`)}><i className="fas fa-edit edit-icon"></i></p>
            <p onClick={() => navigate(`/remove/${_id}`)} className="cursor">X</p>
        </div>
    );
}