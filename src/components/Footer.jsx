import React from 'react'
import { websiteContent } from '../config/content/index'

export default function Footer() {
  const year = new Date().getFullYear()
  const { clinic, footer } = websiteContent
  
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
                  <img src="/images/clarity-logo.png" alt="Clarity Eye Clinic" />
                </div>
                <div>
                  <h5 className="footer-title mb-1">{clinic.name}</h5>
                  <p className="footer-description mb-0">
                    {footer.description}
                  </p>
                </div>
              </div>
              <div className="footer-contact">
                <div className="contact-item">
                  <i className="bi bi-geo-alt"></i>
                  <span>
                    {clinic.contact.address.street}, {clinic.contact.address.landmark}, {clinic.contact.address.city}
                  </span>
                </div>
                <div className="contact-item">
                  <i className="bi bi-telephone"></i>
                  <span>{clinic.contact.phone.formatted}</span>
                </div>
                <div className="contact-item">
                  <i className="bi bi-envelope"></i>
                  <span>{clinic.contact.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-sm-6">
            <h6 className="footer-heading">{footer.quickLinks.clinic.title}</h6>
            <ul className="footer-links">
              {footer.quickLinks.clinic.links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="footer-link">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-3 col-sm-6">
            <h6 className="footer-heading">{footer.quickLinks.services.title}</h6>
            <ul className="footer-links">
              {footer.quickLinks.services.links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="footer-link">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-legal-social">
              <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <h6 className="footer-heading">{footer.legal.title}</h6>
                  <ul className="footer-links">
                    {footer.legal.links.map((link, index) => (
                      <li key={index}>
                        <a href={link.url} className="footer-link">{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="col-sm-6">
                  <h6 className="footer-heading">{footer.social.title}</h6>
                  <div className="social-links mb-3">
                    {footer.social.links.map((social, index) => (
                      <a 
                        key={index}
                        className="social-link" 
                        href={social.url} 
                        aria-label={social.platform}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <i className={`bi bi-${social.icon}`}></i>
                      </a>
                    ))}
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
                {footer.copyright.replace('{year}', year)}
              </div>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="footer-meta">
                <span className="meta-item">
                  <i className="bi bi-heart-fill text-danger me-1"></i>
                  {footer.tagline}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}