import React from 'react'
import { useAdmin } from '../../../../contexts/AdminContext'

export default function AdminHeader({ onLogout }) {
  const { activeTab } = useAdmin()

  const getTabTitle = (tab) => {
    switch(tab) {
      case 'dashboard': return 'Dashboard Overview'
      case 'appointments': return 'Appointment Management'
      case 'services': return 'Service Management'
      case 'schedule': return 'Clinic Schedule'
      case 'contacts': return 'Contact Messages'
      default: return 'Admin Dashboard'
    }
  }

  return (
    <header className="admin-header-glass">
      <div className="container-fluid py-3 px-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-flex align-items-center">
              <div className="admin-header-logo me-3">
                <i className="bi bi-speedometer2"></i>
              </div>
              <div>
                <h1 className="admin-header-title">Clarity Eye Clinic</h1>
                <p className="admin-header-subtitle">{getTabTitle(activeTab)}</p>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="d-flex align-items-center gap-3">
              <div className="text-end d-none d-md-block">
                <div className="admin-user-name fw-semibold">Admin User</div>
                <small className="admin-user-info text-muted">Last login: Today</small>
              </div>
              <div className="dropdown">
                <button 
                  className="btn btn-glass-admin dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle fs-5"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end glass-dropdown">
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