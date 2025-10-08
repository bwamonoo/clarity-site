import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { useBooking } from '../features/booking' // Changed import path

const BookingContext = createContext()

const initialState = {
  currentStep: 1,
  selectedService: null,
  selectedDate: null,
  selectedSlot: null,
  schedule: null,
  slots: [],
  customerInfo: { name: '', phone: '', email: '', notes: '' },
  bookingResult: null,
  loading: false,
  error: null,
  services: []
}

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }
    case 'SET_SERVICE':
      return { ...state, selectedService: action.payload, currentStep: 2 }
    case 'SET_DATE':
      return { ...state, selectedDate: action.payload, selectedSlot: null, slots: [] }
    case 'SET_SCHEDULE':
      return { ...state, schedule: action.payload }
    case 'SET_SLOTS':
      return { ...state, slots: action.payload }
    case 'SET_TIME_SLOT':
      return { ...state, selectedSlot: action.payload, currentStep: 3 }
    case 'SET_CUSTOMER_INFO':
      return { ...state, customerInfo: action.payload }
    case 'SET_BOOKING_RESULT':
      return { ...state, bookingResult: action.payload, currentStep: 4 }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_SERVICES':
      return { ...state, services: action.payload }
    case 'RESET_BOOKING':
      return initialState
    default:
      return state
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState)
  const bookingApi = useBooking()

  // Load services on mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true })
        // Wait for services to load from the hook
        if (bookingApi.services.length > 0) {
          dispatch({ type: 'SET_SERVICES', payload: bookingApi.services })
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load services' })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    loadServices()
  }, [bookingApi.services])

  // Actions
  const actions = {
    setStep: (step) => dispatch({ type: 'SET_STEP', payload: step }),
    
    setService: (service) => dispatch({ type: 'SET_SERVICE', payload: service }),
    
    setDate: async (date) => {
      dispatch({ type: 'SET_DATE', payload: date })
      dispatch({ type: 'SET_LOADING', payload: true })
      
      try {
        const scheduleData = await bookingApi.getScheduleForDate(date)
        dispatch({ type: 'SET_SCHEDULE', payload: scheduleData })
        
        if (scheduleData) {
          const timeSlots = await bookingApi.generateTimeSlots(date, scheduleData, state.selectedService?.duration)
          dispatch({ type: 'SET_SLOTS', payload: timeSlots })
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load schedule' })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },
    
    setTimeSlot: (slot) => dispatch({ type: 'SET_TIME_SLOT', payload: slot }),
    
    setCustomerInfo: (info) => dispatch({ type: 'SET_CUSTOMER_INFO', payload: info }),
    
    submitBooking: async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      try {
        const bookingData = {
          service: state.selectedService,
          date: state.selectedDate,
          slot: state.selectedSlot,
          customer: state.customerInfo
        }
        
        const result = await bookingApi.submitBooking(bookingData)
        dispatch({ type: 'SET_BOOKING_RESULT', payload: result })
        return result
      } catch (error) {
        const errorResult = { 
          success: false, 
          message: 'Booking failed. Please try again.' 
        }
        dispatch({ type: 'SET_BOOKING_RESULT', payload: errorResult })
        return errorResult
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },
    
    resetBooking: () => dispatch({ type: 'RESET_BOOKING' })
  }

  return (
    <BookingContext.Provider value={{ state, actions }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBookingContext = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider')
  }
  return context
}