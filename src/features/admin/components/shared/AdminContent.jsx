import React from 'react'
import { useAdmin } from '../../../../contexts/AdminContext'

export default function AdminContent({ children }) {
  const { error, success, clearMessages } = useAdmin()

  return (
    <>
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
      {children}
    </>
  )
}