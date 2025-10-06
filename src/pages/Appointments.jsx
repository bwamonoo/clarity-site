// src/pages/Appointments.jsx - UPDATED
import React, { useState } from 'react'
import { useBooking } from '../hooks/useBooking'
import { fmtDateISOLocal, generateCalendarDays, formatAppointmentTime } from '../utils/dateUtils'

// Import components
import ProgressStepper from '../components/booking/ProgressStepper'
import ServiceSelection from '../components/booking/ServiceSelection'
import DateTimeSelection from '../components/booking/DateTimeSelection'
import CustomerDetails from '../components/booking/CustomerDetails'
import Confirmation from '../components/booking/Confirmation'

export default function Appointments() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [schedule, setSchedule] = useState(null) // NEW: Store schedule in parent
  const [slots, setSlots] = useState([]) // NEW: Store slots in parent
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  })
  const [bookingResult, setBookingResult] = useState(null)

  const {
    services,
    loading,
    error,
    generateTimeSlots,
    submitBooking,
    getScheduleForDate
  } = useBooking()

  // Reset the entire booking process
  const resetBooking = () => {
    setCurrentStep(1)
    setSelectedService(null)
    setSelectedDate(null)
    setSelectedSlot(null)
    setSchedule(null)
    setSlots([])
    setCustomerInfo({ name: '', phone: '', email: '', notes: '' })
    setBookingResult(null)
  }

  // Handle service selection
  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setCurrentStep(2)
  }

  // Handle date selection - UPDATED
  const handleDateSelect = async (date) => {
    setSelectedDate(date)
    setSelectedSlot(null)
    setSlots([]) // Clear previous slots
    
    const scheduleData = await getScheduleForDate(date)
    setSchedule(scheduleData)
    
    if (scheduleData) {
      const timeSlots = await generateTimeSlots(date, scheduleData)
      setSlots(timeSlots) // Store slots in parent state
    }
  }

  // Handle time slot selection
  const handleTimeSelect = (slot) => {
    if (!slot.available) return
    setSelectedSlot(slot)
  }

  // Handle form submission
  const handleSubmitBooking = async (e) => {
    e.preventDefault()
    
    const bookingData = {
      service: selectedService,
      date: selectedDate,
      slot: selectedSlot,
      customer: customerInfo
    }

    const result = await submitBooking(bookingData)
    setBookingResult(result)
    
    if (result.success) {
      setCurrentStep(4)
    }
  }

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        {/* Progress Stepper */}
        <ProgressStepper currentStep={currentStep} />
        
        {/* Step Content */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {currentStep === 1 && (
              <ServiceSelection
                services={services}
                selectedService={selectedService}
                onServiceSelect={handleServiceSelect}
                onNext={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 2 && (
              <DateTimeSelection
                selectedService={selectedService}
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                schedule={schedule} // NEW: Pass schedule as prop
                slots={slots} // NEW: Pass slots as prop
                onDateSelect={handleDateSelect}
                onTimeSelect={handleTimeSelect}
                onBack={() => setCurrentStep(1)}
                onNext={() => setCurrentStep(3)}
                loading={loading}
              />
            )}

            {currentStep === 3 && (
              <CustomerDetails
                customerInfo={customerInfo}
                selectedService={selectedService}
                selectedSlot={selectedSlot}
                onCustomerInfoChange={setCustomerInfo}
                onSubmit={handleSubmitBooking}
                onBack={() => setCurrentStep(2)}
                loading={loading}
                error={error}
              />
            )}

            {currentStep === 4 && (
              <Confirmation
                bookingResult={bookingResult}
                customerInfo={customerInfo}
                selectedService={selectedService}
                selectedSlot={selectedSlot}
                onReset={resetBooking}
              />
            )}
          </div>
        </div>

        {/* Info Block */}
        <BookingInfo />
      </div>
    </div>
  )
}

// Simple info component
function BookingInfo() {
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