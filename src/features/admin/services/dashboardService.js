import { supabase } from '../../../lib/supabaseClient'

export const dashboardService = {
  async fetchDashboardData() {
    const today = new Date().toISOString().split('T')[0]

    const [
      todayAppointmentsResponse,
      pendingAppointmentsResponse,
      unreadContactsResponse,
      servicesResponse,
      recentAppointmentsResponse,
      recentContactsResponse
    ] = await Promise.all([
      supabase
        .from('appointments')
        .select('*')
        .eq('appointment_date', today)
        .neq('status', 'cancelled'),

      supabase
        .from('appointments')
        .select('*')
        .eq('status', 'pending'),

      supabase
        .from('contacts')
        .select('*')
        .eq('status', 'unread'),

      supabase
        .from('services')
        .select('*')
        .eq('active', true),

      supabase
        .from('appointments')
        .select('*, services(name)')
        .order('created_at', { ascending: false })
        .limit(5),

      supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
    ])

    // Check for errors
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
      const errorMessages = responses
        .filter(r => r.error)
        .map(r => r.error.message)
        .join(', ')
      throw new Error(`Failed to fetch dashboard data: ${errorMessages}`)
    }

    return {
      stats: {
        todayAppointments: todayAppointmentsResponse.data?.length || 0,
        pendingAppointments: pendingAppointmentsResponse.data?.length || 0,
        unreadContacts: unreadContactsResponse.data?.length || 0,
        totalServices: servicesResponse.data?.length || 0
      },
      recentAppointments: recentAppointmentsResponse.data || [],
      recentContacts: recentContactsResponse.data || []
    }
  }
}