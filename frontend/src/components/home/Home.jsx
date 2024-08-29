import { useState } from 'react';

import ExploreMenu from './explore-menu/ExploreMenu';
import Header from './header/Header';

import './Home.css';

export default function Home() {
    const [category, setCategory] = useState('All');

    return (
        <div>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} />
        </div>
    );
}