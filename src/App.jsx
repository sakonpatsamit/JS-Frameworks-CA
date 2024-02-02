import React from "react";
import "./App.css";
import HomePage from "./Homepage";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import CartPage from "./Cart";
import CartProvider from "./utils/CartProvider";
import ContactForm from "./Form";
import CheckoutPage from "./CheckoutSuccess";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="form" element={<ContactForm />} />
            <Route path="product/:productId" element={<ProductDetails />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
