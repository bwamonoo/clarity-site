// src/hooks/useDashboard.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useDashboard() {
  const [stats, setStats] = useState({
    todayAppointments: 0,
    pendingAppointments: 0,
    unreadContacts: 0,
    totalServices: 0
  })
  const [recentAppointments, setRecentAppointments] = useState([])
  const [recentContacts, setRecentContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0]

      // Fetch all data in parallel for better performance
      const [
        todayAppointmentsResponse,
        pendingAppointmentsResponse,
        unreadContactsResponse,
        servicesResponse,
        recentAppointmentsResponse,
        recentContactsResponse
      ] = await Promise.all([
        // Today's appointments (excluding cancelled)
        supabase
          .from('appointments')
          .select('*')
          .eq('appointment_date', today)
          .neq('status', 'cancelled'),

        // Pending appointments
        supabase
          .from('appointments')
          .select('*')
          .eq('status', 'pending'),

        // Unread contacts
        supabase
          .from('contacts')
          .select('*')
          .eq('status', 'unread'),

        // Active services
        supabase
          .from('services')
          .select('*')
          .eq('active', true),

        // Recent appointments (last 5, most recent first)
        supabase
          .from('appointments')
          .select(`
            *,
            services (name)
          `)
          .order('created_at', { ascending: false })
          .limit(5),

        // Recent contacts (last 5, most recent first)
        supabase
          .from('contacts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5)
      ])

      // Check for errors in any of the responses
      const responses = [
        todayAppointmentsResponse,
        pendingAppointmentsResponse,
        unreadContactsResponse,
        servicesResponse,
        recentAppointmentsResponse,
        recentContactsResponse
      ]

      const hasError = responses.some(response => response.error)
      if (hasError) {
        throw new Error('Failed to fetch some dashboard data')
      }

      // Update stats with the fetched data
      setStats({
        todayAppointments: todayAppointmentsResponse.data?.length || 0,
        pendingAppointments: pendingAppointmentsResponse.data?.length || 0,
        unreadContacts: unreadContactsResponse.data?.length || 0,
        totalServices: servicesResponse.data?.length || 0
      })

      // Update recent data
      setRecentAppointments(recentAppointmentsResponse.data || [])
      setRecentContacts(recentContactsResponse.data || [])

    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError('Failed to load dashboard data. Please try refreshing.')
    } finally {
      setLoading(false)
    }
  }

  // Refresh function to manually update dashboard data
  const refreshDashboard = () => {
    fetchDashboardData()
  }

  // Set up real-time subscriptions and initial fetch
  useEffect(() => {
    fetchDashboardData()

    // Set up real-time subscriptions for live updates
    const appointmentsSubscription = supabase
      .channel('appointments-dashboard-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'appointments' 
        }, 
        (payload) => {
          console.log('Appointment change detected:', payload)
          fetchDashboardData()
        }
      )
      .subscribe()

    const contactsSubscription = supabase
      .channel('contacts-dashboard-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'contacts' 
        }, 
        (payload) => {
          console.log('Contact change detected:', payload)
          fetchDashboardData()
        }
      )
      .subscribe()

    const servicesSubscription = supabase
      .channel('services-dashboard-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'services' 
        }, 
        (payload) => {
          console.log('Service change detected:', payload)
          fetchDashboardData()
        }
      )
      .subscribe()

    // Cleanup subscriptions when component unmounts
    return () => {
      appointmentsSubscription.unsubscribe()
      contactsSubscription.unsubscribe()
      servicesSubscription.unsubscribe()
    }
  }, [])

  return {
    stats,
    recentAppointments,
    recentContacts,
    loading,
    error,
    refreshDashboard
  }
}