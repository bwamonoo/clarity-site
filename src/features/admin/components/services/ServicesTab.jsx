import { useState, useEffect } from 'react'
import { useServices } from '../../hooks/useServices'
import { useAdmin } from '../../../../contexts/AdminContext' // Import useAdmin

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

  const { tabState, clearTabState } = useAdmin() // Get tab state

  const [showForm, setShowForm] = useState(false)
  const [showCustomCategory, setShowCustomCategory] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    short_description: '',
    price: '',
    duration: '',
    icon: 'bi-eye',
    category: 'diagnostic',
    customCategory: '',
    active: true
  })

  // Use showForm from tabState when component mounts
  useEffect(() => {
    if (tabState.services?.showForm) {
      setShowForm(true)
      // Clear the form state so it doesn't persist on next visit
      clearTabState('services')
    }
  }, [tabState.services?.showForm, clearTabState])

  // Reset form function
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      short_description: '',
      price: '',
      duration: '',
      icon: 'bi-eye',
      category: 'diagnostic',
      customCategory: '',
      active: true
    })
    setShowCustomCategory(false)
    setEditingService(null)
    setShowForm(false)
  }

  // Handle edit
  const handleEdit = (service) => {
    const isCustomCategory = !categories.some(cat => cat.value === service.category)
    
    setFormData({
      name: service.name,
      description: service.description,
      short_description: service.short_description,
      price: service.price || '',
      duration: service.duration,
      icon: service.icon,
      category: isCustomCategory ? 'custom' : service.category,
      customCategory: isCustomCategory ? service.category : '',
      active: service.active
    })
    setShowCustomCategory(isCustomCategory)
    setEditingService(service)
    setShowForm(true)
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Use custom category if selected, otherwise use predefined category
    const finalCategory = showCustomCategory ? formData.customCategory : formData.category
    
    // Handle optional price - convert to null if empty string
    const finalPrice = formData.price === '' ? null : parseFloat(formData.price)
    
    const result = await saveService({
      ...formData,
      id: editingService?.id,
      price: finalPrice,
      duration: parseInt(formData.duration),
      category: finalCategory
    })
    
    if (result.success) {
      resetForm()
    }
  }

  // Handle category change
  const handleCategoryChange = (e) => {
    const value = e.target.value
    if (value === 'custom') {
      setShowCustomCategory(true)
      setFormData(prev => ({ ...prev, category: 'custom' }))
    } else {
      setShowCustomCategory(false)
      setFormData(prev => ({ ...prev, category: value, customCategory: '' }))
    }
  }

  // Handle delete
  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      await deleteService(serviceId)
    }
  }

  // Category options
  const categories = [
    { value: 'diagnostic', label: 'Diagnostic' },
    { value: 'corrective', label: 'Corrective' },
    { value: 'surgical', label: 'Surgical' },
    { value: 'medical', label: 'Medical' },
    { value: 'pediatric', label: 'Pediatric' },
    { value: 'rehabilitative', label: 'Rehabilitative' },
    { value: 'custom', label: '➕ Custom Category' }
  ]

  // Icon options
  const icons = [
    'bi-eye', 'bi-person', 'bi-scissors', 'bi-droplet', 'bi-heart', 
    'bi-award', 'bi-patch-check', 'bi-thermometer', 'bi-stethoscope',
    'bi-prescription', 'bi-hospital', 'bi-shield-check', 'bi-graph-up'
  ]

  return (
    <div className="glass-admin-card">
      <div className="glass-card-header d-flex justify-content-between align-items-center">
        <div>
          <h5 className="glass-card-title">Service Management</h5>
          <p className="glass-card-subtitle">
            {services.length} service(s) available
          </p>
        </div>
        <button
          className="btn elegant-btn"
          onClick={() => setShowForm(true)}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Service
        </button>
      </div>

      <div className="glass-card-body">
        {/* Service Form */}
        {showForm && (
          <div className="glass-admin-card mb-4 border-accent">
            <div className="glass-card-header">
              <h6 className="mb-0 text-white">
                <i className={`bi ${editingService ? 'bi-pencil' : 'bi-plus-circle'} me-2`}></i>
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h6>
            </div>
            <div className="glass-card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label-glass fw-semibold">Service Name *</label>
                    <input
                      type="text"
                      className="form-control elegant-input"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  {/* Category Field - Now with custom option */}
                  <div className="col-md-6">
                    <label className="form-label-glass fw-semibold">Category</label>
                    <select
                      className="form-select elegant-input"
                      value={formData.category}
                      onChange={handleCategoryChange}
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    
                    {/* Custom Category Input */}
                    {showCustomCategory && (
                      <div className="mt-2">
                        <input
                          type="text"
                          className="form-control elegant-input"
                          value={formData.customCategory}
                          onChange={(e) => setFormData({...formData, customCategory: e.target.value})}
                          placeholder="Enter custom category name"
                          required={showCustomCategory}
                        />
                        <small className="text-muted">Enter your custom category name</small>
                      </div>
                    )}
                  </div>

                  {/* Optional Price Field */}
                  <div className="col-md-6">
                    <label className="form-label-glass fw-semibold">
                      Price ($) 
                      <span className="text-muted fw-normal"> - Optional</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="form-control elegant-input"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="Leave empty for consultation-based pricing"
                    />
                    <small className="text-muted">
                      Leave empty for services without fixed pricing (consultations, etc.)
                    </small>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label-glass fw-semibold">Duration (minutes) *</label>
                    <input
                      type="number"
                      className="form-control elegant-input"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      required
                      min="1"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label-glass fw-semibold">Short Description</label>
                    <input
                      type="text"
                      className="form-control elegant-input"
                      value={formData.short_description}
                      onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                      placeholder="Brief description for cards"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label-glass fw-semibold">Full Description</label>
                    <textarea
                      className="form-control elegant-input"
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label-glass fw-semibold">Icon</label>
                    <select
                      className="form-select elegant-input"
                      value={formData.icon}
                      onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    >
                      {icons.map(icon => (
                        <option key={icon} value={icon}>
                          <i className={`bi ${icon} me-2`}></i>
                          {icon.replace('bi-', '')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label-glass fw-semibold">Status</label>
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
                  <button type="submit" className="btn elegant-btn me-2" disabled={loading}>
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
                  <button type="button" className="btn btn-glass-admin" onClick={resetForm}>
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
            <i className="bi bi-eye-slash display-4 d-block mb-3" style={{color: 'var(--text-light)'}}></i>
            <h5 className="text-dark">No services found</h5>
            <p>Get started by adding your first service</p>
          </div>
        ) : (
          <div className="row g-4">
            {services.map(service => (
              <div key={service.id} className="col-md-6 col-lg-4">
                <div className={`card h-100 border-0 shadow-sm service-card ${
                  service.active ? 'border-start border-success border-3' : 'border-start border-secondary border-3'
                }`}>
                  <div className="card-body d-flex flex-column h-100">
                    {/* Header with icon and status */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="service-icon bg-accent bg-opacity-10 rounded-3 p-2">
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
                    <h6 className="card-title text-dark mb-2">{service.name}</h6>
                    
                    {/* Service Description */}
                    <p className="card-text text-muted small mb-3 flex-grow-1">
                      {service.short_description || service.description}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="service-meta mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className={`fw-bold ${service.price ? 'text-accent' : 'text-muted'}`}>
                          {service.price ? `GH₵ ${service.price}` : 'Price on consultation'}
                        </span>
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