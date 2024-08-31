import { assets } from '../../assets/assets';
import './Navbar.css';

export default function Navbar() {
    return (
        <div className="navbar">
            <img src={assets.logo} className="logo" />
            <img src={assets.profile_image} className="profile" />
        </div>
    );
}