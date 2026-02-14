import { supabase } from '../../../lib/supabaseClient'

export class BookingApiService {
  static async getServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('name')

    if (error) throw error
    return data || []
  }

  static async getClinicSchedule() {
    const { data, error } = await supabase
      .from('clinic_schedule')
      .select('*')
      .order('weekday')

    if (error) throw error
    return data || []
  }

  static async getAppointments(date) {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        appointment_time,
        doctor_id,
        services (
          duration
        )
      `)
      .eq('appointment_date', date)
      .neq('status', 'cancelled')

    if (error) throw error
    return (data || []).map(apt => ({
      appointment_time: apt.appointment_time,
      doctor_id: apt.doctor_id,
      duration: apt.services?.duration || 30
    }))
  }

  static async getActiveDoctorCount() {
    const { count, error } = await supabase
      .from('doctors')
      .select('*', { count: 'exact', head: true })
      .eq('active', true)

    if (error) throw error
    // Fallback to 1 if no doctors table / no doctors — so booking still works
    return count || 1
  }

  static async getActiveDoctorIds() {
    const { data, error } = await supabase
      .from('doctors')
      .select('id')
      .eq('active', true)

    if (error) throw error
    return (data || []).map(d => d.id)
  }

  static async createAppointment(appointmentData) {
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointmentData])
      .select()

    if (error) throw error
    return data
  }
}