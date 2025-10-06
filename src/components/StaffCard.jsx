import React from 'react'

export default function StaffCard({name, role, img, bio}) {
  return (
    <div className="card staff-card">
      <div className="p-4 text-center" style={{background:'#f3f7ff'}}>
        <img src={img} alt={name} className="staff-avatar" />
      </div>

      <div className="card-body">
        <h6 className="card-title mb-0">{name}</h6>
        <small className="text-muted">{role}</small>
        <p className="mt-2 small text-muted">{bio}</p>
      </div>
    </div>
  )
}
