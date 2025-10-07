// src/components/StaffCard.jsx
import React, { useState } from 'react'

export default function StaffCard({ member }) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  // Fallback avatar with initials
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
    <div className="staff-card-modern h-100">
      <div className="card staff-card-modern-inner h-100 border-0 position-relative overflow-hidden">
        {/* Background elements */}
        <div className="staff-card-bg-gradient"></div>
        <div className="staff-card-grid-pattern"></div>

        {/* Floating accent elements */}
        <div className="floating-accent-elements">
          <div className="accent-dot dot-1"></div>
          <div className="accent-dot dot-2"></div>
        </div>

        <div className="card-body position-relative p-4 d-flex flex-column h-100 text-center">
          {/* Staff Avatar */}
          <div className="staff-avatar-modern mb-4 mx-auto">
            <div className="avatar-container position-relative">
              {!imageError ? (
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="staff-avatar-img"
                  onError={handleImageError}
                />
              ) : (
                <div 
                  className="staff-avatar-fallback d-flex align-items-center justify-content-center"
                  style={{ background: getRandomColor(member.name) }}
                >
                  <span className="avatar-initials text-white fw-bold">
                    {getInitials(member.name)}
                  </span>
                </div>
              )}
              <div className="avatar-status-indicator"></div>
              <div className="avatar-glow"></div>
            </div>
          </div>

          {/* Staff Name */}
          <h5 className="staff-name-modern mb-2">{member.name}</h5>

          {/* Staff Title */}
          <p className="staff-title-modern text-accent mb-2">{member.title}</p>

          {/* Specialization */}
          <p className="staff-specialization mb-3">
            <i className="bi bi-award me-2 small"></i>
            {member.specialization}
          </p>

          {/* Bio */}
          <p className="staff-bio-modern text-muted small mb-4 flex-grow-1">
            {member.bio}
          </p>

          {/* Experience */}
          <div className="staff-experience mb-3">
            <div className="experience-badge">
              <i className="bi bi-clock-history me-1"></i>
              {member.yearsExperience}+ years experience
            </div>
          </div>

          {/* Languages */}
          <div className="staff-languages mb-4">
            <div className="languages-label small text-muted mb-2">
              <i className="bi bi-translate me-1"></i>
              Languages
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-1">
              {member.languages.map((language, index) => (
                <span key={index} className="language-tag small">
                  {language}
                </span>
              ))}
            </div>
          </div>

          {/* View Details Button */}
          <div className="mt-auto">
            <button 
              className="btn staff-details-btn w-100"
              data-bs-toggle="modal" 
              data-bs-target={`#staffModal-${member.id}`}
            >
              <span>View Profile</span>
              <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="staff-hover-overlay"></div>
        
        {/* Card corner accents */}
        <div className="card-corner corner-tl"></div>
        <div className="card-corner corner-tr"></div>
      </div>
    </div>
  )
}