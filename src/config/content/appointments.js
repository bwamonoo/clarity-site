/**
 * APPOINTMENTS & BOOKING CONTENT
 * All text for booking flow
 */
export const appointmentsContent = {
  // Booking steps content
  steps: {
    service: {
      title: "Select Your Service",
      description: "Choose from our comprehensive range of eye care services"
    },
    datetime: {
      title: "Choose Date & Time", 
      description: "Select a convenient time for your appointment"
    },
    details: {
      title: "Your Information",
      description: "Tell us about yourself so we can prepare for your visit"
    },
    confirmation: {
      title: "Confirmation",
      description: "Review and confirm your appointment details"
    }
  },

  // Service selection content
  serviceSelection: {
    title: "What type of appointment do you need?",
    filterAll: "All Services",
    filterPopular: "Most Popular",
    noServices: "No services available at the moment"
  },

  // Date & time selection
  datetimeSelection: {
    title: "When would you like to visit?",
    available: "Available",
    unavailable: "Unavailable",
    selected: "Selected",
    closed: "Clinic Closed",
    loadingSlots: "Loading available time slots...",
    noSlots: "No available slots for this date"
  },

  // Customer details form
  customerDetails: {
    title: "Tell us about yourself",
    fields: {
      name: {
        label: "Full Name",
        placeholder: "Enter your full name",
        required: true
      },
      phone: {
        label: "Phone Number", 
        placeholder: "+233 XX XXX XXXX",
        required: true
      },
      email: {
        label: "Email Address",
        placeholder: "your@email.com",
        required: false
      },
      notes: {
        label: "Additional Notes",
        placeholder: "Any specific concerns or questions...",
        required: false
      }
    },
    privacyNote: "Your information is secure and will only be used for your appointment."
  },

  // Confirmation step
  confirmation: {
    success: {
      title: "Appointment Confirmed!",
      message: "Your appointment has been successfully booked. You will receive a confirmation message shortly.",
      nextSteps: [
        "Arrive 15 minutes before your appointment",
        "Bring your insurance card and ID",
        "Bring any current glasses or contact lenses"
      ]
    },
    error: {
      title: "Booking Failed",
      message: "There was an issue processing your booking. Please try again or call us directly."
    },
    summary: {
      title: "Appointment Summary",
      downloadText: "Download Confirmation"
    }
  },

  // Booking policies
  policies: {
    cancellation: "Please cancel at least 24 hours in advance",
    lateArrival: "Arrivals more than 15 minutes late may be rescheduled",
    insurance: "Please bring your insurance information",
    emergency: "For emergencies, call us directly at {phone}"
  }
}