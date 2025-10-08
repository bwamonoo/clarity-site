import { useState, useEffect } from 'react'
import { BookingApiService, BookingBusinessService } from '../services'

export const useBooking = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true)
        const servicesData = await BookingApiService.getServices()
        setServices(servicesData)
      } catch (err) {
        setError('Failed to load services')
        console.error('Error loading services:', err)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  const generateTimeSlots = async (date, schedule, serviceDuration = 30) => {
    try {
      setLoading(true)
      return await BookingBusinessService.generateTimeSlots(date, schedule, serviceDuration)
    } catch (err) {
      setError('Failed to generate time slots')
      console.error('Error generating slots:', err)
      return []
    } finally {
      setLoading(false)
    }
  }

  const submitBooking = async (bookingData) => {
    try {
      setLoading(true)
      return await BookingBusinessService.submitBooking(bookingData)
    } catch (err) {
      setError('Failed to submit booking: ' + err.message)
      console.error('Error submitting booking:', err)
      return { 
        success: false, 
        message: 'Booking failed. Please try again.' 
      }
    } finally {
      setLoading(false)
    }
  }

  const getScheduleForDate = BookingBusinessService.getScheduleForDate

  return {
    services,
    loading,
    error,
    generateTimeSlots,
    submitBooking,
    getScheduleForDate
  }
}