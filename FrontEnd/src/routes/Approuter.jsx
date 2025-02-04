import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AppLayout from "../components/layout/AppLayout";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Store from "../pages/Store";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="store" element={<Store />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
