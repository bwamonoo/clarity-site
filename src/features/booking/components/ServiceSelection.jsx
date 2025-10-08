import React from 'react'
import { useBookingContext } from '../../../contexts/BookingContext'

export default function ServiceSelection() {
  const { state, actions } = useBookingContext()

  return (
    <div className="glass-card rounded-4 p-4 p-md-5">
      <h3 className="font-display mb-4 text-center">Select Your Service</h3>
      <div className="row g-4">
        {state.services.map((service) => (
          <div key={service.id} className="col-md-6">
            <div 
              className={`service-card h-100 p-4 rounded-3 bg-white shadow-sm cursor-pointer ${
                state.selectedService?.id === service.id ? 'selected' : ''
              }`}
              onClick={() => actions.setService(service)}
            >
              <div className="d-flex align-items-start gap-3">
                <div className="bg-accent-light rounded-3 p-2 flex-shrink-0">
                  <i className={`bi ${service.icon} text-white`}></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-2">{service.name}</h6>
                  <p className="small text-muted mb-2">{service.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="small text-muted">{service.duration} mins</span>
                    <span className="fw-semibold text-accent">{service.price ? ` GH₵ ${service.price}` : ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end mt-4">
        <button 
          className="btn btn-primary btn-gradient"
          disabled={!state.selectedService}
          onClick={() => actions.setStep(2)}
        >
          Continue
        </button>
      </div>
    </div>
  )
}