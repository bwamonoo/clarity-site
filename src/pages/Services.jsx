import React from 'react'
import ServiceCard from '../components/ServiceCard'
// Import from new modular content structure
import { websiteContent } from '../config/content/index'

// Extracted Services Hero Component
function ServicesHero({ services }) {
  return (
    <section className="services-hero-section position-relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="hero-background">
        <div className="background-pattern"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container py-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-10">
            {/* Floating Icons */}
            <div className="floating-icons">
              <div className="floating-icon icon-1">
                <i className="bi bi-eye"></i>
              </div>
              <div className="floating-icon icon-2">
                <i className="bi bi-heart-pulse"></i>
              </div>
            </div>

            <h1 className="display-4 fw-bold text-dark mb-4">
              {services.hero.title.line1}
              <span className="d-block text-accent">{services.hero.title.line2}</span>
            </h1>
            
            <p className="lead text-muted mb-5">
              {services.hero.description}
            </p>

            {/* Stats Grid - FIXED: Use services.hero.stats */}
            <ServicesStats stats={services.hero.stats} />
          </div>
        </div>
      </div>
    </section>
  )
}

// Extracted Services Stats Component
function ServicesStats({ stats }) {
  // Add safety check
  if (!stats || !Array.isArray(stats)) {
    return <div>No stats available</div>;
  }

  return (
    <div className="row g-4 mb-5">
      {stats.map((stat, index) => (
        <div key={index} className="col-6 col-md-3">
          <div className="stat-card-modern text-center p-3">
            <i className={`bi ${stat.icon} stat-icon mb-3`}></i>
            <div className="stat-value fw-bold text-dark">{stat.value}</div>
            <div className="stat-label small text-muted">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Extracted Services Header Component
function ServicesHeader({ services }) {
  return (
    <div className="row justify-content-center text-center mb-5">
      <div className="col-lg-8">
        <h2 className="display-5 fw-bold text-dark mb-3">
          {services.overview.header.title}
        </h2>
        <p className="text-muted lead">
          {services.overview.header.description}
        </p>
      </div>
    </div>
  )
}

// Extracted Services Call-to-Action Component
function ServicesCTA({ clinic, services }) {
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-lg-10">
        <div className="cta-section-modern text-center p-5 rounded-4">
          <h3 className="text-white mb-3">{services.cta.title}</h3>
          <p className="text-white-50 mb-4">
            {services.cta.description}
          </p>
          
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <a href="/appointments" className="btn btn-light btn-lg px-4">
              <i className={`bi ${services.cta.buttons.appointment.icon} me-2`}></i>
              {services.cta.buttons.appointment.text}
            </a>
            <a href={`tel:${clinic.contact.phone.primary}`} className="btn btn-outline-light btn-lg px-4">
              <i className={`bi ${services.cta.buttons.phone.icon} me-2`}></i>
              {services.cta.buttons.phone.text.replace('{phone}', clinic.contact.phone.formatted)}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// Extracted Services Grid Component
function ServicesGrid({ services }) {
  const { clinic } = websiteContent

  return (
    <section className="services-grid-section py-5 bg-white">
      <div className="container">
        {/* Section Header */}
        <ServicesHeader services={services} />
        
        {/* Section Divider */}
        <div className="divider-modern mb-5"></div>

        {/* Services Grid */}
        <div className="row g-4">
          {services.detailed.map((service, index) => (
            <div key={service.id} className="col-lg-4 col-md-6">
              <ServiceCard {...service} delay={index * 100} />
            </div>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <ServicesCTA clinic={clinic} services={services} />
      </div>
    </section>
  )
}

// Main Services Component
export default function Services() {
  const { services } = websiteContent

  return (
    <div className="services-page">
      <ServicesHero services={services} />
      <ServicesGrid services={services} />
    </div>
  )
}