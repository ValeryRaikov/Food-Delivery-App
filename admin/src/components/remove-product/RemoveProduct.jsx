import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from 'axios';

import { AdminContext } from '../../context/AdminContext';
import { useRemoveFood } from '../../hooks/useRemoveFood';

import './RemoveProduct.css';

export default function RemoveProduct() {
    const { foodId } = useParams();
    const { BASE_URL } = useContext(AdminContext);
    const removeFood = useRemoveFood();
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
    });

    useEffect(() => {
        (async (foodId) => {
            if (!foodId) {
                toast.error('Error!');
                return;
            }

            const response = await axios.get(`${BASE_URL}/api/food/${foodId}`);

            if (!response.data.success) {
                toast.error(response.data.message);
                return;
            }

            setData(response.data.data);
            
            toast.success(response.data.message);
        })(foodId);
    }, [foodId, BASE_URL]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!foodId) {
            toast.error('Error!');
            return;
        }

        await removeFood(foodId);
        navigate('/list');
    }

    return (
        <div className="remove-product">
            <form onSubmit={onSubmitHandler} className="flex-col">
                <div className="remove-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={`${BASE_URL}/uploads/${data.image}`} />
                        <input 
                            type="file" 
                            id="image" 
                            hidden 
                            disabled
                        />
                    </label>
                </div>
                <div className="remove-product-name flex-col">
                    <p>Product name</p>
                    <input 
                        value={data.name} 
                        type="text" 
                        name="name" 
                        placeholder="Type here..." 
                        disabled
                    />
                </div>
                <div className="remove-product-description flex-col">
                    <p>Product description</p>
                    <textarea 
                        value={data.description} 
                        name="description" 
                        rows="6" 
                        placeholder="Write description here..." 
                        disabled
                    >
                    </textarea>
                </div>
                <div className="remove-category-price">
                    <div className="remove-category flex-col">
                        <p>Product category</p>
                        <select 
                            value={data.category} 
                            name="category" 
                            disabled
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rools">Rools</option>
                            <option value="Desert">Desert</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="remove-price flex-col">
                        <p>Product price</p>
                        <input 
                            value={data.price} 
                            type="number" 
                            name="price" 
                            placeholder="$20"
                            disabled
                        />
                    </div>
                </div>
                <button type="submit" className="remove-btn">Remove</button>
            </form>
        </div>
    );
}