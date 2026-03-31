import Home from "./Home";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CalendarPage from "./CalendarPage";
import DashboardAdmin from "./DashboardAdmin";
import DashboardClient from "./DashboardClient";
import Products from "./Products";
import Services from "./Services";
import ServiceDetail from "./ServiceDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<Services />} />
      <Route path="/service/:service" element={<ServiceDetail />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/dashboard" element={<DashboardClient />} />
      <Route path="/products" element={<Products />} />
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

