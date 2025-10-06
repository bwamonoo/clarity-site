// src/components/admin/ServicesTab.jsx
import { useState } from 'react'
import { useServices } from '../../hooks/useServices'

export default function ServicesTab() {
  const { 
    services, 
    loading, 
    error, 
    editingService, 
    setEditingService, 
    saveService, 
    deleteService 
  } = useServices()

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    short_description: '',
    price: '',
    duration: '',
    icon: 'bi-eye',
    category: 'diagnostic',
    active: true
  })

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      short_description: '',
      price: '',
      duration: '',
      icon: 'bi-eye',
      category: 'diagnostic',
      active: true
    })
    setEditingService(null)
    setShowForm(false)
  }

  // Handle edit
  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      description: service.description,
      short_description: service.short_description,
      price: service.price,
      duration: service.duration,
      icon: service.icon,
      category: service.category,
      active: service.active
    })
    setEditingService(service)
    setShowForm(true)
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await saveService({
      ...formData,
      id: editingService?.id,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration)
    })
    
    if (result.success) {
      resetForm()
    }
  }

  // Category options
  const categories = [
    { value: 'diagnostic', label: 'Diagnostic' },
    { value: 'corrective', label: 'Corrective' },
    { value: 'surgical', label: 'Surgical' },
    { value: 'medical', label: 'Medical' },
    { value: 'pediatric', label: 'Pediatric' },
    { value: 'rehabilitative', label: 'Rehabilitative' }
  ]

  // Icon options
  const icons = [
    'bi-eye', 'bi-person', 'bi-scissors', 'bi-droplet', 'bi-heart', 
    'bi-award', 'bi-patch-check', 'bi-thermometer'
  ]

  return (
    <div className="card elegant-card border-0">
      <div className="elegant-header d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title mb-1 text-white">Service Management</h5>
          <p className="text-white-50 mb-0">
            {services.length} service(s) available
          </p>
        </div>
        <button
          className="btn btn-light elegant-btn"
          onClick={() => setShowForm(true)}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Service
        </button>
      </div>

      <div className="card-body">
        {/* Service Form */}
        {showForm && (
          <div className="card mb-4 border-accent glass-card">
            <div className="elegant-header">
              <h6 className="mb-0 text-white">
                <i className={`bi ${editingService ? 'bi-pencil' : 'bi-plus-circle'} me-2`}></i>
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h6>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Service Name *</label>
                    <input
                      type="text"
                      className="form-control elegant-input"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Category</label>
                    <select
                      className="form-select elegant-input"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control elegant-input"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Duration (minutes) *</label>
                    <input
                      type="number"
                      className="form-control elegant-input"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Short Description</label>
                    <input
                      type="text"
                      className="form-control elegant-input"
                      value={formData.short_description}
                      onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                      placeholder="Brief description for cards"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Full Description</label>
                    <textarea
                      className="form-control elegant-input"
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Icon</label>
                    <select
                      className="form-select elegant-input"
                      value={formData.icon}
                      onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    >
                      {icons.map(icon => (
                        <option key={icon} value={icon}>
                          <i className={`bi ${icon} me-2`}></i>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Status</label>
                    <div className="form-check form-switch mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={formData.active}
                        onChange={(e) => setFormData({...formData, active: e.target.checked})}
                      />
                      <label className="form-check-label fw-semibold">
                        {formData.active ? 'Active' : 'Inactive'}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button type="submit" className="btn btn-gradient-primary me-2" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className={`bi ${editingService ? 'bi-check' : 'bi-plus'} me-2`}></i>
                        {editingService ? 'Update Service' : 'Create Service'}
                      </>
                    )}
                  </button>
                  <button type="button" className="btn btn-outline-accent" onClick={resetForm}>
                    <i className="bi bi-x me-2"></i>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Services List */}
        {loading && !showForm ? (
          <div className="text-center py-5">
            <div className="spinner-border text-accent" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-2">Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-eye-slash display-4 d-block mb-3 text-light-custom"></i>
            <h5 className="text-brand">No services found</h5>
            <p>Get started by adding your first service</p>
          </div>
        ) : (
          <div className="row g-4">
            {services.map(service => (
              <div key={service.id} className="col-md-6 col-lg-4">
                <div className={`admin-service-card card h-100 border-0 shadow-sm ${service.active ? 'border-start border-success border-3' : 'border-start border-secondary border-3'}`}>
                  <div className="card-body d-flex flex-column h-100">
                    {/* Header with icon and status */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="service-icon-admin bg-accent bg-opacity-10 rounded-3 p-2">
                        <i className={`bi ${service.icon} text-accent fs-5`}></i>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className={`badge ${service.active ? 'bg-success' : 'bg-secondary'}`}>
                          {service.active ? 'Active' : 'Inactive'}
                        </span>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={service.active}
                            onChange={() => handleEdit({...service, active: !service.active})}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Service Title */}
                    <h6 className="card-title text-brand mb-2">{service.name}</h6>
                    
                    {/* Service Description */}
                    <p className="card-text text-muted small mb-3 flex-grow-1">
                      {service.short_description || service.description}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="service-meta mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-accent">${service.price}</span>
                        <span className="text-muted small">
                          <i className="bi bi-clock me-1"></i>
                          {service.duration} mins
                        </span>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                      <span className="badge bg-light text-dark border small">{service.category}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto">
                      <div className="btn-group w-100">
                        <button
                          className="btn btn-outline-primary btn-sm flex-fill"
                          onClick={() => handleEdit(service)}
                        >
                          <i className="bi bi-pencil me-1"></i>
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(service.id)}
                          title="Delete Service"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
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