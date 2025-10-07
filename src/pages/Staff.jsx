// src/pages/Staff.jsx
import React from 'react'
import StaffCard from '../components/StaffCard'
import { websiteContent } from '../config/content/index'

export default function Staff() {
  const { introduction, members, statistics } = websiteContent.team

  return (
    <div className="staff-page-modern">
      {/* Hero Section - Redesigned */}
      <section className="staff-hero-section position-relative overflow-hidden">
        {/* Background with gradient and pattern */}
        <div className="staff-hero-bg">
          <div className="bg-gradient-layer-1"></div>
          <div className="bg-gradient-layer-2"></div>
          <div className="bg-pattern-premium"></div>
        </div>

        {/* Animated background elements */}
        <div className="hero-animated-elements">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
        </div>

        {/* Floating Icons */}
        <div className="floating-icons-premium">
          <div className="floating-icon-premium icon-1">
            <div className="icon-glow"></div>
            <i className="bi bi-person-heart"></i>
          </div>
          <div className="floating-icon-premium icon-2">
            <div className="icon-glow"></div>
            <i className="bi bi-eyeglasses"></i>
          </div>
          <div className="floating-icon-premium icon-3">
            <div className="icon-glow"></div>
            <i className="bi bi-stethoscope"></i>
          </div>
        </div>

        <div className="container position-relative z-3">
          <div className="row align-items-center min-vh-50 py-4">
            {/* Text Content - Left Side */}
            <div className="col-lg-6 col-md-7">
              <div className="hero-content-premium pe-lg-4">
                <h1 className="hero-title-premium mb-3">
                  <span className="title-line-1 d-block fw-bold">{introduction.title}</span>
                </h1>
                
                <p className="hero-description-premium mb-4">
                  {introduction.description}
                </p>
              </div>
            </div>

            {/* Statistics - Right Side */}
            <div className="col-lg-6 col-md-5">
              <div className="stats-grid-premium row g-3">
                {statistics.map((stat, index) => (
                  <div key={index} className="col-6">
                    <div className="stat-card-premium text-center p-3 position-relative">
                      <div className="stat-value-premium fw-bold mb-1">{stat.value}</div>
                      <div className="stat-label-premium small">{stat.label}</div>
                      <div className="stat-card-border"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="staff-grid-section py-5 position-relative">
        {/* Grid background */}
        <div className="grid-bg-premium"></div>
        
        <div className="container position-relative z-2">
          {/* Premium Divider */}
          <div className="divider-premium mb-5">
            <div className="divider-line"></div>
            <div className="divider-center">
              <i className="bi bi-people-fill"></i>
            </div>
            <div className="divider-line"></div>
          </div>

          {/* Enhanced Staff Grid */}
          <div className="row g-4 justify-content-center">
            {members.map((member) => (
              <div key={member.id} className="col-xl-4 col-lg-6 col-md-8">
                <StaffCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Modals */}
      {members.map((member) => (
        <StaffModal key={member.id} member={member} />
      ))}
    </div>
  )
}

// Staff Modal Component
function StaffModal({ member }) {
  const [imageError, setImageError] = React.useState(false)

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getRandomColor = (name) => {
    const colors = [
      'linear-gradient(135deg, var(--accent), var(--accent-light))',
      'linear-gradient(135deg, var(--brand-500), var(--brand-300))',
      'linear-gradient(135deg, #8b5cf6, #a78bfa)',
      'linear-gradient(135deg, #059669, #10b981)'
    ]
    const index = name.length % colors.length
    return colors[index]
  }

  return (
    <div className="modal fade" id={`staffModal-${member.id}`} tabIndex="-1" aria-labelledby={`staffModalLabel-${member.id}`} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content glass-admin-card border-0">
          <div className="modal-header glass-card-header border-0">
            <h5 className="modal-title text-white" id={`staffModalLabel-${member.id}`}>
              Professional Profile
            </h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body glass-card-body">
            <div className="row">
              {/* Staff Image Column */}
              <div className="col-md-4 text-center">
                <div className="staff-modal-avatar mb-4">
                  <div className="avatar-container position-relative mx-auto">
                    {!imageError ? (
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="staff-avatar-img-modal"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div 
                        className="staff-avatar-fallback-modal d-flex align-items-center justify-content-center"
                        style={{ background: getRandomColor(member.name) }}
                      >
                        <span className="avatar-initials-modal text-white fw-bold">
                          {getInitials(member.name)}
                        </span>
                      </div>
                    )}
                    <div className="avatar-glow-modal"></div>
                  </div>
                </div>
                
                <h4 className="staff-name-modal mb-2">{member.name}</h4>
                <p className="staff-title-modal text-accent mb-3">{member.title}</p>
                
                <div className="staff-meta-info">
                  <div className="meta-item mb-2">
                    <i className="bi bi-award text-accent me-2"></i>
                    <span className="small">{member.specialization}</span>
                  </div>
                  <div className="meta-item mb-2">
                    <i className="bi bi-clock-history text-accent me-2"></i>
                    <span className="small">{member.yearsExperience} years experience</span>
                  </div>
                </div>
              </div>

              {/* Staff Details Column */}
              <div className="col-md-8">
                <div className="staff-details-content">
                  {/* Bio */}
                  <div className="detail-section mb-4">
                    <h6 className="section-title mb-3">
                      <i className="bi bi-person-badge text-accent me-2"></i>
                      About
                    </h6>
                    <p className="staff-bio-modal text-muted">{member.bio}</p>
                  </div>

                  {/* Education */}
                  <div className="detail-section mb-4">
                    <h6 className="section-title mb-3">
                      <i className="bi bi-mortarboard text-accent me-2"></i>
                      Education & Training
                    </h6>
                    <ul className="list-unstyled">
                      {member.education.map((edu, index) => (
                        <li key={index} className="education-item mb-2">
                          <i className="bi bi-check-circle text-success me-2 small"></i>
                          <span className="small">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specialties */}
                  <div className="detail-section mb-4">
                    <h6 className="section-title mb-3">
                      <i className="bi bi-stars text-accent me-2"></i>
                      Specialties
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                      {member.specialties.map((specialty, index) => (
                        <span key={index} className="specialty-tag">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="detail-section">
                    <h6 className="section-title mb-3">
                      <i className="bi bi-translate text-accent me-2"></i>
                      Languages
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                      {member.languages.map((language, index) => (
                        <span key={index} className="language-tag-modal">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer glass-card-header border-0">
            <button type="button" className="btn btn-glass-admin" data-bs-dismiss="modal">
              Close
            </button>
            <a href="/appointments" className="btn elegant-btn">
              <i className="bi bi-calendar-plus me-2"></i>
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}