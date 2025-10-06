import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value })

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
      setForm({ name:'', email:'', phone:'', message:'' })
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h2>Contact Us</h2>
        <p>Questions? Use the form below or call our reception.</p>

        <form onSubmit={handleSubmit} className="card p-4">
          <div className="mb-3">
            <label className="form-label">Full name</label>
            <input className="form-control" name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input className="form-control" name="phone" value={form.phone} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" name="message" rows="4" value={form.message} onChange={handleChange}></textarea>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-primary elegant-btn" type="submit">Send message</button>
            <div>{status && <small className="text-muted">{status}</small>}</div>
          </div>
        </form>
      </div>
    </div>
  )
}
