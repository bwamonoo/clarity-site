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
      pending: { class: 'bg-warning text-dark', label: 'Pending', icon: 'bi-clock' },
      confirmed: { class: 'bg-success text-white', label: 'Confirmed', icon: 'bi-check-circle' },
      completed: { class: 'bg-info text-white', label: 'Completed', icon: 'bi-check2-all' },
      cancelled: { class: 'bg-danger text-white', label: 'Cancelled', icon: 'bi-x-circle' }
    }[status] || { class: 'bg-secondary text-white', label: status, icon: 'bi-question' }

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
    <div className="card elegant-card border-0">
      <div className="elegant-header">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title mb-1 text-white">Appointment Management</h5>
            <p className="text-white-50 mb-0">
              {filteredAppointments.length} appointment(s) found
            </p>
          </div>
          <div className="d-flex gap-3">
            <div>
              <label className="form-label small text-white-50 mb-1">Date Filter</label>
              <select 
                className="form-select form-select-sm elegant-input"
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
              <label className="form-label small text-white-50 mb-1">Status Filter</label>
              <select 
                className="form-select form-select-sm elegant-input"
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
                className="btn btn-outline-light btn-sm"
                onClick={refreshAppointments}
                disabled={loading}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-accent" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-2">Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-calendar-x display-4 d-block mb-3 text-light-custom"></i>
            <h5 className="text-brand">No appointments found</h5>
            <p>Try adjusting your filters</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle admin-table">
              <thead className="table-light">
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
                  <tr key={appointment.id} className="admin-table-row">
                    <td className="ps-4">
                      <div>
                        <strong className="text-brand">{appointment.patient_name}</strong>
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
                        <div className="text-dark-custom">{appointment.service_name}</div>
                        <small className="text-muted">{appointment.service_duration} mins</small>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="text-dark-custom fw-medium">
                          {new Date(appointment.appointment_date).toLocaleDateString()}
                        </div>
                        <small className="text-light-custom">{appointment.appointment_time}</small>
                      </div>
                    </td>
                    <td>
                      <div className="text-dark-custom">{appointment.patient_phone}</div>
                      <small className="text-light-custom">{appointment.patient_email}</small>
                    </td>
                    <td>
                      <StatusBadge status={appointment.status} />
                    </td>
                    <td className="text-center pe-4">
                      <div className="btn-group btn-group-sm">
                        {getActionButtons(appointment).map(button => (
                          <button
                            key={button.action}
                            className={`btn btn-outline-${button.variant} btn-sm`}
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