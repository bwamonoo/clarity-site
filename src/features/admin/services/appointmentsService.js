import { supabase } from '../../../lib/supabaseClient'

export const appointmentsService = {
  async fetchAppointments() {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: true })
      .order('appointment_time', { ascending: true })

    if (error) throw error
    return data || []
  },

  async updateAppointmentStatus(appointmentId, newStatus) {
    const { error } = await supabase
      .from('appointments')
      .update({ 
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', appointmentId)

    if (error) throw error
  },

  async bulkUpdateAppointments(appointmentIds, newStatus) {
    const { error } = await supabase
      .from('appointments')
      .update({ 
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .in('id', appointmentIds)

    if (error) throw error
  }
}