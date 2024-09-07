import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";
import PlaceOrder from "./components/place-order/PlaceOrder";
import Footer from "./components/footer/Footer";
import LoginPopup from "./components/login-popup/LoginPopup";
import Verify from "./components/verify/Verify";

function App() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            <ToastContainer />
            {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
            <div className="app">
                <Navbar setShowLogin={setShowLogin} />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order" element={<PlaceOrder />} />
                    <Route path="/verify" element={<Verify />} />
                </Routes>
            </div>

            <Footer />
        </>
    );
}

export default App;
