// src/components/AdminLogin.jsx
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      
      onLogin(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page min-vh-100 d-flex align-items-center justify-content-center">
      {/* Background with gradient and pattern */}
      <div className="login-background">
        <div className="background-pattern"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="floating-elements">
        <div className="floating-dot dot-1"></div>
        <div className="floating-dot dot-2"></div>
        <div className="floating-dot dot-3"></div>
      </div>

      <div className="login-container">
        {/* Glassmorphic Card - Reduced height */}
        <div className="glass-login-card">
          {/* Clinic Branding - Compact */}
          <div className="text-center mb-4">
            <div className="login-logo mb-3">
              <div className="brand-logo-modern login-logo-icon">
                <i className="bi bi-eye"></i>
              </div>
            </div>
            <div className="login-brand-text">
              <h1 className="brand-name-modern login-brand-name">CLARITY</h1>
              <p className="brand-subtitle-modern login-brand-subtitle">Eye Clinic</p>
            </div>
            <div className="login-divider"></div>
            <h4 className="login-title">Admin Portal</h4>
            <p className="login-subtitle">Sign in to manage your clinic</p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="alert alert-glass-error mb-3">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}
          
          {/* Login Form */}
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group-glass mb-3">
              <label className="form-label-glass">Email Address</label>
              <div className="input-group-glass">
                <span className="input-icon">
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-input-glass"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group-glass mb-4">
              <label className="form-label-glass">Password</label>
              <div className="input-group-glass">
                <span className="input-icon">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-input-glass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-login-glass w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="bi bi-arrow-right-circle me-2"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="login-security-note text-center mt-3">
            <small className="text-muted">
              <i className="bi bi-shield-check me-1"></i>
              Secure admin access only
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}