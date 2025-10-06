// src/data/adminMockData.js
export const mockAppointments = [
  {
    id: 1,
    patient_name: 'John Smith',
    patient_phone: '+1234567890',
    patient_email: 'john@example.com',
    service_name: 'Routine Eye Exam',
    service_duration: 45,
    start: '2024-01-20T10:00:00Z',
    end: '2024-01-20T10:45:00Z',
    status: 'confirmed', // pending, confirmed, cancelled, completed
    notes: 'Patient mentioned recent headaches',
    created_at: '2024-01-15T08:30:00Z'
  },
  {
    id: 2,
    patient_name: 'Sarah Johnson',
    patient_phone: '+1234567891',
    patient_email: 'sarah@example.com',
    service_name: 'Contact Lens Fitting',
    service_duration: 60,
    start: '2024-01-20T14:00:00Z',
    end: '2024-01-20T15:00:00Z',
    status: 'pending',
    notes: 'First time contact lens wearer',
    created_at: '2024-01-16T09:15:00Z'
  }
  // ... more appointments
]

export const mockPatients = [
  {
    id: 1,
    name: 'John Smith',
    phone: '+1234567890',
    email: 'john@example.com',
    last_visit: '2024-01-15',
    total_visits: 3,
    preferred_contact: 'email'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    phone: '+1234567891',
    email: 'sarah@example.com',
    last_visit: null,
    total_visits: 0,
    preferred_contact: 'phone'
  }
  // ... more patients
]