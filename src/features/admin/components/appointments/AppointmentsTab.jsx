// src/components/admin/AppointmentsTab.jsx - UPDATED WITH BULK ACTIONS
import React, { useState, useMemo } from 'react'
import { useAppointments } from '../../hooks/useAppointments'

export default function AppointmentsTab() {
  const { appointments, loading, error, updateAppointmentStatus, refreshAppointments, bulkUpdateAppointments } = useAppointments()
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [selectedNotes, setSelectedNotes] = useState('')
  const [selectedPatient, setSelectedPatient] = useState('')
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [copySuccess, setCopySuccess] = useState('')
  
  // NEW: Bulk selection state
  const [selectedAppointments, setSelectedAppointments] = useState(new Set())
  const [selectAll, setSelectAll] = useState(false)
  const [bulkActionLoading, setBulkActionLoading] = useState(false)

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

  // NEW: Handle individual selection
  const handleSelectAppointment = (appointmentId) => {
    setSelectedAppointments(prev => {
      const newSet = new Set(prev)
      if (newSet.has(appointmentId)) {
        newSet.delete(appointmentId)
      } else {
        newSet.add(appointmentId)
      }
      return newSet
    })
  }

  // NEW: Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedAppointments(new Set())
    } else {
      const allIds = new Set(filteredAppointments.map(apt => apt.id))
      setSelectedAppointments(allIds)
    }
    setSelectAll(!selectAll)
  }

  // NEW: Clear selection when filters change
  React.useEffect(() => {
    setSelectedAppointments(new Set())
    setSelectAll(false)
  }, [statusFilter, dateFilter])

  // NEW: Handle bulk actions
  const handleBulkAction = async (action) => {
    if (selectedAppointments.size === 0) return
    
    setBulkActionLoading(true)
    try {
      const result = await bulkUpdateAppointments(Array.from(selectedAppointments), action)
      if (result.success) {
        // Clear selection after successful bulk action
        setSelectedAppointments(new Set())
        setSelectAll(false)
      }
    } finally {
      setBulkActionLoading(false)
    }
  }

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

  // Function to view notes with full appointment context
  const handleViewNotes = (appointment) => {
    setSelectedPatient(appointment.patient_name)
    setSelectedNotes(appointment.patient_notes)
    setSelectedAppointment(appointment)
    setShowNotesModal(true)
    setCopySuccess('')
  }

  // Function to close notes modal
  const handleCloseNotes = () => {
    setShowNotesModal(false)
    setSelectedNotes('')
    setSelectedPatient('')
    setSelectedAppointment(null)
    setCopySuccess('')
  }

  // Function to copy notes to clipboard
  const handleCopyNotes = async () => {
    try {
      const notesText = `Patient: ${selectedPatient}\nDate: ${selectedAppointment?.appointment_date}\nTime: ${selectedAppointment?.appointment_time}\nService: ${selectedAppointment?.service_name}\n\nNotes:\n${selectedNotes}`
      
      await navigator.clipboard.writeText(notesText)
      setCopySuccess('Notes copied to clipboard!')
      setTimeout(() => setCopySuccess(''), 3000)
    } catch (err) {
      console.error('Failed to copy notes:', err)
      setCopySuccess('Failed to copy notes')
      setTimeout(() => setCopySuccess(''), 3000)
    }
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
    <>
      <div className="glass-admin-card">
        <div className="glass-card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="glass-card-title">Appointment Management</h5>
              <p className="glass-card-subtitle">
                {filteredAppointments.length} appointment(s) found
                {selectedAppointments.size > 0 && (
                  <span className="text-accent ms-2">
                    • {selectedAppointments.size} selected
                  </span>
                )}
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

          {/* NEW: Bulk Actions Bar */}
          {selectedAppointments.size > 0 && (
            <div className="bulk-actions-bar mt-3 p-3 bg-accent bg-opacity-10 rounded-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <span className="text-accent fw-semibold">
                    <i className="bi bi-check-circle me-2"></i>
                    {selectedAppointments.size} appointment(s) selected
                  </span>
                  
                  {/* Bulk Action Buttons */}
                  <div className="btn-group btn-group-sm">
                    <button
                      className="btn btn-glass-success"
                      onClick={() => handleBulkAction('confirmed')}
                      disabled={bulkActionLoading}
                    >
                      {bulkActionLoading ? (
                        <span className="spinner-border spinner-border-sm me-2"></span>
                      ) : (
                        <i className="bi bi-check-circle me-2"></i>
                      )}
                      Confirm Selected
                    </button>
                    <button
                      className="btn btn-glass-info"
                      onClick={() => handleBulkAction('completed')}
                      disabled={bulkActionLoading}
                    >
                      {bulkActionLoading ? (
                        <span className="spinner-border spinner-border-sm me-2"></span>
                      ) : (
                        <i className="bi bi-check2-all me-2"></i>
                      )}
                      Mark Complete
                    </button>
                    <button
                      className="btn btn-glass-warning"
                      onClick={() => handleBulkAction('pending')}
                      disabled={bulkActionLoading}
                    >
                      {bulkActionLoading ? (
                        <span className="spinner-border spinner-border-sm me-2"></span>
                      ) : (
                        <i className="bi bi-arrow-clockwise me-2"></i>
                      )}
                      Reopen Selected
                    </button>
                    <button
                      className="btn btn-glass-danger"
                      onClick={() => handleBulkAction('cancelled')}
                      disabled={bulkActionLoading}
                    >
                      {bulkActionLoading ? (
                        <span className="spinner-border spinner-border-sm me-2"></span>
                      ) : (
                        <i className="bi bi-x-circle me-2"></i>
                      )}
                      Cancel Selected
                    </button>
                  </div>
                </div>
                
                <button
                  className="btn btn-glass-admin btn-sm"
                  onClick={() => {
                    setSelectedAppointments(new Set())
                    setSelectAll(false)
                  }}
                >
                  <i className="bi bi-x-lg me-1"></i>
                  Clear Selection
                </button>
              </div>
            </div>
          )}
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
                    {/* NEW: Select All Checkbox */}
                    <th style={{width: '40px'}}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          disabled={loading}
                        />
                      </div>
                    </th>
                    <th className="ps-2">Patient</th>
                    <th>Service</th>
                    <th>Date & Time</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th className="text-center pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map(appointment => {
                    const isSelected = selectedAppointments.has(appointment.id)
                    
                    return (
                      <tr 
                        key={appointment.id} 
                        className={`admin-table-row-glass ${isSelected ? 'selected-row' : ''}`}
                      >
                        {/* NEW: Individual Checkbox */}
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectAppointment(appointment.id)}
                              disabled={loading}
                            />
                          </div>
                        </td>
                        <td className="ps-2">
                          <div>
                            <strong className="text-dark">{appointment.patient_name}</strong>
                            {appointment.patient_notes ? (
                              <div 
                                className="text-muted small mt-1 cursor-pointer"
                                onClick={() => handleViewNotes(appointment)}
                                style={{ cursor: 'pointer' }}
                              >
                                <i className="bi bi-chat-text me-1 text-accent"></i>
                                <span className="text-accent text-decoration-underline">
                                  View Notes ({appointment.patient_notes.length > 50 ? 
                                    `${appointment.patient_notes.substring(0, 50)}...` : 
                                    appointment.patient_notes.length} chars)
                                </span>
                              </div>
                            ) : (
                              <div className="text-muted small mt-1">
                                <i className="bi bi-chat me-1"></i>
                                No notes
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
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content glass-admin-card border-0">
              <div className="modal-header glass-card-header border-0">
                <h5 className="modal-title text-white">
                  <i className="bi bi-chat-text me-2"></i>
                  Patient Notes
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white"
                  onClick={handleCloseNotes}
                ></button>
              </div>
              <div className="modal-body">
                {/* Appointment Details */}
                {selectedAppointment && (
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label className="form-label-glass fw-semibold">Patient</label>
                      <p className="text-dark mb-2">{selectedAppointment.patient_name}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-glass fw-semibold">Contact</label>
                      <p className="text-dark mb-2">
                        {selectedAppointment.patient_phone}<br/>
                        {selectedAppointment.patient_email}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-glass fw-semibold">Appointment</label>
                      <p className="text-dark mb-2">
                        {new Date(selectedAppointment.appointment_date).toLocaleDateString()} at {selectedAppointment.appointment_time}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-glass fw-semibold">Service</label>
                      <p className="text-dark mb-2">
                        {selectedAppointment.service_name} ({selectedAppointment.service_duration} mins)
                      </p>
                    </div>
                  </div>
                )}

                {/* Notes Content */}
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="form-label-glass fw-semibold mb-0">Patient Notes</label>
                    <button 
                      className="btn btn-sm btn-glass-admin"
                      onClick={handleCopyNotes}
                      title="Copy notes to clipboard"
                    >
                      <i className="bi bi-clipboard me-1"></i>
                      Copy
                    </button>
                  </div>
                  {copySuccess && (
                    <div className="alert alert-glass-success small py-2 mb-3">
                      <i className="bi bi-check-circle me-1"></i>
                      {copySuccess}
                    </div>
                  )}
                  <div className="notes-content p-4 bg-light rounded-3 border">
                    {selectedNotes ? (
                      <p className="mb-0 text-dark" style={{whiteSpace: 'pre-wrap', lineHeight: '1.6'}}>
                        {selectedNotes}
                      </p>
                    ) : (
                      <p className="mb-0 text-muted fst-italic">
                        No notes provided by the patient.
                      </p>
                    )}
                  </div>
                  {selectedNotes && (
                    <div className="mt-2 text-end">
                      <small className="text-muted">
                        {selectedNotes.length} characters • {selectedNotes.split(/\s+/).length} words
                      </small>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer border-0">
                <button 
                  type="button" 
                  className="btn btn-glass-admin"
                  onClick={handleCloseNotes}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}