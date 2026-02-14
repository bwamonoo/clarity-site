import { BookingApiService } from './BookingApiService'
import { fmtDateISOLocal } from '../../../utils/dateUtils'

export class BookingBusinessService {

  /**
   * Check if two time ranges overlap.
   * @param {string} startA - "HH:MM" start of range A
   * @param {number} durationA - minutes for range A
   * @param {string} startB - "HH:MM" start of range B
   * @param {number} durationB - minutes for range B
   * @returns {boolean}
   */
  static timesOverlap(startA, durationA, startB, durationB) {
    const toMinutes = (hhmm) => {
      const [h, m] = hhmm.split(':').map(Number)
      return h * 60 + m
    }
    const a0 = toMinutes(startA)
    const a1 = a0 + durationA
    const b0 = toMinutes(startB)
    const b1 = b0 + durationB
    return a0 < b1 && b0 < a1
  }

  /**
   * Generate available time slots for a given date, taking into account:
   * - clinic schedule (open hours, slot duration)
   * - existing appointments with their full duration (overlap-aware)
   * - number of active doctors (capacity)
   */
  static async generateTimeSlots(date, schedule, serviceDuration = 30) {
    if (!schedule || !schedule.active) return []

    const dateStr = typeof date === 'string' ? date : fmtDateISOLocal(date)

    // Fetch existing appointments and doctor count in parallel
    const [appointments, doctorCount] = await Promise.all([
      BookingApiService.getAppointments(dateStr),
      BookingApiService.getActiveDoctorCount()
    ])

    const slots = []
    const startMinutes = this.timeToMinutes(schedule.start_time)
    const endMinutes = this.timeToMinutes(schedule.end_time)
    const slotDuration = schedule.slot_duration || 30

    for (let mins = startMinutes; mins + serviceDuration <= endMinutes; mins += slotDuration) {
      const slotTime = this.minutesToTime(mins)

      // Count how many doctors are busy during this slot
      let busyDoctors = 0
      for (const apt of appointments) {
        if (this.timesOverlap(slotTime, serviceDuration, apt.appointment_time, apt.duration)) {
          busyDoctors++
        }
      }

      const spotsLeft = Math.max(0, doctorCount - busyDoctors)

      slots.push({
        start: slotTime,
        label: this.formatTimeLabel(slotTime),
        available: spotsLeft > 0,
        spotsLeft,
        totalSpots: doctorCount
      })
    }

    return slots
  }

  /**
   * Find a free doctor for a given time slot and assign the booking.
   */
  static async submitBooking(bookingData) {
    try {
      const dateStr = typeof bookingData.date === 'string'
        ? bookingData.date
        : fmtDateISOLocal(bookingData.date)

      // Get existing appointments and active doctor IDs
      const [appointments, doctorIds] = await Promise.all([
        BookingApiService.getAppointments(dateStr),
        BookingApiService.getActiveDoctorIds()
      ])

      const serviceDuration = bookingData.service?.duration || 30
      const slotTime = bookingData.slot.start

      // Find the first available doctor (no overlapping appointment)
      let assignedDoctorId = null
      for (const docId of doctorIds) {
        const isBusy = appointments.some(apt =>
          apt.doctor_id === docId &&
          this.timesOverlap(slotTime, serviceDuration, apt.appointment_time, apt.duration)
        )
        if (!isBusy) {
          assignedDoctorId = docId
          break
        }
      }

      if (!assignedDoctorId && doctorIds.length > 0) {
        return {
          success: false,
          message: 'Sorry, this time slot just became fully booked. Please choose another time.'
        }
      }

      const appointmentData = {
        service_id: bookingData.service.id,
        appointment_date: dateStr,
        appointment_time: slotTime,
        duration: serviceDuration,
        patient_name: bookingData.customer.name,
        patient_phone: bookingData.customer.phone,
        patient_email: bookingData.customer.email || null,
        patient_notes: bookingData.customer.notes || null,
        status: 'pending',
        doctor_id: assignedDoctorId
      }

      const result = await BookingApiService.createAppointment(appointmentData)

      return {
        success: true,
        message: 'Appointment booked successfully!',
        bookingId: result?.[0]?.id
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      return {
        success: false,
        message: 'Failed to book appointment. Please try again.'
      }
    }
  }

  static getScheduleForDate = async (date) => {
    try {
      const scheduleData = await BookingApiService.getClinicSchedule()
      const dateObj = typeof date === 'string' ? new Date(date + 'T00:00:00') : date
      const dayOfWeek = dateObj.getDay()
      return scheduleData.find(s => s.weekday === dayOfWeek) || null
    } catch (error) {
      console.error('Error getting schedule:', error)
      return null
    }
  }

  // ─── Utility helpers ───────────────────────────

  static timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 60 + minutes
  }

  static minutesToTime(minutes) {
    const h = Math.floor(minutes / 60).toString().padStart(2, '0')
    const m = (minutes % 60).toString().padStart(2, '0')
    return `${h}:${m}`
  }

  static formatTimeLabel(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 || 12
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
  }
}