import { useState } from 'react'
import { useBooking } from './useBooking'

export const useBookingState = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [schedule, setSchedule] = useState(null)
  const [slots, setSlots] = useState([])
  const [customerInfo, setCustomerInfo] = useState({
    name: '', phone: '', email: '', notes: ''
  })
  const [bookingResult, setBookingResult] = useState(null)

  const bookingApi = useBooking()

  // Handle service selection
  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setCurrentStep(2)
  }

  // Handle date selection
  const handleDateSelect = async (date) => {
    setSelectedDate(date)
    setSelectedSlot(null)
    setSlots([])
    
    const scheduleData = await bookingApi.getScheduleForDate(date)
    setSchedule(scheduleData)
    
    if (scheduleData) {
      const timeSlots = await bookingApi.generateTimeSlots(date, scheduleData)
      setSlots(timeSlots)
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

    const result = await bookingApi.submitBooking(bookingData)
    setBookingResult(result)
    
    if (result.success) {
      setCurrentStep(4)
    }
  }

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

  return {
    // State
    currentStep,
    selectedService,
    selectedDate,
    selectedSlot,
    schedule,
    slots,
    customerInfo,
    bookingResult,
    loading: bookingApi.loading,
    error: bookingApi.error,
    services: bookingApi.services,
    
    // Actions
    setCurrentStep,
    handleServiceSelect,
    handleDateSelect,
    handleTimeSelect,
    setCustomerInfo,
    handleSubmitBooking,
    resetBooking,
    onBack: () => setCurrentStep(prev => prev - 1),
    onNext: () => setCurrentStep(prev => prev + 1)
  }
}