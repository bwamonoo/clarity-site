/**
 * HOMEPAGE CONTENT
 * All hero and homepage-specific content
 */
export const homepageContent = {
  hero: {
    title: {
      line1: "Crystal Clear",
      line2: "", 
      line3: "Vision"
    },
    description: "Experience world-class eye care with state-of-the-art technology, personalized treatment plans, and a team dedicated to protecting your most precious sense.",
    
    // Hero images - easy to replace URLs
    images: [
      'https://images.unsplash.com/photo-1758101512269-660feabf64fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwY2xpbmljJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU4NDYzMzk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1682663947124-88b7b7e12889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWUlMjBleGFtaW5hdGlvbiUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTg0NDMzMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      '../../../public/images/mss-clarity.jpg'
    ],

    // Statistics - easy to update numbers
    stats: [
      { icon: 'Users', label: 'Patients', value: '25K+' },
      { icon: 'Star', label: 'Rating', value: '4.9' },
      { icon: 'Award', label: 'Awards', value: '15+' },
      { icon: 'Clock', label: 'Experience', value: '20Y' }
    ],

    // Floating cards content
    floatingCards: {
      procedures: {
        value: "15,000+",
        label: "Successful Procedures"
      },
      rating: {
        value: "Top Rated", 
        label: "Eye Care Center"
      }
    }
  },

  // Call-to-action sections
  cta: {
    primary: {
      title: "Ready for Clearer Vision?",
      description: "Book your comprehensive eye examination today and take the first step towards optimal eye health.",
      buttonText: "Book Appointment",
      buttonLink: "/appointments"
    },
    secondary: {
      title: "Emergency Care Available",
      description: "We offer urgent eye care services for emergencies. Don't wait if you're experiencing vision problems.",
      buttonText: "Call Now",
      buttonLink: "tel:+233-XX-XXX-XXXX"
    }
  }
}