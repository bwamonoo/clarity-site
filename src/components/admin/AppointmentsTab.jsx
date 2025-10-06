// src/components/admin/AppointmentsTab.jsx
import React, { useState, useMemo } from 'react'
import { useAppointments } from '../../hooks/useAppointments'

export default function AppointmentsTab() {
  const { appointments, loading, error, updateAppointmentStatus, refreshAppointments } = useAppointments()
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  // Filter appointments
  const filteredAppointments = useMemo(() => {
    let filtered = appointments

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === statusFilter)
    }

    // Date filter
    const today = new Date().toISOString().split('T')[0]
    if (dateFilter === 'today') {
      filtered = filtered.filter(apt => apt.appointment_date === today)
    } else if (dateFilter === 'upcoming') {
      filtered = filtered.filter(apt => apt.appointment_date >= today)
    } else if (dateFilter === 'past') {
      filtered = filtered.filter(apt => apt.appointment_date < today)
    }

    return filtered
  }, [appointments, statusFilter, dateFilter])

  // Status badge component
  const StatusBadge = ({ status }) => {
    const config = {
      pending: { class: 'badge-glass-warning', label: 'Pending', icon: 'bi-clock' },
      confirmed: { class: 'badge-glass-success', label: 'Confirmed', icon: 'bi-check-circle' },
      completed: { class: 'badge-glass-info', label: 'Completed', icon: 'bi-check2-all' },
      cancelled: { class: 'badge-glass-danger', label: 'Cancelled', icon: 'bi-x-circle' }
    }[status] || { class: 'badge-glass-secondary', label: status, icon: 'bi-question' }

    return (
      <span className={`badge ${config.class} d-inline-flex align-items-center gap-1`}>
        <i className={`bi ${config.icon}`}></i>
        {config.label}
      </span>
    )
  }

  // Action buttons based on status
  const getActionButtons = (appointment) => {
    const buttons = []

    if (appointment.status === 'pending') {
      buttons.push(
        {
          label: 'Confirm',
          variant: 'success',
          action: 'confirmed',
          icon: 'bi-check'
        },
        {
          label: 'Cancel',
          variant: 'danger',
          action: 'cancelled',
          icon: 'bi-x'
        }
      )
    } else if (appointment.status === 'confirmed') {
      buttons.push(
        {
          label: 'Complete',
          variant: 'info',
          action: 'completed',
          icon: 'bi-check2-all'
        },
        {
          label: 'Cancel',
          variant: 'danger',
          action: 'cancelled',
          icon: 'bi-x'
        }
      )
    } else if (['cancelled', 'completed'].includes(appointment.status)) {
      buttons.push({
        label: 'Reopen',
        variant: 'warning',
        action: 'pending',
        icon: 'bi-arrow-clockwise'
      })
    }

    return buttons
  }

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    const result = await updateAppointmentStatus(appointmentId, newStatus)
    if (result.success) {
      // Success is handled in the hook
    }
  }

  return (
    <div className="glass-admin-card">
      <div className="glass-card-header">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="glass-card-title">Appointment Management</h5>
            <p className="glass-card-subtitle">
              {filteredAppointments.length} appointment(s) found
            </p>
          </div>
          <div className="d-flex gap-3">
            <div>
              <label className="form-label-glass small mb-1">Date Filter</label>
              <select 
                className="form-select-glass form-select-sm"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
            <div>
              <label className="form-label-glass small mb-1">Status Filter</label>
              <select 
                className="form-select-glass form-select-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="d-flex align-items-end">
              <button 
                className="btn btn-glass-icon"
                onClick={refreshAppointments}
                disabled={loading}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card-body">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-accent" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-2">Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-calendar-x display-4 d-block mb-3" style={{color: 'var(--text-light)'}}></i>
            <h5 className="text-brand">No appointments found</h5>
            <p>Try adjusting your filters</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle admin-table-glass">
              <thead>
                <tr>
                  <th className="ps-4">Patient</th>
                  <th>Service</th>
                  <th>Date & Time</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th className="text-center pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(appointment => (
                  <tr key={appointment.id} className="admin-table-row-glass">
                    <td className="ps-4">
                      <div>
                        <strong className="text-dark">{appointment.patient_name}</strong>
                        {appointment.patient_notes && (
                          <div className="text-muted small mt-1">
                            <i className="bi bi-chat-text me-1 text-accent"></i>
                            Has notes
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="text-dark">{appointment.service_name}</div>
                        <small className="text-muted">{appointment.service_duration} mins</small>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="text-dark fw-medium">
                          {new Date(appointment.appointment_date).toLocaleDateString()}
                        </div>
                        <small className="text-muted">{appointment.appointment_time}</small>
                      </div>
                    </td>
                    <td>
                      <div className="text-dark">{appointment.patient_phone}</div>
                      <small className="text-muted">{appointment.patient_email}</small>
                    </td>
                    <td>
                      <StatusBadge status={appointment.status} />
                    </td>
                    <td className="text-center pe-4">
                      <div className="btn-group btn-group-sm">
                        {getActionButtons(appointment).map(button => (
                          <button
                            key={button.action}
                            className={`btn btn-glass-action btn-${button.variant}`}
                            onClick={() => handleStatusUpdate(appointment.id, button.action)}
                            disabled={loading}
                            title={button.label}
                          >
                            <i className={`bi ${button.icon}`}></i>
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}