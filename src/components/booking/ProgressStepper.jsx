// src/components/booking/ProgressStepper.jsx
import React from 'react'

export default function ProgressStepper({ currentStep }) {
  const steps = [
    { number: 1, label: 'Service' },
    { number: 2, label: 'Date & Time' },
    { number: 3, label: 'Details' },
    { number: 4, label: 'Confirm' }
  ]

  return (
    <div className="row justify-content-center mb-5">
      <div className="col-md-8">
        <div className="d-flex align-items-center justify-content-center">
          {steps.map((step, index) => (
            <div key={step.number} className="d-flex align-items-center">
              <div className={`stepper-step ${
                currentStep > step.number ? 'completed' : 
                currentStep === step.number ? 'active' : 'inactive'
              }`}>
                {currentStep > step.number ? <i className="bi bi-check"></i> : step.number}
              </div>
              {index < steps.length - 1 && (
                <div className={`stepper-line ${currentStep > step.number ? 'completed' : ''}`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between mt-3">
          {steps.map(step => (
            <small key={step.number} className="text-center text-muted">{step.label}</small>
          ))}
        </div>
      </div>
    </div>
  )
}