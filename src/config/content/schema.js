/**
 * CONTENT VALIDATION SCHEMAS
 * Ensures content structure is maintained when clinic provides updates
 */

/**
 * Validates clinic info structure
 */
export const validateClinicInfo = (clinicInfo) => {
  const required = ['name', 'contact', 'hours']
  const missing = required.filter(field => !clinicInfo[field])
  
  if (missing.length > 0) {
    throw new Error(`Missing required clinic info fields: ${missing.join(', ')}`)
  }
  return true
}

/**
 * Validates service structure  
 */
export const validateServices = (services) => {
  if (!Array.isArray(services.catalog)) {
    throw new Error('Services catalog must be an array')
  }

  services.catalog.forEach(service => {
    const required = ['id', 'title', 'description', 'price', 'duration']
    const missing = required.filter(field => !service[field])
    
    if (missing.length > 0) {
      throw new Error(`Service ${service.id} missing fields: ${missing.join(', ')}`)
    }
  })
  
  return true
}

/**
 * Validates team member structure
 */
export const validateTeamMembers = (team) => {
  if (!Array.isArray(team.members)) {
    throw new Error('Team members must be an array')
  }

  team.members.forEach(member => {
    const required = ['id', 'name', 'title', 'specialization']
    const missing = required.filter(field => !member[field])
    
    if (missing.length > 0) {
      throw new Error(`Team member ${member.id} missing fields: ${missing.join(', ')}`)
    }
  })
  
  return true
}

/**
 * Full content validation
 */
export const validateAllContent = (content) => {
  try {
    validateClinicInfo(content.clinicInfo)
    validateServices(content.servicesContent) 
    validateTeamMembers(content.teamMembers)
    return { valid: true, errors: [] }
  } catch (error) {
    return { valid: false, errors: [error.message] }
  }
}