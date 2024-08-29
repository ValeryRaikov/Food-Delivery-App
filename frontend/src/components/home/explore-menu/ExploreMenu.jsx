import { menu_list } from '../../../assets/assets';
import './ExploreMenu.css';

export default function ExploreMenu({
    category,
    setCategory,
}) {
    return (
        <div className="explore-menu" id="explore-menu">
            <h1>Explore our menu</h1>
            <p className="explore-menu-text">Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings.</p>
            <div className="explore-menu-list">
                {menu_list.map((item, idx) => {
                    return (
                        <div 
                            onClick={() => setCategory(prev => prev === item.menu_name ? 'All': item.menu_name)} 
                            key={idx} 
                            className="explore-menu-list-item"
                        >
                            <img 
                                src={item.menu_image} 
                                className={category === item.menu_name ? 'active' : ''} 
                            />
                            <p>{item.menu_name}</p>
                        </div>
                    );
                })}
            </div>
            <hr />
        </div>
    );
}