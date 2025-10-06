// src/data/mockData.js
export const mockServices = [
  {
    id: 'general-consultation',
    name: 'General Consultation',
    duration: 30,
    price: 150,
    description: 'Comprehensive eye health assessment and consultation',
    icon: 'bi-eye'
  },
  {
    id: 'eye-exam',
    name: 'Comprehensive Eye Exam',
    duration: 45,
    price: 200,
    description: 'Complete vision testing and eye health evaluation',
    icon: 'bi-search'
  },
  {
    id: 'contact-lens',
    name: 'Contact Lens Fitting',
    duration: 60,
    price: 250,
    description: 'Professional contact lens consultation and fitting',
    icon: 'bi-person'
  },
  {
    id: 'follow-up',
    name: 'Follow-up Visit',
    duration: 20,
    price: 100,
    description: 'Post-treatment follow-up examination',
    icon: 'bi-calendar'
  }
]

export const mockReasons = [
  { id: 1, name: 'Routine Eye Exam', active: true, sort_order: 1 },
  { id: 2, name: 'Contact Lens Fitting', active: true, sort_order: 2 },
  { id: 3, name: 'Eye Infection/Redness', active: true, sort_order: 3 },
  { id: 4, name: 'Vision Problems', active: true, sort_order: 4 },
  { id: 5, name: 'Follow-up Visit', active: true, sort_order: 5 }
]

export const mockSchedule = {
  weekday: 1, // Monday
  start_time: '09:00:00',
  end_time: '17:00:00',
  slot_minutes: 30,
  active: true
}