// src/utils/validation.js - UPDATED
export const validateEmail = (email) => {
  if (!email) return true // Email is optional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$|^[\+]?[(]?[\d\s\-\(\)]{10,}$/
  const digitsOnly = phone.replace(/\D/g, '')
  return digitsOnly.length >= 10 && phoneRegex.test(phone)
}

export const validateName = (name) => {
  return name.trim().length >= 2 && name.trim().length <= 50
}

export const getValidationErrors = (customerInfo) => {
  const errors = {}
  
  if (!validateName(customerInfo.name)) {
    errors.name = 'Please enter a valid name (2-50 characters)'
  }
  
  if (!validatePhone(customerInfo.phone)) {
    errors.phone = 'Please enter a valid phone number (at least 10 digits)'
  }
  
  if (!validateEmail(customerInfo.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  // No validation for notes - it's optional
  
  return errors
}