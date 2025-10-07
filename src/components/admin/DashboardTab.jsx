// src/components/admin/DashboardTab.jsx
import React from 'react'
import { useDashboard } from '../../hooks/useDashboard'
import { useAppointments } from '../../hooks/useAppointments'

export default function DashboardTab() {
  const { 
    stats, 
    loading, 
    error, 
    recentAppointments, 
    recentContacts,
    refreshDashboard 
  } = useDashboard()

  const { bulkUpdateAppointments, appointments } = useAppointments()

  // Quick action handlers
  const handleQuickAction = async (action) => {
    switch(action) {
      case 'confirm-all-pending':
        try {
          // Get all pending appointment IDs from the appointments hook
          const pendingAppointments = appointments.filter(apt => apt.status === 'pending')
          if (pendingAppointments.length === 0) {
            alert('No pending appointments to confirm')
            return
          }
          
          const pendingIds = pendingAppointments.map(apt => apt.id)
          const result = await bulkUpdateAppointments(pendingIds, 'confirmed')
          
          if (result.success) {
            alert(`Successfully confirmed ${pendingAppointments.length} pending appointment(s)`)
            refreshDashboard() // Refresh the dashboard to update the stats
          } else {
            alert('Failed to confirm appointments')
          }
        } catch (error) {
          console.error('Error confirming appointments:', error)
          alert('Error confirming appointments')
        }
        break
        
      case 'reply-unread':
        // This would navigate to contacts tab in a real implementation
        alert('This would open the contacts tab with unread messages filter')
        break
        
      case 'add-service':
        // This would navigate to services tab in a real implementation
        alert('This would open the services tab with new service form')
        break
        
      default:
        break
    }
  }

  // Format date for recent items
  const formatRecentDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Today'
    if (diffDays === 2) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="glass-admin-card">
        <div className="glass-card-body text-center py-5">
          <div className="spinner-border text-accent" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-2">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {/* Header with Quick Actions */}
      <div className="glass-admin-card mb-4">
        <div className="glass-card-header d-flex justify-content-between align-items-center">
          <div>
            <h5 className="glass-card-title">Dashboard Overview</h5>
            <p className="glass-card-subtitle">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-glass-icon"
              onClick={refreshDashboard}
              title="Refresh Dashboard"
            >
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="row g-4 mb-4">
        {/* Today's Appointments */}
        <div className="col-md-3 col-sm-6">
          <div className="stats-card glass-admin-card text-center">
            <div className="stats-icon bg-primary bg-opacity-10">
              <i className="bi bi-calendar-check text-primary"></i>
            </div>
            <h3 className="stats-number">{stats.todayAppointments}</h3>
            <p className="stats-label">Today's Appointments</p>
            <div className="stats-trend">
              {stats.todayAppointments > 0 ? (
                <span className="text-success">
                  <i className="bi bi-arrow-up-short"></i>
                  Scheduled
                </span>
              ) : (
                <span className="text-muted">No appointments</span>
              )}
            </div>
          </div>
        </div>

        {/* Pending Appointments */}
        <div className="col-md-3 col-sm-6">
          <div className="stats-card glass-admin-card text-center">
            <div className="stats-icon bg-warning bg-opacity-10">
              <i className="bi bi-clock-history text-warning"></i>
            </div>
            <h3 className="stats-number">{stats.pendingAppointments}</h3>
            <p className="stats-label">Pending Confirmation</p>
            <div className="stats-trend">
              {stats.pendingAppointments > 0 ? (
                <span className="text-warning">
                  <i className="bi bi-exclamation-triangle"></i>
                  Needs attention
                </span>
              ) : (
                <span className="text-success">All confirmed</span>
              )}
            </div>
          </div>
        </div>

        {/* Unread Messages */}
        <div className="col-md-3 col-sm-6">
          <div className="stats-card glass-admin-card text-center">
            <div className="stats-icon bg-info bg-opacity-10">
              <i className="bi bi-chat-dots text-info"></i>
            </div>
            <h3 className="stats-number">{stats.unreadContacts}</h3>
            <p className="stats-label">Unread Messages</p>
            <div className="stats-trend">
              {stats.unreadContacts > 0 ? (
                <span className="text-info">
                  <i className="bi bi-envelope"></i>
                  New messages
                </span>
              ) : (
                <span className="text-success">All read</span>
              )}
            </div>
          </div>
        </div>

        {/* Total Services */}
        <div className="col-md-3 col-sm-6">
          <div className="stats-card glass-admin-card text-center">
            <div className="stats-icon bg-success bg-opacity-10">
              <i className="bi bi-eye text-success"></i>
            </div>
            <h3 className="stats-number">{stats.totalServices}</h3>
            <p className="stats-label">Active Services</p>
            <div className="stats-trend">
              <span className="text-muted">
                <i className="bi bi-grid"></i>
                Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-admin-card mb-4">
        <div className="glass-card-header">
          <h6 className="glass-card-title mb-0">
            <i className="bi bi-lightning me-2"></i>
            Quick Actions
          </h6>
        </div>
        <div className="glass-card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <button 
                className="btn btn-glass-admin w-100 text-start p-3 quick-action-btn"
                onClick={() => handleQuickAction('confirm-all-pending')}
                disabled={stats.pendingAppointments === 0}
              >
                <div className="d-flex align-items-center">
                  <div className="quick-action-icon bg-warning bg-opacity-10 me-3">
                    <i className="bi bi-check-circle text-warning"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">Confirm Pending</h6>
                    <small className="text-muted">
                      {stats.pendingAppointments} appointments waiting
                    </small>
                  </div>
                </div>
              </button>
            </div>
            <div className="col-md-4">
              <button 
                className="btn btn-glass-admin w-100 text-start p-3 quick-action-btn"
                onClick={() => handleQuickAction('reply-unread')}
                disabled={stats.unreadContacts === 0}
              >
                <div className="d-flex align-items-center">
                  <div className="quick-action-icon bg-info bg-opacity-10 me-3">
                    <i className="bi bi-reply text-info"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">Reply to Messages</h6>
                    <small className="text-muted">
                      {stats.unreadContacts} unread messages
                    </small>
                  </div>
                </div>
              </button>
            </div>
            <div className="col-md-4">
              <button 
                className="btn btn-glass-admin w-100 text-start p-3 quick-action-btn"
                onClick={() => handleQuickAction('add-service')}
              >
                <div className="d-flex align-items-center">
                  <div className="quick-action-icon bg-success bg-opacity-10 me-3">
                    <i className="bi bi-plus-circle text-success"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">Add New Service</h6>
                    <small className="text-muted">
                      Create new service offering
                    </small>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row g-4">
        {/* Recent Appointments */}
        <div className="col-lg-6">
          <div className="glass-admin-card h-100">
            <div className="glass-card-header d-flex justify-content-between align-items-center">
              <h6 className="glass-card-title mb-0">
                <i className="bi bi-clock-history me-2"></i>
                Recent Appointments
              </h6>
              <span className="badge bg-primary">{recentAppointments.length}</span>
            </div>
            <div className="glass-card-body">
              {recentAppointments.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <i className="bi bi-calendar-x display-6 d-block mb-2"></i>
                  <p>No recent appointments</p>
                </div>
              ) : (
                <div className="recent-list">
                  {recentAppointments.map(appointment => (
                    <div key={appointment.id} className="recent-item d-flex align-items-center py-3 border-bottom">
                      <div className="recent-avatar bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3">
                        <i className="bi bi-person text-primary"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 text-dark">{appointment.patient_name}</h6>
                        <small className="text-muted">
                          {appointment.service_name} • {new Date(appointment.appointment_date).toLocaleDateString()} at {appointment.appointment_time}
                        </small>
                        <div className="mt-1">
                          <small className="text-muted">
                            {formatRecentDate(appointment.created_at)}
                          </small>
                        </div>
                      </div>
                      <div className="text-end">
                        <span className={`badge ${
                          appointment.status === 'confirmed' ? 'bg-success' :
                          appointment.status === 'pending' ? 'bg-warning' :
                          appointment.status === 'completed' ? 'bg-info' : 'bg-secondary'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="col-lg-6">
          <div className="glass-admin-card h-100">
            <div className="glass-card-header d-flex justify-content-between align-items-center">
              <h6 className="glass-card-title mb-0">
                <i className="bi bi-chat-dots me-2"></i>
                Recent Messages
              </h6>
              <span className="badge bg-info">{recentContacts.length}</span>
            </div>
            <div className="glass-card-body">
              {recentContacts.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <i className="bi bi-chat-square-text display-6 d-block mb-2"></i>
                  <p>No recent messages</p>
                </div>
              ) : (
                <div className="recent-list">
                  {recentContacts.map(contact => (
                    <div key={contact.id} className="recent-item d-flex align-items-center py-3 border-bottom">
                      <div className="recent-avatar bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3">
                        <i className="bi bi-person text-info"></i>
                      </div>
                      <div className="flex-grow-1" style={{minWidth: 0}}>
                        <h6 className="mb-1 text-dark text-truncate">{contact.name}</h6>
                        <small className="text-muted text-truncate d-block">
                          {contact.message.length > 60 ? contact.message.substring(0, 60) + '...' : contact.message}
                        </small>
                        <div className="mt-1">
                          <small className="text-muted">
                            {formatRecentDate(contact.created_at)} • {contact.email}
                          </small>
                        </div>
                      </div>
                      <div className="text-end">
                        <span className={`badge ${
                          contact.status === 'unread' ? 'bg-warning' :
                          contact.status === 'read' ? 'bg-info' :
                          contact.status === 'replied' ? 'bg-success' : 'bg-secondary'
                        }`}>
                          {contact.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Clinic Hours & Info */}
      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <div className="glass-admin-card h-100">
            <div className="glass-card-header">
              <h6 className="glass-card-title mb-0">
                <i className="bi bi-clock me-2"></i>
                Today's Schedule
              </h6>
            </div>
            <div className="glass-card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Current Time</span>
                <strong>{new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}</strong>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Clinic Status</span>
                <span className="badge bg-success">Open</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Hours Today</span>
                <strong>9:00 AM - 5:00 PM</strong>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="glass-admin-card h-100">
            <div className="glass-card-header">
              <h6 className="glass-card-title mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Quick Stats
              </h6>
            </div>
            <div className="glass-card-body">
              <div className="row text-center">
                <div className="col-4">
                  <div className="border-end">
                    <div className="text-primary fw-bold fs-5">{stats.todayAppointments}</div>
                    <small className="text-muted">Today</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="border-end">
                    <div className="text-warning fw-bold fs-5">{stats.pendingAppointments}</div>
                    <small className="text-muted">Pending</small>
                  </div>
                </div>
                <div className="col-4">
                  <div>
                    <div className="text-info fw-bold fs-5">{stats.unreadContacts}</div>
                    <small className="text-muted">Unread</small>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-top">
                <small className="text-muted">
                  <i className="bi bi-arrow-up-short text-success me-1"></i>
                  Clinic is operating normally today
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="alert alert-glass-error mt-4">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}
    </div>
  )
}