// src/components/admin/ContactsTab.jsx - NEW
import React, { useState, useMemo, useEffect } from 'react'
import { useContacts } from '../../hooks/useContacts'

export default function ContactsTab() {
  const { 
    contacts, 
    loading, 
    error, 
    updateContactStatus, 
    deleteContact, 
    refreshContacts 
  } = useContacts()

  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Filter contacts
  const filteredContacts = useMemo(() => {
    let filtered = contacts

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.status === statusFilter)
    }

    // Date filter
    const today = new Date().toISOString().split('T')[0]
    if (dateFilter === 'today') {
      filtered = filtered.filter(contact => contact.created_at.split('T')[0] === today)
    } else if (dateFilter === 'week') {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      filtered = filtered.filter(contact => new Date(contact.created_at) >= weekAgo)
    } else if (dateFilter === 'month') {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      filtered = filtered.filter(contact => new Date(contact.created_at) >= monthAgo)
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(term) ||
        contact.email.toLowerCase().includes(term) ||
        contact.phone?.toLowerCase().includes(term) ||
        contact.message.toLowerCase().includes(term)
      )
    }

    return filtered
  }, [contacts, statusFilter, dateFilter, searchTerm])

  // Status badge component
  const StatusBadge = ({ status }) => {
    const config = {
      unread: { class: 'badge-glass-warning', label: 'Unread', icon: 'bi-envelope' },
      read: { class: 'badge-glass-info', label: 'Read', icon: 'bi-envelope-open' },
      replied: { class: 'badge-glass-success', label: 'Replied', icon: 'bi-reply' },
      archived: { class: 'badge-glass-secondary', label: 'Archived', icon: 'bi-archive' }
    }[status] || { class: 'badge-glass-secondary', label: status, icon: 'bi-question' }

    return (
      <span className={`badge ${config.class} d-inline-flex align-items-center gap-1`}>
        <i className={`bi ${config.icon}`}></i>
        {config.label}
      </span>
    )
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Handle status update
  const handleStatusUpdate = async (contactId, newStatus) => {
    await updateContactStatus(contactId, newStatus)
  }

  // Handle delete
  const handleDelete = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      await deleteContact(contactId)
    }
  }

  // Get status options for dropdown
  const getStatusOptions = (currentStatus) => {
    const allStatuses = ['unread', 'read', 'replied', 'archived']
    return allStatuses.filter(status => status !== currentStatus)
  }

  return (
    <div className="glass-admin-card">
      <div className="glass-card-header">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="glass-card-title">Contact Messages</h5>
            <p className="glass-card-subtitle">
              {filteredContacts.length} message(s) found
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
          <div className="d-flex gap-3">
            <div>
              <label className="form-label-glass small mb-1">Search</label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-transparent border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control form-control-sm elegant-input border-start-0"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="form-label-glass small mb-1">Date Filter</label>
              <select 
                className="form-select-glass form-select-sm"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
            <div>
              <label className="form-label-glass small mb-1">Status Filter</label>
              <select 
                className="form-select-glass form-select-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="d-flex align-items-end">
              <button 
                className="btn btn-glass-icon"
                onClick={refreshContacts}
                disabled={loading}
                title="Refresh"
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card-body">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-accent" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-2">Loading contact messages...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-chat-dots display-4 d-block mb-3" style={{color: 'var(--text-light)'}}></i>
            <h5 className="text-brand">No contact messages found</h5>
            <p>Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="contacts-list">
            {filteredContacts.map(contact => (
              <div key={contact.id} className="glass-admin-card mb-4 border-0">
                <div className="glass-card-body">
                  {/* Header with contact info and status */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <div className="contact-avatar bg-accent bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" 
                             style={{width: '40px', height: '40px'}}>
                          <i className="bi bi-person text-accent"></i>
                        </div>
                        <div>
                          <h6 className="mb-1 text-dark">{contact.name}</h6>
                          <div className="d-flex flex-wrap gap-2">
                            <a href={`mailto:${contact.email}`} className="text-muted small text-decoration-none">
                              <i className="bi bi-envelope me-1"></i>
                              {contact.email}
                            </a>
                            {contact.phone && (
                              <a href={`tel:${contact.phone}`} className="text-muted small text-decoration-none">
                                <i className="bi bi-telephone me-1"></i>
                                {contact.phone}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <StatusBadge status={contact.status} />
                      <div className="text-muted small mt-1">
                        {formatDate(contact.created_at)}
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-3">
                    <label className="form-label-glass small mb-2">Message</label>
                    <div className="message-content p-3 bg-light rounded-3">
                      <p className="mb-0 text-dark" style={{whiteSpace: 'pre-wrap'}}>
                        {contact.message}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2">
                      {/* Status update dropdown */}
                      <div className="dropdown">
                        <button 
                          className="btn btn-glass-admin btn-sm dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bi bi-tag me-1"></i>
                          Update Status
                        </button>
                        <ul className="dropdown-menu">
                          {getStatusOptions(contact.status).map(status => (
                            <li key={status}>
                              <button 
                                className="dropdown-item"
                                onClick={() => handleStatusUpdate(contact.id, status)}
                              >
                                <i className={`bi bi-${ 
                                  status === 'unread' ? 'envelope' : 
                                  status === 'read' ? 'envelope-open' : 
                                  status === 'replied' ? 'reply' : 'archive'
                                } me-2`}></i>
                                Mark as {status}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Quick actions */}
                      <a 
                        href={`mailto:${contact.email}?subject=Re: Your message to Clarity Eye Clinic&body=Dear ${contact.name},%0D%0A%0D%0A`}
                        className="btn btn-glass-success btn-sm"
                      >
                        <i className="bi bi-reply me-1"></i>
                        Reply
                      </a>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-glass-danger btn-sm"
                        onClick={() => handleDelete(contact.id)}
                        title="Delete Message"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}