// src/components/admin/AdminHeader.jsx
import React from 'react'

export default function AdminHeader({ activeTab, onLogout }) {
  const getTabTitle = (tab) => {
    switch(tab) {
      case 'appointments': return 'Appointment Management'
      case 'services': return 'Service Management'
      case 'schedule': return 'Clinic Schedule'
      default: return 'Admin Dashboard'
    }
  }

  return (
    <header className="admin-header position-relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="hero-background">
        <div className="background-pattern"></div>
      </div>
      
      <div className="container-fluid py-4 position-relative">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-flex align-items-center">
              <div className="icon-container-modern me-3">
                <i className="bi bi-speedometer2 service-icon"></i>
              </div>
              <div>
                <h1 className="display-6 fw-bold text-dark mb-1">Clarity Eye Clinic</h1>
                <p className="text-muted mb-0">{getTabTitle(activeTab)}</p>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="d-flex align-items-center gap-3">
              <div className="text-end">
                <div className="fw-semibold text-dark">Admin User</div>
                <small className="text-muted">Last login: Today</small>
              </div>
              <div className="dropdown">
                <button 
                  className="btn btn-outline-accent dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end elegant-card border-0">
                  <li><a className="dropdown-item" href="#"><i className="bi bi-person me-2"></i>Profile</a></li>
                  <li><a className="dropdown-item" href="#"><i className="bi bi-gear me-2"></i>Settings</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={onLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}