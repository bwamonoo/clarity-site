import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="container-custom-2">
        {/* Main Footer Content */}
        <div className="row gy-4">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">
              <div className="d-flex align-items-center mb-3">
                <div className="footer-logo me-3">
                  <i className="bi bi-eye"></i>
                </div>
                <div>
                  <h5 className="footer-title mb-1">Clarity Eye Clinic</h5>
                  <p className="footer-description mb-0">
                    Expert eye care with modern diagnostics and compassionate service.
                  </p>
                </div>
              </div>
              <div className="footer-contact">
                <div className="contact-item">
                  <i className="bi bi-geo-alt"></i>
                  <span>123 Healthcare Ave, Medical District, Accra</span>
                </div>
                <div className="contact-item">
                  <i className="bi bi-telephone"></i>
                  <span>+233-XX-XXX-XXXX</span>
                </div>
                <div className="contact-item">
                  <i className="bi bi-envelope"></i>
                  <span>info@clarityeye.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-sm-6">
            <h6 className="footer-heading">Clinic</h6>
            <ul className="footer-links">
              <li><a href="/services" className="footer-link">Services</a></li>
              <li><a href="/staff" className="footer-link">Our Staff</a></li>
              <li><a href="/appointments" className="footer-link">Appointments</a></li>
              <li><a href="/about" className="footer-link">About Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-3 col-sm-6">
            <h6 className="footer-heading">Services</h6>
            <ul className="footer-links">
              <li><a href="/services/eye-exams" className="footer-link">Eye Exams</a></li>
              <li><a href="/services/contact-lenses" className="footer-link">Contact Lenses</a></li>
              <li><a href="/services/glasses" className="footer-link">Eyeglasses</a></li>
              <li><a href="/services/surgery" className="footer-link">Eye Surgery</a></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-legal-social">
              <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <h6 className="footer-heading">Legal</h6>
                  <ul className="footer-links">
                    <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
                    <li><a href="/terms" className="footer-link">Terms of Service</a></li>
                    <li><a href="/accessibility" className="footer-link">Accessibility</a></li>
                  </ul>
                </div>
                
                <div className="col-sm-6">
                  <h6 className="footer-heading">Connect</h6>
                  <div className="social-links mb-3">
                    <a className="social-link" href="#" aria-label="Facebook">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a className="social-link" href="#" aria-label="Instagram">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a className="social-link" href="#" aria-label="Twitter">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a className="social-link" href="#" aria-label="LinkedIn">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="copyright">
                © {year} Clarity Eye Clinic. All rights reserved.
              </div>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="footer-meta">
                <span className="meta-item">
                  <i className="bi bi-heart-fill text-danger me-1"></i>
                  Committed to your vision health
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}