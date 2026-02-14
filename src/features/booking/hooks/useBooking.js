import { useState, useEffect } from 'react'
import { BookingApiService, BookingBusinessService } from '../services'

export const useBooking = () => {
  const [services, setServices] = useState([])

  useEffect(() => {
    const loadServices = async () => {
      try {
        const servicesData = await BookingApiService.getServices()
        setServices(servicesData)
      } catch (err) {
        console.error('Error loading services:', err)
      }
    }

    loadServices()
  }, [])

  const generateTimeSlots = async (date, schedule, serviceDuration = 30) => {
    return await BookingBusinessService.generateTimeSlots(date, schedule, serviceDuration)
  }

  const submitBooking = async (bookingData) => {
    return await BookingBusinessService.submitBooking(bookingData)
  }

  const getScheduleForDate = BookingBusinessService.getScheduleForDate

  return {
    services,
    generateTimeSlots,
    submitBooking,
    getScheduleForDate
  }
}