import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import FruitDetails from "./pages/FruitDetails";
import SellerDashboard
from "./pages/SellerDashboard";
import Profile from "./pages/Profile";
import Address from "./pages/Address";
import Checkout from "./pages/Checkout";
import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";

function App() {

    const [cartItems, setCartItems] = useState(() => {

    const savedCart = localStorage.getItem("cart");

    return savedCart
        ? JSON.parse(savedCart)
        : [];
});

useEffect(() => {

    localStorage.setItem(
        "cart",
        JSON.stringify(cartItems)
    );

}, [cartItems]);

    return (

        <BrowserRouter>

            <Navbar cartCount={cartItems.length} />

            <Routes>

    <Route
        path="/"
        element={
            <Home
                cartItems={cartItems}
                setCartItems={setCartItems}
            />
        }
    />

    <Route
        path="/cart"
        element={
            <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
            />
        }
    />

    <Route
        path="/login"
        element={<Login />}
    />

    <Route
        path="/register"
        element={<Register />}
    />

    <Route
    path="/orders"
    element={<Orders />}
/>
<Route
    path="/fruit/:id"
    element={
        <FruitDetails
            cartItems={cartItems}
            setCartItems={setCartItems}
        />
    }
/>

<Route
    path="/seller"
    element={<SellerDashboard />}
/>

<Route
    path="/profile"
    element={<Profile />}
/>

<Route
    path="/address"
    element={<Address />}
/>

<Route
    path="/checkout"
    element={
        <Checkout
            cartItems={cartItems}
            setCartItems={setCartItems}
        />
    }
/>

<Route
    path="/admin-orders"
    element={<AdminOrders />}
/>

<Route
    path="/dashboard"
    element={<AdminDashboard />}
/>

</Routes>



        </BrowserRouter>
    );
}

export default App;
