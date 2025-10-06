import { RealBookingService } from '../realBookingService.js'

// Feature flag to switch between mock and real data
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'

// Mock adapter (keep your existing mock functions)
const mockDataAdapter = {
  // Services
  getServices: async () => {
    const { servicesContent } = await import('../../config/content/services.js')
    return servicesContent.catalog
  },

  // Appointments
  getAppointments: async () => {
    const { mockAppointments } = await import('../../data/adminMockData.js')
    return mockAppointments
  },

  // Patients
  getPatients: async () => {
    const { mockPatients } = await import('../../data/adminMockData.js')
    return mockPatients
  },

  // Schedule
  getScheduleForDate: async (date) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const weekday = date.getDay()
    
    // Mock: Clinic is open Monday-Friday (1-5), 9AM-5PM
    if (weekday >= 1 && weekday <= 5) {
      return {
        weekday: weekday,
        start_time: '09:00:00',
        end_time: '17:00:00',
        slot_minutes: 30,
        active: true
      }
    }
    return null
  },

  // Booking
  submitBooking: async (bookingData) => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simulate successful booking 85% of the time
    const success = Math.random() > 0.15
    
    if (success) {
      return {
        success: true,
        bookingId: `BK-${Date.now()}`,
        message: 'Your appointment has been booked successfully! You will receive a confirmation message shortly.'
      }
    } else {
      return {
        success: false,
        message: 'This time slot was just booked by another patient. Please choose a different time.'
      }
    }
  }
}

// Real adapter
const realDataAdapter = {
  getServices: RealBookingService.getServices,
  getScheduleForDate: RealBookingService.getScheduleForDate,
  generateTimeSlots: RealBookingService.generateTimeSlots,
  submitBooking: RealBookingService.submitBooking
}

// Export the active adapter
export const DataService = USE_MOCK_DATA ? mockDataAdapter : realDataAdapter

// For backward compatibility
export class BookingService {
  static getServices = DataService.getServices
  static getScheduleForDate = DataService.getScheduleForDate
  static generateTimeSlots = DataService.generateTimeSlots
  static submitBooking = DataService.submitBooking
}