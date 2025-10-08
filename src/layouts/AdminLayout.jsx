import React from 'react'
import AdminHeader from '../features/admin/components/shared/AdminHeader'

export default function AdminLayout({ children, onLogout }) {
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
      
      <AdminHeader onLogout={onLogout} />
      {children}
    </div>
  )
}