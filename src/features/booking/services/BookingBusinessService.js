// src/services/booking/BookingBusinessService.js
import { BookingApiService } from './BookingApiService'

export class BookingBusinessService {
  // Business logic only - no direct API calls
  static async getScheduleForDate(date) {
    const weekday = date.getDay()
    return await BookingApiService.getSchedule(weekday)
  }

  static async generateTimeSlots(date, schedule, serviceDuration = 30) {
    const existingAppointments = await BookingApiService.getAppointments(date)
    
    const slots = []
    const [startHour, startMinute] = schedule.start_time.split(':').map(Number)
    const [endHour, endMinute] = schedule.end_time.split(':').map(Number)
    
    const startTime = new Date(date)
    startTime.setHours(startHour, startMinute, 0, 0)

    const endTime = new Date(date)
    endTime.setHours(endHour, endMinute, 0, 0)

    const currentTime = new Date(startTime)
    const now = new Date()

    const bookedSlots = existingAppointments?.map(apt => 
      apt.appointment_time.substring(0, 5)
    ) || []

    while (currentTime < endTime) {
      const slotEnd = new Date(currentTime.getTime() + serviceDuration * 60000)
      if (slotEnd > endTime) break

      const timeString = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })

      const timeKey = currentTime.toTimeString().substring(0, 5)
      const isPast = currentTime < now
      const isBooked = bookedSlots.includes(timeKey)

      slots.push({
        start: currentTime.toISOString(),
        end: slotEnd.toISOString(),
        label: timeString,
        duration: serviceDuration,
        available: !isPast && !isBooked,
        reasonNotAvail: isPast ? 'Past time' : isBooked ? 'Already booked' : null
      })

      currentTime.setMinutes(currentTime.getMinutes() + schedule.slot_duration)
    }

    return slots
  }

  static async submitBooking(bookingData) {
    const { service, date, slot, customer } = bookingData
    
    const appointmentTime = new Date(slot.start).toTimeString().substring(0, 8)
    
    const appointmentData = {
      patient_name: customer.name,
      patient_phone: customer.phone,
      patient_email: customer.email,
      patient_notes: customer.notes,
      service_id: service.id,
      appointment_date: date.toISOString().split('T')[0],
      appointment_time: appointmentTime,
      duration: service.duration,
      status: 'confirmed'
    }

    const data = await BookingApiService.createAppointment(appointmentData)

    return {
      success: true,
      bookingId: data[0]?.id,
      message: 'Your appointment has been booked successfully! You will receive a confirmation message shortly.'
    }
  }
}