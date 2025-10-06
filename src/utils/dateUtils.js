// src/utils/dateUtils.js - UPDATED
export const fmtDateISOLocal = (dateObj) => {
  return dateObj.toISOString().slice(0, 10)
}

export const generateCalendarDays = (startDate, daysCount = 14) => {
  const days = []
  for (let i = 0; i < daysCount; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    days.push(date)
  }
  return days
}

export const formatAppointmentTime = (isoString) => {
  try {
    // Create date in local timezone
    const date = new Date(isoString)
    
    // Ensure we're working with local time
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    
    return {
      date: localDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: localDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      }),
      isoString: localDate.toISOString() // Return consistent ISO string
    }
  } catch {
    return null
  }
}

// NEW: Helper to ensure consistent timezone handling
export const createLocalISODate = (date, timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number)
  const localDate = new Date(date)
  localDate.setHours(hours, minutes, 0, 0)
  return localDate.toISOString()
}

// Helper to compare dates without timezone issues
export const isToday = (dateString) => {
  if (!dateString) return false
  
  const inputDate = new Date(dateString)
  const today = new Date()
  
  return (
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear()
  )
}

export const isUpcoming = (dateString) => {
  if (!dateString) return false
  
  const inputDate = new Date(dateString)
  const today = new Date()
  
  // Reset times to compare only dates
  inputDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  
  return inputDate >= today
}