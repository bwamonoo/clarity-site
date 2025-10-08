import React from 'react'

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="admin-loading-page min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="spinner-border text-accent" style={{width: '3rem', height: '3rem'}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        {message && <p className="mt-3 text-muted">{message}</p>}
      </div>
    </div>
  )
}