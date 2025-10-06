import { supabase } from '../lib/supabaseClient'

export class RealBookingService {
  
  // Get all active services
  static async getServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('name')
    
    if (error) throw error
    return data
  }

  // Get schedule for specific date
  static async getScheduleForDate(date) {
    const weekday = date.getDay() // 0 (Sunday) to 6 (Saturday)
    
    const { data, error } = await supabase
      .from('clinic_schedule')
      .select('*')
      .eq('weekday', weekday)
      .eq('active', true)
      .single()
    
    if (error) return null // No schedule for this day
    return data
  }

  // Generate available time slots
  static async generateTimeSlots(date, schedule, serviceDuration = 30) {
    // Get existing appointments for this date
    const { data: existingAppointments, error } = await supabase
      .from('appointments')
      .select('appointment_time, duration')
      .eq('appointment_date', date.toISOString().split('T')[0])
      .eq('status', 'confirmed')
    
    if (error) throw error

    const slots = []
    const [startHour, startMinute] = schedule.start_time.split(':').map(Number)
    const [endHour, endMinute] = schedule.end_time.split(':').map(Number)
    
    const startTime = new Date(date)
    startTime.setHours(startHour, startMinute, 0, 0)

    const endTime = new Date(date)
    endTime.setHours(endHour, endMinute, 0, 0)

    const currentTime = new Date(startTime)
    const now = new Date()

    // Convert existing appointments to time strings for comparison
    const bookedSlots = existingAppointments?.map(apt => 
      apt.appointment_time.substring(0, 5) // "HH:MM"
    ) || []

    while (currentTime < endTime) {
      const slotEnd = new Date(currentTime.getTime() + serviceDuration * 60000)
      
      if (slotEnd > endTime) break

      const timeString = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })

      const timeKey = currentTime.toTimeString().substring(0, 5) // "HH:MM"
      
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

  // Submit booking to database
  // In the submitBooking method, make sure we're returning the correct ID
  static async submitBooking(bookingData) {
    try {
      const { service, date, slot, customer } = bookingData
      
      // Extract time from slot
      const appointmentTime = new Date(slot.start).toTimeString().substring(0, 8)
      
      const { data, error } = await supabase
        .from('appointments')
        .insert([
          {
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
        ])
        .select() // Make sure we select the inserted row to get the ID
      
      if (error) throw error

      console.log('Appointment created with ID:', data[0]?.id)

      return {
        success: true,
        bookingId: data[0]?.id, // This should be the UUID
        message: 'Your appointment has been booked successfully! You will receive a confirmation message shortly.'
      }
    } catch (error) {
      console.error('Error creating appointment:', error)
      throw error
    }
  }

  // Get appointment by ID (for confirmation page)
  static async getAppointmentById(id) {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        services (*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }
}