import { useState } from 'react'
import { useDoctors } from '../../hooks/useDoctors'

export default function DoctorsTab() {
  const {
    doctors,
    loading,
    editingDoctor,
    setEditingDoctor,
    saveDoctor,
    deleteDoctor
  } = useDoctors()

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    specialization: 'General Ophthalmology',
    active: true
  })

  const activeDoctors = doctors.filter(d => d.active).length

  const resetForm = () => {
    setFormData({
      name: '',
      specialization: 'General Ophthalmology',
      active: true
    })
    setEditingDoctor(null)
    setShowForm(false)
  }

  const handleEdit = (doctor) => {
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization || '',
      active: doctor.active
    })
    setEditingDoctor(doctor)
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await saveDoctor({
      ...formData,
      id: editingDoctor?.id
    })
    if (result.success) {
      resetForm()
    }
  }

  const handleDelete = async (doctorId) => {
    if (window.confirm('Are you sure you want to remove this doctor? This will not delete their past appointments.')) {
      await deleteDoctor(doctorId)
    }
  }

  const specializations = [
    'General Ophthalmology',
    'Pediatric Ophthalmology',
    'Retina & Vitreous',
    'Glaucoma',
    'Cornea & External Disease',
    'Oculoplastics',
    'Neuro-Ophthalmology',
    'Optometry'
  ]

  return (
    <div className="glass-admin-card">
      <div className="glass-card-header d-flex justify-content-between align-items-center">
        <div>
          <h5 className="glass-card-title">Doctor Management</h5>
          <p className="glass-card-subtitle">
            {activeDoctors} active doctor{activeDoctors !== 1 ? 's' : ''} — {activeDoctors} patient{activeDoctors !== 1 ? 's' : ''} can book the same time slot
          </p>
        </div>
        <button
          className="btn elegant-btn"
          onClick={() => setShowForm(true)}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Doctor
        </button>
      </div>

      <div className="glass-card-body">
        {/* Capacity Info */}
        <div className="alert alert-info d-flex align-items-center mb-4" style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', color: 'var(--text-primary, #e2e8f0)' }}>
          <i className="bi bi-info-circle-fill me-3 fs-5"></i>
          <div>
            <strong>How capacity works:</strong> The number of <strong>active</strong> doctors determines how many patients can book the same time slot. With {activeDoctors} active doctor{activeDoctors !== 1 ? 's' : ''}, {activeDoctors === 0 ? 'no bookings are possible' : `up to ${activeDoctors} patient${activeDoctors !== 1 ? 's' : ''} can book the same time`}.
          </div>
        </div>

        {/* Doctor Form */}
        {showForm && (
          <div className="glass-admin-card mb-4 border-accent">
            <div className="glass-card-header">
              <h6 className="mb-0 text-white">
                <i className={`bi ${editingDoctor ? 'bi-pencil' : 'bi-plus-circle'} me-2`}></i>
                {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
              </h6>
            </div>
            <div className="glass-card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label-glass fw-semibold">Full Name *</label>
                    <input
                      type="text"
                      className="form-control elegant-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Jane Doe"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label-glass fw-semibold">Specialization</label>
                    <select
                      className="form-select elegant-input"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    >
                      {specializations.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
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
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
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
                        <i className={`bi ${editingDoctor ? 'bi-check' : 'bi-plus'} me-2`}></i>
                        {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
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

        {/* Doctors List */}
        {loading && !showForm ? (
          <div className="text-center py-5">
            <div className="spinner-border text-accent" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-2">Loading doctors...</p>
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-person-badge display-4 d-block mb-3" style={{ color: 'var(--text-light)' }}></i>
            <h5 className="text-dark">No doctors added yet</h5>
            <p>Add your first doctor to enable appointment booking</p>
          </div>
        ) : (
          <div className="row g-4">
            {doctors.map(doctor => (
              <div key={doctor.id} className="col-md-6 col-lg-4">
                <div className={`card h-100 border-0 shadow-sm ${doctor.active ? 'border-start border-success border-3' : 'border-start border-secondary border-3'
                  }`}>
                  <div className="card-body d-flex flex-column h-100">
                    {/* Header with icon and status */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="bg-accent bg-opacity-10 rounded-3 p-2">
                        <i className="bi bi-person-badge text-accent fs-5"></i>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className={`badge ${doctor.active ? 'bg-success' : 'bg-secondary'}`}>
                          {doctor.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    {/* Doctor Name */}
                    <h6 className="card-title text-dark mb-2">{doctor.name}</h6>

                    {/* Specialization */}
                    <p className="card-text text-muted small mb-3 flex-grow-1">
                      {doctor.specialization || 'General Ophthalmology'}
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-auto">
                      <div className="btn-group w-100">
                        <button
                          className="btn btn-outline-primary btn-sm flex-fill"
                          onClick={() => handleEdit(doctor)}
                        >
                          <i className="bi bi-pencil me-1"></i>
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(doctor.id)}
                          title="Remove Doctor"
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
