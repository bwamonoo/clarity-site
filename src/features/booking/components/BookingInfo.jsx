import React from 'react'

export default function BookingInfo() {
  return (
    <div className="container">
      <div className="booking-info bg-white rounded-3 p-4 mt-5 shadow-sm">
        <div className="d-flex align-items-start gap-3">
          <div className="text-accent fs-5">
            <i className="bi bi-info-circle-fill"></i>
          </div>
          <div>
            <h6 className="mb-1">About Your Appointment</h6>
            <p className="text-muted mb-0 small">
              Booking requests are reviewed by our team and confirmed by phone or email.
              If we cannot confirm the requested slot we will propose the nearest available time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}