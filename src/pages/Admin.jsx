// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react'
import { useAdmin } from '../hooks/useAdmin'
import AdminHeader from '../components/admin/AdminHeader'
import AppointmentsTab from '../components/admin/AppointmentsTab'
import ServicesTab from '../components/admin/ServicesTab'
import ScheduleTab from '../components/admin/ScheduleTab'
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

  const tabs = [
    { id: 'appointments', name: 'Appointments', icon: 'bi-calendar-check' },
    { id: 'services', name: 'Services', icon: 'bi-eye' },
    { id: 'schedule', name: 'Schedule', icon: 'bi-clock' }
  ]

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary"></div>
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
      
      <AdminHeader activeTab={activeTab} onLogout={handleLogout} />
      
      {/* Rest of your admin component remains the same */}
      <div className="container-fluid mt-3">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show glass-card" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={clearMessages}></button>
          </div>
        )}
        
        {success && (
          <div className="alert alert-success alert-dismissible fade show glass-card" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            {success}
            <button type="button" className="btn-close" onClick={clearMessages}></button>
          </div>
        )}
      </div>

      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar Navigation */}
          <div className="col-md-3 col-lg-2 mb-4">
            <div className="card elegant-card border-0">
              <div className="elegant-header py-3">
                <h6 className="mb-0 text-white">
                  <i className="bi bi-speedometer2 me-2"></i>
                  Admin Panel
                </h6>
              </div>
              <div className="card-body p-3">
                <nav className="nav flex-column">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      className={`nav-link text-start d-flex align-items-center py-3 px-3 mb-2 rounded-3 ${
                        activeTab === tab.id 
                          ? 'btn-gradient-primary text-white' 
                          : 'btn-outline-accent text-dark'
                      }`}
                      onClick={() => handleTabChange(tab.id)}
                    >
                      <i className={`bi ${tab.icon} me-3`}></i>
                      {tab.name}
                    </button>
                  ))}
                  <button
                    className="nav-link text-start d-flex align-items-center py-3 px-3 mb-2 rounded-3 btn-outline-danger text-dark"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-3"></i>
                    Logout
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9 col-lg-10">
            <div className="admin-content">
              {activeTab === 'appointments' && <AppointmentsTab />}
              {activeTab === 'services' && <ServicesTab />}
              {activeTab === 'schedule' && <ScheduleTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}