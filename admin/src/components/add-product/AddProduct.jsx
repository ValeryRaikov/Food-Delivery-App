import { useState } from 'react';
import { toast } from 'react-toastify';

import axios from 'axios';

import { assets } from '../../assets/assets';
import './AddProduct.css';

const BASE_URL = 'http://localhost:3030';

export default function AddProduct() {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad',
    });

    const onChangeHandler = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;

        setData(prevData => ({...prevData, [fieldName]: value}));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        formData.append('image', image);

        const response = await axios.post(`${BASE_URL}/api/food/add`, formData);

        if (!response.data.success) {
            toast.error(response.data.message);
            return;
        }

        setData({
            name: '',
            description: '',
            price: '',
            category: 'Salad',
        });
        setImage(false);

        toast.success(response.data.message);
    }

    return (
        <div className="add-product">
            <form onSubmit={onSubmitHandler} className="flex-col">
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} />
                        <input 
                            onChange={(e) => setImage(e.target.files[0])} 
                            type="file" 
                            id="image" 
                            hidden 
                            required 
                        />
                    </label>
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input 
                        onChange={onChangeHandler} 
                        value={data.name} 
                        type="text" 
                        name="name" 
                        placeholder="Type here..." 
                    />
                </div>
                <div className="add-product-description flex-col">
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
                <div className="add-category-price">
                    <div className="add-category flex-col">
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
                    <div className="add-price flex-col">
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
                <button type="submit" className="add-btn">Add</button>
            </form>
        </div>
    );
}