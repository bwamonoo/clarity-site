import { useState, useEffect } from 'react'
import { dashboardService } from '../services/dashboardService'
import { useAdmin } from '../../../contexts/AdminContext'
import { supabase } from '../../../lib/supabaseClient' // ADD THIS IMPORT

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
  const { setError: setAdminError } = useAdmin()

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await dashboardService.fetchDashboardData()
      
      setStats(data.stats)
      setRecentAppointments(data.recentAppointments)
      setRecentContacts(data.recentContacts)

    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError(err.message)
      setAdminError('Failed to load dashboard data. Please try refreshing.')
    } finally {
      setLoading(false)
    }
  }

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