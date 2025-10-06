import React from 'react'
import Hero from '../components/Hero'
import ServiceCard from '../components/ServiceCard'
import { Link } from 'react-router-dom'
// Import from new modular content structure
import { websiteContent } from '../config/content/index'

export default function Home() {
  const { services } = websiteContent

  return (
    <div className="home-page">
      <Hero />
      <ServicesOverview services={services} />
    </div>
  )
}

// Enhanced Services Overview Component
function ServicesOverview({ services }) {
  const overviewServices = [
    {
      title: "Eye Exams",
      body: "Comprehensive eye examinations for all ages, with visual field and OCT screening.",
      icon: "bi-eye",
      features: ["Visual acuity testing", "Retinal photography", "Glaucoma screening"]
    },
    {
      title: "Optical", 
      body: "Prescription glasses, contact lens fitting, and optical advice from our opticians.",
      icon: "bi-patch-check",
      features: ["Custom lens fitting", "Frame styling", "Follow-up care"]
    },
    {
      title: "Surgical Consultations",
      body: "Referrals plus pre- and post-operative care for cataract and refractive procedures.",
      icon: "bi-scissors",
      features: ["Surgical planning", "Lens selection", "Post-op care"]
    }
  ]

  return (
    <section className="services-overview py-5">
      <div className="container-custom-2">
        <div className="text-center mb-5">
          <h2 className="mb-3">{services.overview.title}</h2>
          <p className="text-muted mx-auto max-width-720">
            {services.overview.description}
          </p>
        </div>

        <div className="row g-4">
          {overviewServices.map((service, index) => (
            <div key={index} className="col-md-4">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        <WhyChooseUs services={services} />
      </div>
    </section>
  )
}

// Enhanced Why Choose Us Component
function WhyChooseUs({ services }) {
  return (
    <div className="why-choose-us row align-items-center mt-5 g-4">
      <div className="col-lg-6">
        <h3 className="h4 mb-3">{services.overview.whyChooseUs.title}</h3>
        <p className="text-muted mb-4">
          {services.overview.whyChooseUs.description}
        </p>

        <ul className="features-list list-unstyled">
          {services.overview.whyChooseUs.features.map((feature, index) => (
            <li key={index} className="feature-item d-flex align-items-start mb-3">
              <i className={`bi ${feature.icon} text-accent me-3 fs-4`}></i>
              <div>
                <strong className="feature-title">{feature.title}</strong>
                <div className="feature-description small text-muted">{feature.description}</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="cta-buttons mt-4">
          <Link to="/services" className="btn btn-outline-accent me-3">
            Explore Services
          </Link>
          <Link to="/appointments" className="btn btn-gradient-primary">
            Book Appointment
          </Link>
        </div>
      </div>

      <div className="col-lg-6 d-none d-md-block">
        <ServiceVisualCard />
      </div>
    </div>
  )
}

// Enhanced Service Visual Card Component
function ServiceVisualCard() {
  return (
    <div className="card service-visual-card h-100">
      <div className="card-body d-flex flex-column justify-content-center align-items-center text-center p-4">
        <div className="service-visual-icon bg-accent-light bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
          <i className="bi bi-eyeglasses fs-1 text-accent"></i>
        </div>
        <h5 className="service-visual-title mb-2">Comprehensive Eye Care</h5>
        <p className="service-visual-description text-muted mb-3">
          Diagnostics, medical treatment, surgery and aftercare — under one roof.
        </p>
        <Link to="/about" className="btn btn-outline-accent">
          Learn more
        </Link>
      </div>
    </div>
  )
}