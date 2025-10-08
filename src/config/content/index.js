// Import from separate files
import { clinicInfo } from './clinic-info.js'
import { servicesContent } from './services.js'
import { teamMembers } from './team.js'
import { homepageContent } from './homepage.js'
import { appointmentsContent } from './appointments.js'
import { globalContent } from './global.js'
import { aboutContent } from './about.js'

// Combined export for easy migration
export const websiteContent = {
  clinic: clinicInfo,
  services: servicesContent,
  team: teamMembers,
  hero: homepageContent.hero,
  appointments: appointmentsContent,
  global: globalContent,
  about: aboutContent,
  footer: clinicInfo.footer  // Add this line to export footer content
}