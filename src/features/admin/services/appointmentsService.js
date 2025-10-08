import { supabase } from '../../../lib/supabaseClient'
// In appointmentsService.js
export const appointmentsService = {
  async fetchAppointments() {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        services (
          name,
          duration
        )
      `)
      .order('appointment_date', { ascending: true })
      .order('appointment_time', { ascending: true })

    if (error) throw error
    
    // Transform the data to include service_name and service_duration
    const transformedData = data.map(appointment => ({
      ...appointment,
      service_name: appointment.services?.name || 'Unknown Service',
      service_duration: appointment.services?.duration || 0
    }))
    
    return transformedData
  },

  // ... rest of your functions remain the same
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