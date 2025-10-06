import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load all appointments
  const loadAppointments = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          services (*)
        `)
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true })

      if (error) throw error

      const transformedAppointments = data.map(apt => ({
        id: apt.id,
        patient_name: apt.patient_name,
        patient_phone: apt.patient_phone,
        patient_email: apt.patient_email,
        patient_notes: apt.patient_notes,
        service_name: apt.services?.name || 'Unknown Service',
        service_duration: apt.duration,
        appointment_date: apt.appointment_date,
        appointment_time: apt.appointment_time,
        status: apt.status || 'pending',
        created_at: apt.created_at
      }))

      setAppointments(transformedAppointments)
    } catch (err) {
      setError(err.message)
      console.error('Error loading appointments:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Update appointment status
  const updateAppointmentStatus = useCallback(async (appointmentId, newStatus) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('appointments')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', appointmentId)
        .select()

      if (error) throw error

      if (!data || data.length === 0) {
        throw new Error('Appointment not found')
      }

      // Refresh the list
      await loadAppointments()
      
      return { success: true, message: `Appointment ${newStatus} successfully` }
    } catch (err) {
      setError(err.message)
      console.error('Error updating appointment:', err)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }, [loadAppointments])

  // Load appointments on mount
  useEffect(() => {
    loadAppointments()
  }, [loadAppointments])

  return {
    appointments,
    loading,
    error,
    updateAppointmentStatus,
    refreshAppointments: loadAppointments
  }
}