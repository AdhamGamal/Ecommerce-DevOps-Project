import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AppLayout from "../components/layout/AppLayout";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Store from "../pages/Store";
import Products from "../pages/Products";
import ProductInfo from "../pages/ProductInfo";
import Cart from "../pages/Cart";
import WishList from "../pages/WishList";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="store" element={<Store />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<ProductInfo />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<WishList />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        {/* <Route path="products" element={<Products />}> */}
        {/* <Route path="products" element={<Products />} />{" "} */}
        {/* No changes needed */}
        {/* </Route> */}
      </Route>
    </Routes>
  );
}

export default AppRouter;
