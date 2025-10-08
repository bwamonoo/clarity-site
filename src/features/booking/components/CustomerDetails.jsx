import React, { useState } from 'react'
import { useBookingContext } from '../../../contexts/BookingContext'
import { formatAppointmentTime } from '../../../utils/dateUtils'
import { getValidationErrors } from '../../../utils/validation'

export default function CustomerDetails() {
  const { state, actions } = useBookingContext()
  const [validationErrors, setValidationErrors] = useState({})

  const handleInputChange = (field, value) => {
    actions.setCustomerInfo({
      ...state.customerInfo,
      [field]: value
    })
    
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const errors = getValidationErrors(state.customerInfo)
    setValidationErrors(errors)
    
    if (Object.keys(errors).length === 0) {
      actions.submitBooking()
    }
  }

  const appointmentTime = state.selectedSlot ? formatAppointmentTime(state.selectedSlot.start) : null

  return (
    <div className="glass-card rounded-4 p-4 p-md-5">
      <h3 className="font-display mb-4 text-center">Your Details</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Full Name *</label>
            <input 
              type="text" 
              className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
              value={state.customerInfo.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
            {validationErrors.name && (
              <div className="invalid-feedback">{validationErrors.name}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone Number *</label>
            <input 
              type="tel" 
              className={`form-control ${validationErrors.phone ? 'is-invalid' : ''}`}
              value={state.customerInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1234567890"
              required
            />
            {validationErrors.phone && (
              <div className="invalid-feedback">{validationErrors.phone}</div>
            )}
          </div>
          <div className="col-12">
            <label className="form-label">Email (optional)</label>
            <input 
              type="email" 
              className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
              value={state.customerInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
            />
            {validationErrors.email && (
              <div className="invalid-feedback">{validationErrors.email}</div>
            )}
          </div>
          <div className="col-12">
            <label className="form-label">Additional Notes (optional)</label>
            <textarea
              className="form-control"
              rows="3"
              value={state.customerInfo.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any specific symptoms, concerns, or additional information you'd like to share with our team..."
            />
            <div className="form-text">
              Let us know about any specific symptoms, concerns, or questions you have.
            </div>
          </div>
        </div>

        {/* Selected Appointment Summary */}
        {appointmentTime && state.selectedService && (
          <div className="selected-appointment mt-4 p-3 bg-light rounded-3">
            <label className="form-label mb-2">Appointment Summary</label>
            <div className="appointment-details">
              <div className="d-flex align-items-center gap-3 mb-2">
                <i className="bi bi-calendar-event fs-4 text-accent"></i>
                <div>
                  <div className="appointment-date fw-medium">{appointmentTime.date}</div>
                  <div className="appointment-time text-muted">{appointmentTime.time}</div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-eye fs-4 text-accent"></i>
                <div>
                  <div className="service-name fw-medium">{state.selectedService.name}</div>
                  <div className="service-duration text-muted">
                    {state.selectedService.duration} mins • ${state.selectedService.price}
                  </div>
                  <div className="service-description small text-muted">
                    {state.selectedService.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {state.error && (
          <div className="alert alert-warning mt-3">
            {state.error}
          </div>
        )}

        <div className="d-flex justify-content-between mt-4">
          <button 
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => actions.setStep(2)}
          >
            Back
          </button>
          <button 
            type="submit"
            className="btn btn-primary btn-gradient"
            disabled={state.loading}
          >
            {state.loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Processing...
              </>
            ) : (
              'Confirm Appointment'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}