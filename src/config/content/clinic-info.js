/**
 * CLINIC INFORMATION
 * Easy to replace - clinic can provide this as JSON
 */
export const clinicInfo = {
  name: "Clarity Eye Clinic",
  tagline: "Crystal Clear Vision",
  
  // Contact Information
  contact: {
    phone: {
      primary: "+233-59-410-0778",
      emergency: "+233-59-410-0778", 
      formatted: "(233) 59-410-0778"
    },
    email: "clarityeyecareconsult@gmail.com",
    address: {
      street: "71 Bouandary Road, Madina Social Welfare Round About",
      landmark: "Near Emmanuel Villa Bus Stop, Opposite Medimart Pharmacy",
      city: "Accra",
      country: "Ghana"
    }
  },

  // Business Hours
  hours: {
    weekdays: "Mon-Fri: 8:00 AM - 5:00 PM",
    saturday: "Saturday: 8:00 AM - 2:00 PM", 
    sunday: "Sunday: Closed",
    emergency: "Emergency Services: 24/7"
  },

  // Social Media & Online Presence
  social: {
    facebook: "https://www.facebook.com/p/Clarity-Eye-Care-Consult-100064021844403/",
    instagram: "https://instagram.com/eyecareclarity",
    twitter: "#"
  },

  // Clinic Metadata
  metadata: {
    founded: 2010,
    specialties: ["Comprehensive Eye Care", "Surgical Services", "Pediatric Ophthalmology"],
    languages: ["English", "Twi", "French"]
  },

  // Footer Content (added to match websiteContent structure)
  footer: {
    description: "Expert eye care with modern diagnostics and compassionate service.",
    copyright: "© {year} Clarity Eye Clinic. All rights reserved.",
    tagline: "Committed to your vision health",
    
    quickLinks: {
      clinic: {
        title: "Clinic",
        links: [
          { label: "Services", url: "/services" },
          { label: "Our Staff", url: "/staff" },
          { label: "Appointments", url: "/appointments" },
          { label: "About Us", url: "/about" }
        ]
      },
      services: {
        title: "Services", 
        links: [
          { label: "Eye Exams", url: "/services/eye-exams" },
          { label: "Contact Lenses", url: "/services/contact-lenses" },
          { label: "Eyeglasses", url: "/services/glasses" },
          { label: "Eye Surgery", url: "/services/surgery" }
        ]
      }
    },
    
    legal: {
      title: "Legal",
      links: [
        { label: "Privacy Policy", url: "/privacy" },
        { label: "Terms of Service", url: "/terms" },
        { label: "Accessibility", url: "/accessibility" }
      ]
    },
    
    social: {
      title: "Connect", 
      links: [
        { platform: "Facebook", url: "https://www.facebook.com/p/Clarity-Eye-Care-Consult-100064021844403/", icon: "facebook" },
        { platform: "Instagram", url: "https://instagram.com/eyecareclarity", icon: "instagram" },
        { platform: "Twitter", url: "#", icon: "twitter" },
        { platform: "LinkedIn", url: "#", icon: "linkedin" }
      ]
    }
  }
}