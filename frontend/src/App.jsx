import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";
import PlaceOrder from "./components/place-order/PlaceOrder";
import Footer from "./components/footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/login-popup/LoginPopup";

function App() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
            <div className="app">
                <Navbar setShowLogin={setShowLogin} />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order" element={<PlaceOrder />} />
                </Routes>
            </div>

            <Footer />
        </>
    );
}

export default App;
