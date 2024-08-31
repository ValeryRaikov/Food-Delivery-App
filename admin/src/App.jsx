import { Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import AddProduct from './components/add-product/AddProduct';
import ListProduct from './components/list-product/ListProduct';
import OrderProduct from './components/order-product/OrderProduct';

function App() {
    return (
        <>
        <ToastContainer />
            <Navbar />
            <hr />
            <div className="app-content">
                <Sidebar />
                <Routes>
                    <Route path='/add' element={<AddProduct />} />
                    <Route path='/list' element={<ListProduct />} />
                    <Route path='/orders' element={<OrderProduct />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
