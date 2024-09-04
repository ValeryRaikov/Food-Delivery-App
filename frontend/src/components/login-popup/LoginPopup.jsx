import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import axios from 'axios';

import { StoreContext } from '../../context/StoreContext';

import { assets } from '../../assets/assets';

import './LoginPopup.css';

export default function LoginPopup({ setShowLogin }) {
    const { BASE_URL, setToken } = useContext(StoreContext);

    const [currState, setCurrState] = useState('Sign Up');
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const onChangeHandler = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;

        setData(data => ({...data, [fieldName]: value}));
    }

    const onLoginHandler = async (e) => {
        e.preventDefault();

        let url = BASE_URL;

        if (currState === 'Login') {
            url += '/api/user/login';
        } else {
            url += '/api/user/register';
        }

        const response = await axios.post(url, data);

        if (!response.data.success) {
            toast.error(response.data.message);
            return;
        }

        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);
    }

    return (
        <div className="login-popup">
            <form onSubmit={onLoginHandler} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
                </div>
                <div className="login-popup-inputs">
                    {currState === 'Sign Up' && 
                    <input 
                        type="text" 
                        name="name" 
                        onChange={onChangeHandler}  
                        value={data.name} 
                        placeholder='Your name...' 
                        required 
                    />}
                    <input 
                        type="email" 
                        name="email" 
                        onChange={onChangeHandler}
                        value={data.email} 
                        placeholder='Your email...'
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        onChange={onChangeHandler} 
                        value={data.password} 
                        placeholder='Your password...' 
                        required 
                    />
                </div>
                <button type="submit">{currState === 'Sign Up' ? 'Create Account' : 'Login'}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === 'Sign Up'
                    ? <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                    : <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                }
            </form>
        </div>
    );
}