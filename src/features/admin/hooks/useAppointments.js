import { useState, useEffect } from 'react'
import { appointmentsService } from '../services/appointmentsService'
import { useAdmin } from '../../../contexts/AdminContext'

// In useAppointments hook
export function useAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { setError: setAdminError, setSuccess } = useAdmin()

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await appointmentsService.fetchAppointments()
      setAppointments(data)
    } catch (err) {
      console.error('Error fetching appointments:', err)
      setError(err.message)
      setAdminError('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      await appointmentsService.updateAppointmentStatus(appointmentId, newStatus)
      
      setAppointments(prev => prev.map(apt =>
        apt.id === appointmentId 
          ? { ...apt, status: newStatus, updated_at: new Date().toISOString() }
          : apt
      ))

      setSuccess(`Appointment ${newStatus} successfully`)
      return { success: true }
    } catch (err) {
      console.error('Error updating appointment status:', err)
      setError(err.message)
      setAdminError('Failed to update appointment status')
      return { success: false, error: err.message }
    }
  }

  const bulkUpdateAppointments = async (appointmentIds, newStatus) => {
    try {
      await appointmentsService.bulkUpdateAppointments(appointmentIds, newStatus)

      setAppointments(prev => prev.map(apt =>
        appointmentIds.includes(apt.id)
          ? { ...apt, status: newStatus, updated_at: new Date().toISOString() }
          : apt
      ))

      setSuccess(`Successfully updated ${appointmentIds.length} appointment(s) to ${newStatus}`)
      return { success: true }
    } catch (err) {
      console.error('Error bulk updating appointments:', err)
      setError(err.message)
      setAdminError(`Failed to update ${appointmentIds.length} appointment(s)`)
      return { success: false, error: err.message }
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  return {
    appointments,
    loading,
    error,
    updateAppointmentStatus,
    bulkUpdateAppointments,
    refreshAppointments: fetchAppointments
  }
}