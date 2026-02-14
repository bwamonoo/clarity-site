import React from 'react'
import { useBookingContext } from '../../../contexts/BookingContext'
import { formatAppointmentTime } from '../../../utils/dateUtils'

export default function Confirmation() {
  const { state, actions } = useBookingContext()
  const appointmentTime = state.selectedSlot ? formatAppointmentTime(state.selectedSlot.start) : null

  const downloadConfirmation = () => {
    if (!state.bookingResult?.success || !appointmentTime || !state.selectedService) return

    const lines = [
      '═══════════════════════════════════════',
      '       CLARITY EYE CLINIC',
      '     Appointment Confirmation',
      '═══════════════════════════════════════',
      '',
      `Booking ID:    ${state.bookingResult.bookingId || 'N/A'}`,
      `Patient:       ${state.customerInfo.name}`,
      `Phone:         ${state.customerInfo.phone}`,
      state.customerInfo.email ? `Email:         ${state.customerInfo.email}` : null,
      '',
      '───────────────────────────────────────',
      '',
      `Service:       ${state.selectedService.name}`,
      `Date:          ${appointmentTime.date}`,
      `Time:          ${appointmentTime.time}`,
      `Duration:      ${state.selectedService.duration} mins`,
      state.selectedService.price ? `Price:         GH₵ ${state.selectedService.price}` : null,
      '',
      '───────────────────────────────────────',
      '',
      'Please arrive 10 minutes before your',
      'scheduled appointment time.',
      '',
      'For changes or cancellations, contact us:',
      'Phone: +233-XX-XXX-XXXX',
      'Email: info@clarityeye.com',
      '',
      '═══════════════════════════════════════',
    ].filter(Boolean).join('\n')

    const blob = new Blob([lines], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `clarity-appointment-${state.bookingResult.bookingId || 'confirmation'}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!state.bookingResult) {
    return (
      <div className="glass-card rounded-4 p-4 p-md-5 text-center">
        <div className="spinner-border text-primary mb-4" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3>Processing Your Booking...</h3>
      </div>
    )
  }

  if (!state.bookingResult.success) {
    return (
      <div className="glass-card rounded-4 p-4 p-md-5 text-center">
        <div className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
          <i className="bi bi-x-lg fs-1 text-danger"></i>
        </div>
        <h3 className="font-display mb-3">Booking Failed</h3>
        <p className="text-muted mb-4">
          {state.bookingResult.message || 'There was an issue processing your booking. Please try again.'}
        </p>
        <button
          className="btn btn-primary btn-gradient"
          onClick={actions.resetBooking}
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
        {state.bookingResult.message || 'Your appointment has been successfully booked.'}
      </p>

      {/* Appointment Details */}
      {appointmentTime && state.selectedService && (
        <div className="appointment-summary bg-light rounded-3 p-4 mb-4 text-start">
          <h6 className="mb-3">Appointment Details</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <strong>Patient:</strong> {state.customerInfo.name}
            </div>
            <div className="col-md-6">
              <strong>Phone:</strong> {state.customerInfo.phone}
            </div>
            <div className="col-md-6">
              <strong>Date:</strong> {appointmentTime.date}
            </div>
            <div className="col-md-6">
              <strong>Time:</strong> {appointmentTime.time}
            </div>
            <div className="col-md-6">
              <strong>Service:</strong> {state.selectedService.name}
            </div>
            <div className="col-md-6">
              <strong>Duration:</strong> {state.selectedService.duration} mins
            </div>
          </div>
        </div>
      )}

      <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
        <button
          className="btn btn-primary btn-gradient"
          onClick={actions.resetBooking}
        >
          Book Another Appointment
        </button>
        <button className="btn btn-outline-accent" onClick={downloadConfirmation}>
          <i className="bi bi-download me-2"></i>
          Download Confirmation
        </button>
      </div>
    </div>
  )
}