import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Staff from './pages/Staff'
import Contact from './pages/Contact'
import Appointments from './pages/Appointments'
import Admin from './pages/Admin'

export default function App(){
  return (
    <>
      <Header />
      <main className="py-0">
        <div className="container-custom">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  )
}
