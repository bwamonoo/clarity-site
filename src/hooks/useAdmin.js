// src/hooks/useAdmin.js - UPDATED
import { useState } from 'react'

export function useAdmin() {
  const [activeTab, setActiveTab] = useState('appointments') // Updated default
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

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

  return {
    activeTab,
    setActiveTab,
    error,
    success,
    clearMessages,
    setError: setErrorWithClear,
    setSuccess: setSuccessWithClear
  }
}