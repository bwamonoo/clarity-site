// Import from separate files
import { clinicInfo } from './clinic-info.js'
import { servicesContent } from './services.js'
import { teamMembers } from './team.js'
import { homepageContent } from './homepage.js'
import { appointmentsContent } from './appointments.js'
import { globalContent } from './global.js'

// Combined export for easy migration
export const websiteContent = {
  clinic: clinicInfo,
  services: servicesContent,
  team: teamMembers,
  hero: homepageContent.hero,
  appointments: appointmentsContent,
  global: globalContent
}