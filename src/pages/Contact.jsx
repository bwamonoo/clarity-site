import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('saving')
    const { name, email, phone, message } = form
    if (!name || !email || !message) {
      setStatus('Please fill name, email and message.')
      return
    }
    const { error } = await supabase.from('contacts').insert([{ name, email, phone, message }])
    if (error) {
      console.error(error)
      setStatus('There was an error saving your message. Try again.')
    } else {
      setStatus('Thanks — we received your message!')
      setForm({ name: '', email: '', phone: '', message: '' })
    }
  }

  return (
    <div className="contact-page-modern">
      {/* Background Elements */}
      <div className="contact-background">
        <div className="background-pattern"></div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-dot dot-1"></div>
        <div className="floating-dot dot-2"></div>
        <div className="floating-dot dot-3"></div>
      </div>

      <div className="container position-relative z-3">
        <div className="row justify-content-center min-vh-50 align-items-center py-5">
          <div className="col-lg-8 col-xl-6">
            {/* Glass Contact Card */}
            <div className="glass-contact-card">
              {/* Header */}
              <div className="contact-header text-center mb-4">
                <div className="contact-logo mb-4">
                  <div className="contact-logo-icon">
                    <i className="bi bi-chat-dots"></i>
                  </div>
                </div>
                <h1 className="contact-title">Get In Touch</h1>
                <p className="contact-subtitle text-muted">
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
                <div className="contact-divider"></div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-group-glass">
                      <label className="form-label-glass">Full Name</label>
                      <div className="input-group-glass">
                        <i className="bi bi-person input-icon"></i>
                        <input
                          type="text"
                          className="form-input-glass"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group-glass">
                      <label className="form-label-glass">Email Address</label>
                      <div className="input-group-glass">
                        <i className="bi bi-envelope input-icon"></i>
                        <input
                          type="email"
                          className="form-input-glass"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group-glass">
                      <label className="form-label-glass">Phone Number</label>
                      <div className="input-group-glass">
                        <i className="bi bi-telephone input-icon"></i>
                        <input
                          type="tel"
                          className="form-input-glass"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group-glass">
                      <label className="form-label-glass">Your Message</label>
                      <div className="input-group-glass">
                        <i className="bi bi-pencil input-icon"></i>
                        <textarea
                          className="form-input-glass"
                          name="message"
                          rows="5"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help you..."
                          style={{ resize: 'none', minHeight: '120px' }}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Status Message */}
                  {status && (
                    <div className="col-12">
                      <div className={`alert-glass-${status.includes('error') || status.includes('Please fill') ? 'error' : 'success'}`}>
                        <div className="d-flex align-items-center">
                          <i className={`bi bi-${status.includes('error') || status.includes('Please fill') ? 'exclamation-triangle' : 'check-circle'} me-2`}></i>
                          {status}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="col-12">
                    <button 
                      className="btn-login-glass w-100" 
                      type="submit"
                      disabled={status === 'saving'}
                    >
                      {status === 'saving' ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send me-2"></i>
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Alternative Contact Methods */}
              <div className="contact-alternative mt-5 pt-4 border-top">
                <h5 className="text-center mb-4 text-muted">Other Ways to Reach Us</h5>
                <div className="row g-4">
                  <div className="col-md-4 text-center">
                    <div className="contact-method">
                      <div className="contact-method-icon mb-3">
                        <i className="bi bi-telephone-fill"></i>
                      </div>
                      <h6 className="contact-method-title">Call Us</h6>
                      <p className="contact-method-info mb-1">
                        <a href="tel:+1234567890" className="text-decoration-none">(123) 456-7890</a>
                      </p>
                      <p className="contact-method-info mb-0">
                        <a href="tel:+0987654321" className="text-decoration-none">(098) 765-4321</a>
                      </p>
                      <small className="text-muted">Mon-Fri, 8AM-6PM</small>
                    </div>
                  </div>

                  <div className="col-md-4 text-center">
                    <div className="contact-method">
                      <div className="contact-method-icon mb-3">
                        <i className="bi bi-envelope-fill"></i>
                      </div>
                      <h6 className="contact-method-title">Email Us</h6>
                      <p className="contact-method-info mb-1">
                        <a href="mailto:info@clinic.com" className="text-decoration-none">info@clinic.com</a>
                      </p>
                      <p className="contact-method-info mb-0">
                        <a href="mailto:support@clinic.com" className="text-decoration-none">support@clinic.com</a>
                      </p>
                      <small className="text-muted">24/7 Support</small>
                    </div>
                  </div>

                  <div className="col-md-4 text-center">
                    <div className="contact-method">
                      <div className="contact-method-icon mb-3">
                        <i className="bi bi-geo-alt-fill"></i>
                      </div>
                      <h6 className="contact-method-title">Visit Us</h6>
                      <p className="contact-method-info mb-1">123 Health Street</p>
                      <p className="contact-method-info mb-0">Medical District, City 12345</p>
                      <small className="text-muted">Free Parking Available</small>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="emergency-contact mt-4 p-3 rounded text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
                    <strong className="text-warning">Emergency?</strong>
                  </div>
                  <p className="mb-1 small text-muted">
                    For urgent medical concerns, call our emergency line:
                  </p>
                  <a href="tel:+911" className="btn btn-sm btn-outline-danger mt-1">
                    <i className="bi bi-phone me-1"></i>
                    Call 911 for Emergencies
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}