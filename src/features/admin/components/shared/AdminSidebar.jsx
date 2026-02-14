// Updated AdminSidebar.jsx
import React from 'react'
import { useAdmin } from '../../../../contexts/AdminContext'

export default function AdminSidebar({ onLogout, onTabSelect }) {  // Add onTabSelect prop
  const { activeTab, setActiveTab, clearMessages } = useAdmin()

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: 'bi-speedometer2' },
    { id: 'appointments', name: 'Appointments', icon: 'bi-calendar-check' },
    { id: 'services', name: 'Services', icon: 'bi-eye' },
    { id: 'doctors', name: 'Doctors', icon: 'bi-person-badge' },
    { id: 'schedule', name: 'Schedule', icon: 'bi-clock' },
    { id: 'contacts', name: 'Contacts', icon: 'bi-chat-dots' }
  ]

  const handleTabChange = (tab) => {
    clearMessages()
    setActiveTab(tab)

    // Close sidebar on mobile after tab selection
    if (onTabSelect) {
      onTabSelect()
    }
  }

  const handleLogoutClick = () => {
    onLogout()
    // Also close sidebar on mobile if open
    if (onTabSelect) {
      onTabSelect()
    }
  }

  return (
    <div className="glass-sidebar-card">
      <div className="sidebar-header">
        <h6 className="mb-0 text-white">
          <i className="bi bi-speedometer2 me-2"></i>
          Admin Panel
        </h6>
      </div>
      <div className="sidebar-body">
        <nav className="nav flex-column">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`sidebar-nav-link text-start d-flex align-items-center ${activeTab === tab.id
                  ? 'sidebar-nav-active'
                  : 'sidebar-nav-inactive'
                }`}
              onClick={() => handleTabChange(tab.id)}
              style={{ cursor: 'pointer' }}
            >
              <i className={`bi ${tab.icon}`}></i>
              <span>{tab.name}</span>
            </button>
          ))}
          {/* Updated logout button */}
          <button
            className="sidebar-nav-link text-start d-flex align-items-center sidebar-nav-logout"
            onClick={handleLogoutClick}
            style={{ cursor: 'pointer' }}
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  )
}