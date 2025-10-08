// Enhanced MobileBreadcrumb.jsx
import React from 'react'
import { useAdmin } from '../../../../contexts/AdminContext'

export default function MobileBreadcrumb({ onToggleSidebar, sidebarOpen }) {
  const { activeTab } = useAdmin()

  const tabConfig = {
    dashboard: { 
      name: 'Dashboard', 
      icon: 'bi-speedometer2',
      color: 'var(--accent)'
    },
    appointments: { 
      name: 'Appointments', 
      icon: 'bi-calendar-check',
      color: 'var(--success)'
    },
    services: { 
      name: 'Services', 
      icon: 'bi-eye',
      color: 'var(--info)'
    },
    schedule: { 
      name: 'Schedule', 
      icon: 'bi-clock',
      color: 'var(--warning)'
    },
    contacts: { 
      name: 'Contacts', 
      icon: 'bi-chat-dots',
      color: 'var(--primary)'
    }
  }

  const currentTab = tabConfig[activeTab] || tabConfig.dashboard

  return (
    <div className="admin-mobile-breadcrumb d-lg-none">
      <div className="breadcrumb-content">
        {/* Menu Button - Shows different icon based on state */}
        <button
          className="breadcrumb-menu-btn"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          <i className={`bi ${sidebarOpen ? 'bi-x' : 'bi-list'}`}></i>
        </button>

        {/* Current Page Info - Hidden when sidebar is open */}
        {!sidebarOpen && (
          <div className="breadcrumb-info">
            <div className="breadcrumb-icon" style={{ color: currentTab.color }}>
              <i className={`bi ${currentTab.icon}`}></i>
            </div>
            <div className="breadcrumb-text">
              <div className="breadcrumb-label">Current Page</div>
              <div className="breadcrumb-title">{currentTab.name}</div>
            </div>
          </div>
        )}

        {/* Show "Menu" title when sidebar is open */}
        {sidebarOpen && (
          <div className="breadcrumb-info">
            <div className="breadcrumb-text">
              <div className="breadcrumb-title">Menu</div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="breadcrumb-actions">
          <button className="breadcrumb-action-btn" onClick={onToggleSidebar}>
            <i className={`bi ${sidebarOpen ? 'bi-grid-fill' : 'bi-grid'}`}></i>
          </button>
        </div>
      </div>
    </div>
  )
}