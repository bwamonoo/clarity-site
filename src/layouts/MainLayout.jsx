// src/layouts/MainLayout.jsx
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainLayout({ children }) {
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