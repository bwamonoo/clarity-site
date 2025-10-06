import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Header(){
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobileMenu = () => {
    const navMenu = document.getElementById('navMenu')
    if (navMenu && navMenu.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navMenu, { toggle: false })
      bsCollapse.hide()
    }
  }

  return (
    <header>
      <nav className={`navbar navbar-expand-lg sticky-top ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container-fluid d-flex align-items-center px-3 px-md-4">
          <NavLink className="navbar-brand" to="/" onClick={closeMobileMenu}>
            <div className="d-flex align-items-center">
              <div className="brand-logo-modern me-3">
                <i className="bi bi-eye"></i>
              </div>
              <div>
                <span className="brand-name-modern">CLARITY</span>
                <span className="brand-subtitle-modern">Eye Clinic</span>
              </div>
            </div>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={closeMobileMenu}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/services" onClick={closeMobileMenu}>Services</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/staff" onClick={closeMobileMenu}>Our Team</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" onClick={closeMobileMenu}>About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/appointments" onClick={closeMobileMenu}>Appointments</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact" onClick={closeMobileMenu}>Contact</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}