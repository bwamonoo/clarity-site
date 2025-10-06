import React from 'react'
import StaffCard from '../components/StaffCard'

export default function Staff(){
  const staff = [
    { name: 'Dr. Jane Doe', role: 'Ophthalmologist', img: '/images/staff1.jpg', bio: 'Specialist in retina and cataract care.' },
    { name: 'Mr. John Doe', role: 'Optometrist', img: '/images/staff2.jpg', bio: 'Expert in refraction and contact lenses.' }
  ]
  return (
    <div>
      <h2>Meet the team</h2>
      <div className="row g-4">
        {staff.map((s,i) => (
          <div key={i} className="col-md-4">
            <StaffCard {...s} />
          </div>
        ))}
      </div>
    </div>
  )
}
