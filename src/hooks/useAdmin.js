import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export const useAdmin = () => {
  const [activeTab, setActiveTab] = useState('appointments')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Clear messages
  const clearMessages = useCallback(() => {
    setError(null)
    setSuccess(null)
  }, [])

  return {
    // State
    activeTab,
    loading,
    error,
    success,
    
    // Actions
    setActiveTab,
    clearMessages
  }
}