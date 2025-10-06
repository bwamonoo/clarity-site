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

// Main site content wrapper
function MainSite({ children }) {
  return (
    <>
      <Header />
      <main className="py-0">
        <div className="container-custom">
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function App(){
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<MainSite><Home /></MainSite>} />
      <Route path="/about" element={<MainSite><About /></MainSite>} />
      <Route path="/services" element={<MainSite><Services /></MainSite>} />
      <Route path="/staff" element={<MainSite><Staff /></MainSite>} />
      <Route path="/contact" element={<MainSite><Contact /></MainSite>} />
      <Route path="/appointments" element={<MainSite><Appointments /></MainSite>} />
      
      {/* Admin routes - no wrapper, admin handles its own layout */}
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  )
}
