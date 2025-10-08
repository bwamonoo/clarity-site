import React from 'react'
import { useBookingContext } from '../../../contexts/BookingContext'
import { fmtDateISOLocal, generateCalendarDays } from '../../../utils/dateUtils'

export default function DateTimeSelection() {
  const { state, actions } = useBookingContext()
  const today = new Date()
  const calendarDays = generateCalendarDays(today, 14)

  return (
    <div className="glass-card rounded-4 p-3 p-md-5">
      <h3 className="font-display mb-4 text-center">Choose Date & Time</h3>
      
      {/* Error Display */}
      {state.error && (
        <div className="alert alert-warning mb-4">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {state.error}
        </div>
      )}

      {/* Service Summary */}
      {state.selectedService && (
        <div className="selected-service-summary mb-4 p-3 bg-light rounded-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-success bg-opacity-10 rounded-3 p-2">
              <i className={`bi ${state.selectedService.icon} text-success`}></i>
            </div>
            <div>
              <h6 className="mb-1">{state.selectedService.name}</h6>
              <p className="small text-muted mb-0">
                {state.selectedService.duration} mins • ${state.selectedService.price}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Date Selection */}
      <div className="mb-4">
        <h6 className="mb-3">Select Date</h6>
        <div className="row g-1 g-sm-2">
          {calendarDays.map((date, index) => (
            <div key={index} className="col-3 col-sm-2 col-md-3 col-lg-2">
              <div 
                className={`calendar-day d-flex flex-column align-items-center justify-content-center p-2 p-sm-3 rounded-3 cursor-pointer ${
                  state.selectedDate && fmtDateISOLocal(state.selectedDate) === fmtDateISOLocal(date) ? 'selected' : ''
                }`}
                onClick={() => actions.setDate(date)}
              >
                <small className="text-uppercase" style={{ fontSize: '0.7rem' }}>
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </small>
                <strong className="my-1" style={{ fontSize: '1rem' }}>{date.getDate()}</strong>
                <small style={{ fontSize: '0.7rem' }}>
                  {date.toLocaleDateString('en-US', { month: 'short' })}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {state.selectedDate && state.schedule && (
        <div className="mb-4">
          <h6 className="mb-3">Select Time</h6>
          {state.loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-1 g-sm-2">
              {state.slots.map((slot, index) => (
                <div key={index} className="col-4 col-sm-3 col-md-4 col-lg-3">
                  <div 
                    className={`time-slot text-center py-2 px-1 px-sm-2 rounded-3 cursor-pointer ${
                      state.selectedSlot?.start === slot.start ? 'selected' : 
                      !slot.available ? 'unavailable' : ''
                    }`}
                    onClick={() => actions.setTimeSlot(slot)}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                      {slot.label}
                    </div>
                    {!slot.available && (
                      <div className="small text-muted" style={{ fontSize: '0.65rem' }}>
                        {slot.reasonNotAvail}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {state.selectedDate && !state.schedule && (
        <div className="alert alert-warning text-center">
          <i className="bi bi-x-circle-fill me-2"></i>
          Clinic is closed on this day
        </div>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button 
          className="btn btn-outline-secondary"
          onClick={() => actions.setStep(1)}
        >
          Back
        </button>
        <button 
          className="btn btn-primary btn-gradient"
          disabled={!state.selectedSlot}
          onClick={() => actions.setStep(3)}
        >
          Continue
        </button>
      </div>
    </div>
  )
}