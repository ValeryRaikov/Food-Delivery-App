import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { StoreContext } from '../../context/StoreContext';
import { useGetTotalCartAmount } from '../../hooks/useGetTotalCartAmount';

import { assets } from '../../assets/assets';
import './Navbar.css';

export default function Navbar({ setShowLogin }) {
    const [menu, setMenu] = useState('home');
    const getTotalCartAmount = useGetTotalCartAmount();
    const { token, setToken } = useContext(StoreContext);
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

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/');
    }

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
                {!token 
                    ? <button onClick={() => setShowLogin(true)}>Sign In</button>
                    : <div className="navbar-profile">
                        <img src={assets.profile_icon} />
                        <ul className="navbar-profile-dropdown">
                            <li onClick={() => navigate('/my-orders')}><img src={assets.bag_icon} /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} /><p>Logout</p></li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}
