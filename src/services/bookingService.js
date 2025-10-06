// src/services/bookingService.js - UPDATED
import { mockReasons, mockSchedule } from '../data/mockData'

export class BookingService {

  static async getScheduleForDate(date) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const weekday = date.getDay()
    
    // Mock: Clinic is open Monday-Friday (1-5), 9AM-5PM
    if (weekday >= 1 && weekday <= 5) {
      return {
        ...mockSchedule,
        weekday: weekday
      }
    }
    return null
  }

  static async generateTimeSlots(date, schedule, serviceDuration = 30) {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const slots = []
    const [startHour, startMinute] = schedule.start_time.split(':').map(Number)
    const [endHour, endMinute] = schedule.end_time.split(':').map(Number)
    
    // Use service duration instead of fixed slot minutes
    const slotDuration = serviceDuration

    const startTime = new Date(date)
    startTime.setHours(startHour, startMinute, 0, 0)

    const endTime = new Date(date)
    endTime.setHours(endHour, endMinute, 0, 0)

    const currentTime = new Date(startTime)
    const now = new Date()

    while (currentTime < endTime) {
      const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000)
      
      // Ensure slot doesn't go past closing time
      if (slotEnd > endTime) break

      const timeString = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })

      // Check if slot is in the past
      const isPast = currentTime < now
      
      // For demo: Make longer appointments less available
      const availabilityFactor = serviceDuration > 30 ? 0.5 : 0.7
      const isAvailable = !isPast && Math.random() > (1 - availabilityFactor)

      slots.push({
        start: currentTime.toISOString(),
        end: slotEnd.toISOString(),
        label: timeString,
        duration: slotDuration,
        available: isAvailable,
        reasonNotAvail: isPast ? 'Past time' : !isAvailable ? 'Already booked' : null
      })

      // Move to next potential slot (use base 30-minute increments for scheduling)
      currentTime.setMinutes(currentTime.getMinutes() + 30)
    }

    return slots
  }

  static async submitBooking(bookingData) {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simulate successful booking 85% of the time
    const success = Math.random() > 0.15
    
    if (success) {
      return {
        success: true,
        message: 'Your appointment has been booked successfully! You will receive a confirmation email shortly.'
      }
    } else {
      return {
        success: false,
        message: 'This time slot was just booked by another patient. Please choose a different time.'
      }
    }
  }
}