// src/components/booking/DateTimeSelection.jsx - UPDATED
import React from 'react'
import { fmtDateISOLocal, generateCalendarDays } from '../../utils/dateUtils'

export default function DateTimeSelection({ 
  selectedService, 
  selectedDate, 
  selectedSlot, 
  schedule, // NEW: Receive schedule as prop
  slots, // NEW: Receive slots as prop
  onDateSelect, 
  onTimeSelect, 
  onBack, 
  onNext,
  loading,
  error 
}) {
  const today = new Date()
  const calendarDays = generateCalendarDays(today, 14)

  return (
    <div className="glass-card rounded-4 p-4 p-md-5">
      <h3 className="font-display mb-4 text-center">Choose Date & Time</h3>
      
      {/* Error Display */}
      {error && (
        <div className="alert alert-warning mb-4">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      {/* Service Summary */}
      {selectedService && (
      <div className="selected-service-summary mb-4 p-3 bg-light rounded-3">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-success bg-opacity-10 rounded-3 p-2">
            <i className={`bi ${selectedService.icon} text-success`}></i>
          </div>
          <div>
            <h6 className="mb-1">{selectedService.name}</h6>
            <p className="small text-muted mb-0">
              {selectedService.duration} mins • ${selectedService.price}
            </p>
          </div>
        </div>
      </div>
    )}

      {/* Date Selection */}
      <div className="mb-4">
        <h6 className="mb-3">Select Date</h6>
        <div className="row g-2">
          {calendarDays.map((date, index) => (
            <div key={index} className="col-6 col-md-3 col-lg-2">
              <div 
                className={`calendar-day d-flex flex-column align-items-center justify-content-center p-3 rounded-3 cursor-pointer ${
                  selectedDate && fmtDateISOLocal(selectedDate) === fmtDateISOLocal(date) ? 'selected' : ''
                }`}
                onClick={() => onDateSelect(date)}
              >
                <small className="text-uppercase">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </small>
                <strong>{date.getDate()}</strong>
                <small>{date.toLocaleDateString('en-US', { month: 'short' })}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && schedule && (
        <div className="mb-4">
          <h6 className="mb-3">Select Time</h6>
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-2">
              {slots.map((slot, index) => (
                <div key={index} className="col-6 col-md-4 col-lg-3">
                  <div 
                    className={`time-slot text-center py-2 px-3 rounded-3 cursor-pointer ${
                      selectedSlot?.start === slot.start ? 'selected' : 
                      !slot.available ? 'unavailable' : ''
                    }`}
                    onClick={() => onTimeSelect(slot)}
                  >
                    {slot.label}
                    {!slot.available && (
                      <div className="small text-muted">{slot.reasonNotAvail}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedDate && !schedule && (
        <div className="alert alert-warning text-center">
          <i className="bi bi-x-circle-fill me-2"></i>
          Clinic is closed on this day
        </div>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button 
          className="btn btn-outline-secondary"
          onClick={onBack}
        >
          Back
        </button>
        <button 
          className="btn btn-primary btn-gradient"
          disabled={!selectedSlot}
          onClick={onNext}
        >
          Continue
        </button>
      </div>
    </div>
  )
}