// src/services/booking/BookingApiService.js
import { supabase } from '../../../lib/supabaseClient'

export class BookingApiService {
  // Pure API calls only - no business logic
  static async getServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('name')
    
    if (error) throw error
    return data
  }

  static async getSchedule(weekday) {
    const { data, error } = await supabase
      .from('clinic_schedule')
      .select('*')
      .eq('weekday', weekday)
      .eq('active', true)
      .single()
    
    if (error) return null
    return data
  }

  static async getAppointments(date) {
    const { data, error } = await supabase
      .from('appointments')
      .select('appointment_time, duration')
      .eq('appointment_date', date.toISOString().split('T')[0])
      .eq('status', 'confirmed')
    
    if (error) throw error
    return data
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