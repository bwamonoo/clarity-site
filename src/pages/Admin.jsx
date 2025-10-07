// src/pages/Admin.jsx - UPDATED
import React, { useState, useEffect } from 'react'
import { useAdmin } from '../hooks/useAdmin'
import AdminHeader from '../components/admin/AdminHeader'
import DashboardTab from '../components/admin/DashboardTab' // NEW
import AppointmentsTab from '../components/admin/AppointmentsTab'
import ServicesTab from '../components/admin/ServicesTab'
import ScheduleTab from '../components/admin/ScheduleTab'
import ContactsTab from '../components/admin/ContactsTab'
import AdminLogin from '../components/AdminLogin'
import { supabase } from '../lib/supabaseClient'

export default function Admin() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const { 
    activeTab, 
    setActiveTab, 
    error, 
    success, 
    clearMessages 
  } = useAdmin()

  // Check for existing session on component mount
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
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

  // Clear messages when changing tabs
  const handleTabChange = (tab) => {
    clearMessages()
    setActiveTab(tab)
  }

  // UPDATED: Added Dashboard tab as first item
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: 'bi-speedometer2' }, // NEW
    { id: 'appointments', name: 'Appointments', icon: 'bi-calendar-check' },
    { id: 'services', name: 'Services', icon: 'bi-eye' },
    { id: 'schedule', name: 'Schedule', icon: 'bi-clock' },
    { id: 'contacts', name: 'Contacts', icon: 'bi-chat-dots' }
  ]

  if (loading) {
    return (
      <div className="admin-loading-page min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-accent" style={{width: '3rem', height: '3rem'}}></div>
      </div>
    )
  }

  if (!user) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="admin-dashboard min-vh-100">
      {/* Background with gradient and pattern */}
      <div className="admin-background">
        <div className="background-pattern"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="floating-elements">
        <div className="floating-dot dot-1"></div>
        <div className="floating-dot dot-2"></div>
        <div className="floating-dot dot-3"></div>
      </div>
      
      <AdminHeader activeTab={activeTab} onLogout={handleLogout} />
      
      {/* Messages */}
      <div className="container-fluid mt-3 px-4">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            {error && (
              <div className="alert alert-glass-error alert-dismissible fade show" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
                <button type="button" className="btn-close" onClick={clearMessages}></button>
              </div>
            )}
            
            {success && (
              <div className="alert alert-glass-success alert-dismissible fade show" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                {success}
                <button type="button" className="btn-close" onClick={clearMessages}></button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-fluid py-4 px-4">
        <div className="row justify-content-center">
          {/* Sidebar Navigation */}
          <div className="col-md-3 col-lg-2 mb-4" style={{position: 'relative', zIndex: 100}}>
            <div className="glass-sidebar-card">
              <div className="sidebar-header">
                <h6 className="mb-0 text-white">
                  <i className="bi bi-speedometer2 me-2"></i>
                  Admin Panel
                </h6>
              </div>
              <div className="sidebar-body">
                <nav className="nav flex-column">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      className={`sidebar-nav-link text-start d-flex align-items-center ${
                        activeTab === tab.id 
                          ? 'sidebar-nav-active' 
                          : 'sidebar-nav-inactive'
                      }`}
                      onClick={() => handleTabChange(tab.id)}
                      style={{cursor: 'pointer'}}
                    >
                      <i className={`bi ${tab.icon}`}></i>
                      <span>{tab.name}</span>
                    </button>
                  ))}
                  <button
                    className="sidebar-nav-link text-start d-flex align-items-center sidebar-nav-logout"
                    onClick={handleLogout}
                    style={{cursor: 'pointer'}}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9 col-lg-10">
            <div className="admin-content">
              {activeTab === 'dashboard' && <DashboardTab />} {/* NEW */}
              {activeTab === 'appointments' && <AppointmentsTab />}
              {activeTab === 'services' && <ServicesTab />}
              {activeTab === 'schedule' && <ScheduleTab />}
              {activeTab === 'contacts' && <ContactsTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}