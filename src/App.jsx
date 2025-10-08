// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Staff from './pages/Staff'
import Contact from './pages/Contact'
import Appointments from './pages/Appointments'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Routes>
      {/* Public routes with MainLayout */}
      <Route path="/" element={
        <MainLayout>
          <Home />
        </MainLayout>
      } />
      <Route path="/about" element={
        <MainLayout>
          <About />
        </MainLayout>
      } />
      <Route path="/services" element={
        <MainLayout>
          <Services />
        </MainLayout>
      } />
      <Route path="/staff" element={
        <MainLayout>
          <Staff />
        </MainLayout>
      } />
      <Route path="/contact" element={
        <MainLayout>
          <Contact />
        </MainLayout>
      } />
      <Route path="/appointments" element={
        <MainLayout>
          <Appointments />
        </MainLayout>
      } />
      
      {/* Admin routes with AdminLayout */}
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  )
}