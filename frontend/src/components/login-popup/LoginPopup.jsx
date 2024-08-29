import { useState } from 'react';

import { assets } from '../../assets/assets';

import './LoginPopup.css';

export default function LoginPopup({ setShowLogin }) {
    const [currState, setCurrState] = useState('Sign Up');

    return (
        <div className="login-popup">
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
                </div>
                <div className="login-popup-inputs">
                    {currState === 'Sign Up' && <input type="text" placeholder='Your name...' required />}
                    <input type="email" placeholder='Your email...' required />
                    <input type="password" placeholder='Your password...' required />
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