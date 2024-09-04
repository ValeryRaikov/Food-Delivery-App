import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useGetTotalCartAmount } from '../../hooks/useGetTotalCartAmount';

import { assets } from '../../assets/assets';
import './Navbar.css';

export default function Navbar({ setShowLogin }) {
    const [menu, setMenu] = useState('home');
    const getTotalCartAmount = useGetTotalCartAmount();
    const navigate = useNavigate();

    const handleNavigation = (path, hash) => {
        setMenu(path);
        navigate(path);

        if (hash) {
            setTimeout(() => {
                const element = document.getElementById(hash);

                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        }
    };

    return (
        <div className="navbar">
            <Link to='/'>
                <img src={assets.logo} className="logo" />
            </Link>
            <ul className="navbar-menu">
                <Link 
                    to={'/'}
                    onClick={() => handleNavigation('/', null)} 
                    className={menu === 'home' ? 'active': ''}
                >
                    home
                </Link>
                <Link 
                    to={'/'}
                    onClick={() => handleNavigation('/', 'explore-menu')} 
                    className={menu === 'menu' ? 'active': ''}
                >
                    menu
                </Link>
                <Link 
                    to={'/'}
                    onClick={() => handleNavigation('/', 'app-download')} 
                    className={menu === 'mobile app' ? 'active': ''}
                >
                    mobile app
                </Link>
                <Link 
                    to={'/'}
                    onClick={() => handleNavigation('/', 'footer')} 
                    className={menu === 'contact us' ? 'active': ''}
                >
                    contact us
                </Link>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} />
                <div className="navbar-search-icon">
                    <Link to='/cart'>
                        <img src={assets.basket_icon} />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
                </div>
                <button onClick={() => setShowLogin(true)}>Sign In</button>
            </div>
        </div>
    );
}
