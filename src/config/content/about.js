// src/config/content/about.js
/**
 * ABOUT PAGE CONTENT CONFIGURATION
 * Easy to modify clinic information, mission, and team details
 */

export const aboutContent = {
  // Hero Section
  hero: {
    title: "About Clarity Eye Clinic",
    subtitle: "Excellence in Eye Care Since 2010",
    description: "For over a decade, we've been providing comprehensive eye care services with cutting-edge technology and compassionate care.",
    image: "/images/clinic-exterior.jpg" // Optional clinic image
  },

  // Clinic Story & Mission
  mission: {
    title: "Our Mission & Vision",
    story: {
      title: "Our Story",
      content: "Founded in 2010, Clarity Eye Clinic began with a simple mission: to provide accessible, high-quality eye care to our community. What started as a small practice has grown into a comprehensive eye care center serving thousands of patients annually."
    },
    mission: {
      title: "Our Mission",
      content: "To deliver exceptional eye care through advanced technology, expert medical staff, and personalized treatment plans that prioritize patient well-being and visual health."
    },
    vision: {
      title: "Our Vision",
      content: "To be the leading eye care provider in the region, known for innovation, compassionate care, and commitment to improving our patients' quality of life through better vision."
    }
  },

  // Clinic Information
  clinicInfo: {
    title: "Our Clinic",
    description: "State-of-the-art facility with the latest ophthalmic technology",
    features: [
      {
        icon: "bi bi-eye",
        title: "Advanced Diagnostics",
        description: "Digital retinal imaging, OCT, and visual field testing"
      },
      {
        icon: "bi bi-heart-pulse",
        title: "Comprehensive Care",
        description: "From routine exams to complex surgical procedures"
      },
      {
        icon: "bi bi-people",
        title: "Patient-Centered",
        description: "Personalized treatment plans for every patient"
      },
      {
        icon: "bi bi-award",
        title: "Board Certified",
        description: "Our ophthalmologists are certified and experienced"
      }
    ]
  },

  // Values
  values: {
    title: "Our Values",
    items: [
      {
        icon: "bi bi-shield-check",
        title: "Quality Care",
        description: "We never compromise on the quality of our services and treatments."
      },
      {
        icon: "bi bi-heart",
        title: "Compassion",
        description: "We treat every patient with empathy, respect, and understanding."
      },
      {
        icon: "bi bi-lightbulb",
        title: "Innovation",
        description: "We continuously invest in the latest technology and techniques."
      },
      {
        icon: "bi bi-graph-up",
        title: "Excellence",
        description: "We strive for excellence in every aspect of patient care."
      }
    ]
  },

  // Statistics
  statistics: [
    { value: "14K+", label: "Patients Treated", icon: "bi bi-people" },
    { value: "12+", label: "Years Experience", icon: "bi bi-calendar" },
    { value: "5", label: "Specialized Areas", icon: "bi bi-award" },
    { value: "98%", label: "Patient Satisfaction", icon: "bi bi-heart" }
  ],

  // Team Overview (links to staff page)
  team: {
    title: "Meet Our Experts",
    description: "Our board-certified ophthalmologists and optometrists bring decades of combined experience in various eye care specialties.",
    cta: {
      text: "View Full Team",
      link: "/staff"
    }
  },

  // Contact Information
  contactInfo: {
    title: "Visit Our Clinic",
    address: {
      street: "123 Medical Center Drive",
      city: "Accra, Greater Accra",
      postal: "GA-123-4567"
    },
    hours: {
      weekdays: "Monday - Friday: 8:00 AM - 6:00 PM",
      saturday: "Saturday: 9:00 AM - 2:00 PM",
      sunday: "Sunday: Closed"
    },
    contact: {
      phone: "+233 24 123 4567",
      email: "info@clarityeyeclinic.com"
    }
  }
}