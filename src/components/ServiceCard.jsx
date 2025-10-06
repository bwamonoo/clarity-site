// src/components/ServiceCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function ServiceCard({ 
  title, 
  body, 
  icon, 
  price, 
  duration, 
  features = [],
  delay = 0 
}) {
  return (
    <div className="service-card-modern h-100">
      <div className="card service-card-modern-inner h-100 border-0">
        {/* Floating background elements */}
        <div className="floating-elements">
          <div className="floating-dot dot-1"></div>
          <div className="floating-dot dot-2"></div>
          <div className="floating-dot dot-3"></div>
        </div>

        <div className="card-body position-relative p-4 d-flex flex-column h-100">
          {/* Price Badge */}
          {price && (
            <div className="price-badge">
              <i className="bi me-1"></i>
              {`GH₵ ${price}`}
            </div>
          )}

          {/* Service Icon */}
          <div className="service-icon-modern mb-4">
            <div className="icon-container-modern">
              <i className={`bi ${icon || 'bi-eye'} service-icon`} aria-hidden="true" />
            </div>
          </div>

          {/* Service Title */}
          <h5 className="card-title service-title-modern mb-3">{title}</h5>

          {/* Service Description */}
          <p className="card-text text-muted mb-4 service-description">{body}</p>

          {/* Duration */}
          {duration && (
            <div className="service-duration mb-4">
              <i className="bi bi-clock me-2"></i>
              <span className="text-muted small">{duration}</span>
            </div>
          )}

          {/* Features List */}
          {features.length > 0 && (
            <ServiceFeatures features={features} />
          )}

          {/* Learn More Button */}
          <div className="mt-auto">
            <Link to="/services" className="btn service-learn-more-btn w-100">
              <span>Learn More</span>
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="hover-overlay"></div>
      </div>
    </div>
  )
}

// Extracted Service Features Component
function ServiceFeatures({ features }) {
  return (
    <ul className="service-features list-unstyled mb-4 flex-grow-1">
      {features.map((feature, index) => (
        <li key={index} className="service-feature-item">
          <i className="bi bi-check-circle-fill me-2 text-accent"></i>
          <span className="small">{feature}</span>
        </li>
      ))}
    </ul>
  )
}