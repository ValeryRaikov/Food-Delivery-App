import { useContext ,useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from 'axios';

import { AdminContext } from '../../context/AdminContext';
import { useEditFood } from '../../hooks/useEditFood';

import './EditProduct.css';

export default function EditProduct() {
    const { foodId } = useParams();
    const { BASE_URL } = useContext(AdminContext);
    const editFood = useEditFood();
    const navigate = useNavigate();
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad',
    });

    useEffect(() => {
        (async () => {
            const response = await axios.get(`${BASE_URL}/api/food/${foodId}`);

            if (!response.data.success) {
                toast.error(response.data.message);
                return;
            }

            const { name, description, price, category, image } = response.data.data;
            setData({ name, description, price, category });
            setImage(image);
        })();
    }, [foodId, BASE_URL]);

    const onChangeHandler = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;

        setData(prevData => ({...prevData, [fieldName]: value}));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('id', foodId);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        if (image) { 
            formData.append('image', image);
        }

        await editFood(formData, foodId);
        navigate('/list');
    };

    return (
        <div className="edit-product">
            <form onSubmit={onSubmitHandler} className="flex-col">
                <div className="edit-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        {image && <img src={`${BASE_URL}/uploads/${image}`} />}
                        <input 
                            onChange={(e) => setImage(e.target.files[0])} 
                            type="file" 
                            id="image" 
                            hidden 
                        />
                    </label>
                </div>
                <div className="edit-product-name flex-col">
                    <p>Product name</p>
                    <input 
                        onChange={onChangeHandler} 
                        value={data.name} 
                        type="text" 
                        name="name" 
                        placeholder="Type here..." 
                    />
                </div>
                <div className="edit-product-description flex-col">
                    <p>Product description</p>
                    <textarea 
                        onChange={onChangeHandler} 
                        value={data.description} 
                        name="description" 
                        rows="6" 
                        placeholder="Write description here..." 
                        required 
                    >
                    </textarea>
                </div>
                <div className="edit-category-price">
                    <div className="edit-category flex-col">
                        <p>Product category</p>
                        <select 
                            onChange={onChangeHandler} 
                            value={data.category} 
                            name="category" 
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
                    <div className="edit-price flex-col">
                        <p>Product price</p>
                        <input 
                            onChange={onChangeHandler} 
                            value={data.price} 
                            type="number" 
                            name="price" 
                            placeholder="$20"
                        />
                    </div>
                </div>
                <button type="submit" className="edit-btn">Update</button>
            </form>
        </div>
    );
}