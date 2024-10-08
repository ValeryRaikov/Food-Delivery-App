import { useState } from 'react';

import ExploreMenu from './explore-menu/ExploreMenu';
import Header from './header/Header';
import FoodDisplay from '../food-display/FoodDisplay';

import './Home.css';
import AppDownload from './app-download/AppDownload';

export default function Home() {
    const [category, setCategory] = useState('All');

    return (
        <div>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
            <AppDownload />
        </div>
    );
}