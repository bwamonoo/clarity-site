// src/utils/services.js
export const serviceCategories = {
  diagnostic: 'Diagnostic Services',
  corrective: 'Corrective Services', 
  surgical: 'Surgical Services',
  medical: 'Medical Services',
  pediatric: 'Pediatric Services',
  rehabilitative: 'Rehabilitative Services'
}

export const filterServicesByCategory = (services, category) => {
  return services.filter(service => service.category === category)
}

export const getServiceById = (services, id) => {
  return services.find(service => service.id === id)
}

export const formatServicePrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}