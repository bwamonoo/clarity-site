// src/contexts/ToastContext.jsx
import React, { createContext, useContext, useState } from 'react'

const ToastContext = createContext()

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random()
    const toast = { id, message, type, duration }
    
    setToasts(prev => [...prev, toast])
    
    // Auto remove after duration
    setTimeout(() => {
      removeToast(id)
    }, duration)
    
    return id
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const clearToasts = () => {
    setToasts([])
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

// Toast Container Component
function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
      {toasts.map(toast => (
        <Toast 
          key={toast.id} 
          toast={toast} 
          onClose={() => removeToast(toast.id)} 
        />
      ))}
    </div>
  )
}

// Individual Toast Component
function Toast({ toast, onClose }) {
  const getToastConfig = (type) => {
    const config = {
      success: {
        icon: 'bi-check-circle-fill',
        bgClass: 'toast-success',
        title: 'Success'
      },
      error: {
        icon: 'bi-exclamation-triangle-fill',
        bgClass: 'toast-error',
        title: 'Error'
      },
      warning: {
        icon: 'bi-exclamation-circle-fill',
        bgClass: 'toast-warning',
        title: 'Warning'
      },
      info: {
        icon: 'bi-info-circle-fill',
        bgClass: 'toast-info',
        title: 'Information'
      }
    }
    return config[type] || config.info
  }

  const config = getToastConfig(toast.type)

  return (
    <div className={`toast glass-toast ${config.bgClass} show`} role="alert">
      <div className="toast-header">
        <i className={`bi ${config.icon} me-2`}></i>
        <strong className="me-auto">{config.title}</strong>
        <small className="text-muted">just now</small>
        <button 
          type="button" 
          className="btn-close btn-close-white" 
          onClick={onClose}
        ></button>
      </div>
      <div className="toast-body">
        {toast.message}
      </div>
    </div>
  )
}