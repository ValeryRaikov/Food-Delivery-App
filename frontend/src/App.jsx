import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";
import PlaceOrder from "./components/place-order/PlaceOrder";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <>
            <div className="app">
                <Navbar />

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
