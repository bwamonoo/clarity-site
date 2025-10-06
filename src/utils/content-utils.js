/**
 * CONTENT UTILITY FUNCTIONS
 * For dynamic content replacement and validation
 */

/**
 * Replace template variables in content
 * @param {string} content - Content with {{variables}}
 * @param {Object} data - Data to replace with
 * @returns {string}
 */
export const replaceContentVariables = (content, data = {}) => {
  if (typeof content !== 'string') return content
  
  let result = content
  
  // Replace all {{variable}} occurrences
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g')
    result = result.replace(regex, data[key] || '')
  })
  
  return result
}

/**
 * Get content for a specific step in booking flow
 * @param {string} step - Step identifier
 * @param {Object} overrides - Custom overrides
 * @returns {Object}
 */
export const getBookingStepContent = (step, overrides = {}) => {
  const { appointmentsContent } = require('../config/content/appointments.js')
  
  const baseContent = appointmentsContent.steps[step] || {}
  
  return {
    ...baseContent,
    ...overrides
  }
}

/**
 * Format service for display
 * @param {Object} service - Service object
 * @returns {Object} Formatted service
 */
export const formatServiceForDisplay = (service) => {
  if (!service) return null
  
  return {
    ...service,
    displayPrice: `$${service.price}`,
    displayDuration: `${service.duration} minutes`,
    shortDescription: service.shortDescription || service.description?.substring(0, 100) + '...'
  }
}

/**
 * Validate contact form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation result
 */
export const validateContactForm = (formData) => {
  const errors = {}
  
  if (!formData.name?.trim()) {
    errors.name = 'Name is required'
  }
  
  if (!formData.email?.trim()) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (!formData.message?.trim()) {
    errors.message = 'Message is required'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Format phone number for display
 * @param {string} phone - Raw phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return ''
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Format based on length
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
  } else if (cleaned.length === 11) {
    return cleaned.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4')
  }
  
  return phone
}

/**
 * Generate unique ID
 * @param {string} prefix - ID prefix
 * @returns {string} Unique ID
 */
export const generateId = (prefix = '') => {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}