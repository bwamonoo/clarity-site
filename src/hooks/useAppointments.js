// src/hooks/useAppointments.js - UPDATED WITH BULK ACTIONS
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch appointments from Supabase
  const fetchAppointments = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: supabaseError } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true })

      if (supabaseError) throw supabaseError

      setAppointments(data || [])
    } catch (err) {
      console.error('Error fetching appointments:', err)
      setError('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  // Update appointment status
  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      setError(null)

      const { error: supabaseError } = await supabase
        .from('appointments')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', appointmentId)

      if (supabaseError) throw supabaseError

      // Update local state
      setAppointments(prev => prev.map(apt =>
        apt.id === appointmentId 
          ? { ...apt, status: newStatus, updated_at: new Date().toISOString() }
          : apt
      ))

      return { success: true }
    } catch (err) {
      console.error('Error updating appointment status:', err)
      setError('Failed to update appointment status')
      return { success: false, error: err.message }
    }
  }

  // NEW: Bulk update appointments
  const bulkUpdateAppointments = async (appointmentIds, newStatus) => {
    try {
      setError(null)
      
      const { error: supabaseError } = await supabase
        .from('appointments')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .in('id', appointmentIds)

      if (supabaseError) throw supabaseError

      // Update local state
      setAppointments(prev => prev.map(apt =>
        appointmentIds.includes(apt.id)
          ? { ...apt, status: newStatus, updated_at: new Date().toISOString() }
          : apt
      ))

      return { 
        success: true, 
        message: `Successfully updated ${appointmentIds.length} appointment(s) to ${newStatus}` 
      }
    } catch (err) {
      console.error('Error bulk updating appointments:', err)
      setError(`Failed to update ${appointmentIds.length} appointment(s)`)
      return { success: false, error: err.message }
    }
  }

  // Refresh appointments
  const refreshAppointments = () => {
    fetchAppointments()
  }

  // Initial fetch
  useEffect(() => {
    fetchAppointments()
  }, [])

  return {
    appointments,
    loading,
    error,
    updateAppointmentStatus,
    bulkUpdateAppointments, // NEW: Export bulk update function
    refreshAppointments
  }
}