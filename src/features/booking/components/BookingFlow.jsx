import React from 'react'
import { useBookingContext } from '../../../contexts/BookingContext'
import ProgressStepper from './ProgressStepper'
import ServiceSelection from './ServiceSelection'
import DateTimeSelection from './DateTimeSelection'
import CustomerDetails from './CustomerDetails'
import Confirmation from './Confirmation'

export default function BookingFlow() {
  const { state } = useBookingContext()
  
  return (
    <>
      <ProgressStepper currentStep={state.currentStep} />
      
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {state.currentStep === 1 && <ServiceSelection />}
          {state.currentStep === 2 && <DateTimeSelection />}
          {state.currentStep === 3 && <CustomerDetails />}
          {state.currentStep === 4 && <Confirmation />}
        </div>
      </div>
    </>
  )
}