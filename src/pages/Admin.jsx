import React, { useState, useEffect } from 'react'
import { AdminProvider, useAdmin } from '../contexts/AdminContext'
import { ToastProvider } from '../contexts/ToastContext' // Import ToastProvider
import AdminLayout from '../layouts/AdminLayout'
import { supabase } from '../lib/supabaseClient'
import {
  AdminSidebar,
  AdminContent,
  DashboardTab,
  AppointmentsTab,
  ServicesTab,
  DoctorsTab,
  ScheduleTab,
  ContactsTab,
  AdminLogin,
  LoadingSpinner,
  MobileBreadcrumb
} from '../features/admin'

function AdminContentWrapper({ onLogout }) {
  const { activeTab } = useAdmin()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />
      case 'appointments': return <AppointmentsTab />
      case 'services': return <ServicesTab />
      case 'doctors': return <DoctorsTab />
      case 'schedule': return <ScheduleTab />
      case 'contacts': return <ContactsTab />
      default: return <DashboardTab />
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Close sidebar when a tab is selected
  const handleTabSelect = () => {
    setSidebarOpen(false)
  }

  return (
    <>
      {/* Mobile Breadcrumb */}
      <MobileBreadcrumb onToggleSidebar={toggleSidebar} />

      <div className="container-fluid py-4 px-4">
        <div className="row">
          {/* Sidebar Column */}
          <div className={`col-md-3 col-lg-2 mb-4 ${sidebarOpen ? 'mobile-sidebar-open' : 'd-none d-md-block'}`}
            style={{ position: 'relative', zIndex: 100 }}>
            <AdminSidebar onLogout={onLogout} onTabSelect={handleTabSelect} />
          </div>

          {/* Main Content Column */}
          <div className="col-md-9 col-lg-10">
            <AdminContent>
              {renderActiveTab()}
            </AdminContent>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="mobile-sidebar-overlay d-lg-none"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>
    </>
  )
}

export default function Admin() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = (user) => {
    setUser(user)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) {
    return <LoadingSpinner message="Loading admin panel..." />
  }

  if (!user) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <ToastProvider> {/* Wrap with ToastProvider */}
      <AdminProvider>
        <AdminLayout onLogout={handleLogout}>
          <AdminContentWrapper onLogout={handleLogout} />
        </AdminLayout>
      </AdminProvider>
    </ToastProvider>
  )
}