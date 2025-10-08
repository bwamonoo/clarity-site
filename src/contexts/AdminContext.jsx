// Updated AdminContext.jsx
import React, { createContext, useContext, useState } from 'react'

const AdminContext = createContext()

export function AdminProvider({ children }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  
  // New state for tab-specific configurations
  const [tabState, setTabState] = useState({
    contacts: {
      initialFilter: 'all' // 'all', 'unread', 'read', 'replied', 'archived'
    },
    services: {
      showForm: false
    }
  })

  const clearMessages = () => {
    setError(null)
    setSuccess(null)
  }

  const setErrorWithClear = (message) => {
    setError(message)
    setTimeout(() => setError(null), 5000)
  }

  const setSuccessWithClear = (message) => {
    setSuccess(message)
    setTimeout(() => setSuccess(null), 5000)
  }

  // Method to navigate to a tab with specific configuration
  const navigateToTab = (tab, config = {}) => {
    setTabState(prev => ({
      ...prev,
      [tab]: { ...prev[tab], ...config }
    }))
    setActiveTab(tab)
  }

  // Method to clear tab state when leaving a tab
  const clearTabState = (tab) => {
    setTabState(prev => ({
      ...prev,
      [tab]: {}
    }))
  }

  const value = {
    activeTab,
    setActiveTab,
    navigateToTab, // New method
    error,
    success,
    tabState, // New state
    clearTabState, // New method
    clearMessages,
    setError: setErrorWithClear,
    setSuccess: setSuccessWithClear
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}