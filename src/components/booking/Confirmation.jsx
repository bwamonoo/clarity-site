// src/components/booking/Confirmation.jsx
import React from 'react'
import { formatAppointmentTime } from '../../utils/dateUtils'

export default function Confirmation({ 
  bookingResult, 
  customerInfo, 
  selectedService, 
  selectedSlot, 
  onReset 
}) {
  const appointmentTime = selectedSlot ? formatAppointmentTime(selectedSlot.start) : null

  if (!bookingResult) {
    return (
      <div className="glass-card rounded-4 p-4 p-md-5 text-center">
        <div className="spinner-border text-primary mb-4" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3>Processing Your Booking...</h3>
      </div>
    )
  }

  if (!bookingResult.success) {
    return (
      <div className="glass-card rounded-4 p-4 p-md-5 text-center">
        <div className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
          <i className="bi bi-x-lg fs-1 text-danger"></i>
        </div>
        <h3 className="font-display mb-3">Booking Failed</h3>
        <p className="text-muted mb-4">
          {bookingResult.message || 'There was an issue processing your booking. Please try again.'}
        </p>
        <button 
          className="btn btn-primary btn-gradient"
          onClick={onReset}
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-4 p-4 p-md-5 text-center">
      <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
        <i className="bi bi-check-lg fs-1 text-success"></i>
      </div>
      <h3 className="font-display mb-3">Appointment Confirmed!</h3>
      <p className="text-muted mb-4">
        {bookingResult.message || 'Your appointment has been successfully booked.'}
      </p>

      {/* Appointment Details */}
      {appointmentTime && selectedService && (
        <div className="appointment-summary bg-light rounded-3 p-4 mb-4 text-start">
          <h6 className="mb-3">Appointment Details</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <strong>Patient:</strong> {customerInfo.name}
            </div>
            <div className="col-md-6">
              <strong>Phone:</strong> {customerInfo.phone}
            </div>
            <div className="col-md-6">
              <strong>Date:</strong> {appointmentTime.date}
            </div>
            <div className="col-md-6">
              <strong>Time:</strong> {appointmentTime.time}
            </div>
            <div className="col-md-6">
              <strong>Service:</strong> {selectedService.name}
            </div>
            <div className="col-md-6">
              <strong>Duration:</strong> {selectedService.duration} mins
            </div>
          </div>
        </div>
      )}

      <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
        <button 
          className="btn btn-primary btn-gradient"
          onClick={onReset}
        >
          Book Another Appointment
        </button>
        <button className="btn btn-outline-accent">
          <i className="bi bi-download me-2"></i>
          Download Confirmation
        </button>
      </div>
    </div>
  )
}