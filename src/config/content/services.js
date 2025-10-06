/**
 * SERVICES CONFIGURATION
 * Structured for easy updates - clinic can modify prices, descriptions, etc.
 */
export const servicesContent = {
  // Services for homepage overview
  hero: {
    title: {
      line1: "Our Comprehensive",
      line2: "Eye Care Services"
    },
    description: "From routine eye exams to specialized treatments, we provide world-class care using the latest technology and techniques to protect and enhance your vision.",
    stats: [
      { icon: "bi-award", value: "25+", label: "Years Experience" },
      { icon: "bi-people", value: "15K+", label: "Patients Served" },
      { icon: "bi-check-circle", value: "98%", label: "Satisfaction Rate" },
      { icon: "bi-eye", value: "50K+", label: "Procedures Completed" }
    ]
  },

  overview: {
    title: "Our Services",
    description: "Comprehensive eye care: prevention, diagnosis, treatment and ongoing management. We combine clinical excellence with compassionate service.",
    header: {
      title: "Specialized Care for Every Need",
      description: "Our expert team provides comprehensive eye care services tailored to your unique needs, from preventive care to advanced treatments."
    },
    whyChooseUs: {
      title: "Why choose Clarity Eye Clinic?",
      description: "We blend experienced specialists, modern diagnostic tools and patient-first care. Our mission is clearer vision and confident outcomes — delivered with dignity and warmth.",
      features: [
        {
          icon: "bi-check2-circle",
          title: "Experienced Clinicians",
          description: "Board-certified surgeons and optometrists."
        },
        {
          icon: "bi-gear-wide-connected", 
          title: "Modern Equipment",
          description: "OCT, visual field, and laser-assisted procedures."
        },
        {
          icon: "bi-heart-fill",
          title: "Patient-centred care", 
          description: "Clear communication and tailored treatment plans."
        }
      ]
    }
  },


  detailed: [
    {
      id: 1,
      title: "Comprehensive Eye Exams",
      body: "Thorough eye examinations for all ages using advanced diagnostic technology.",
      icon: "bi-eye",
      price: 150,
      duration: "45-60 minutes",
      features: [
        "Visual acuity testing",
        "Retinal photography & OCT scanning",
        "Glaucoma screening",
        "Digital eye strain assessment",
        "Prescription evaluation"
      ],
      category: "diagnostic"
    },
    {
      id: 2,
      title: "Contact Lens Services", 
      body: "Professional fitting and ongoing care for all types of contact lenses.",
      icon: "bi-person",
      price: 200,
      duration: "60 minutes",
      features: [
        "Custom lens fitting & evaluation",
        "Trial lens assessment",
        "Insertion & removal training",
        "Follow-up care included",
        "Dry eye management"
      ],
      category: "corrective"
    },
    {
      id: 3,
      title: "Cataract Consultation",
      body: "Expert evaluation and surgical planning for cataract treatment.",
      icon: "bi-scissors", 
      price: 180,
      duration: "90 minutes",
      features: [
        "Cataract assessment & staging",
        "Surgical options discussion",
        "Lens implant selection",
        "Pre-operative testing",
        "Post-operative care plan"
      ],
      category: "surgical"
    },
    {
      id: 4,
      title: "Glaucoma Management",
      body: "Comprehensive screening and treatment for glaucoma conditions.",
      icon: "bi-droplet",
      price: 220,
      duration: "75 minutes", 
      features: [
        "Intraocular pressure testing",
        "Visual field analysis",
        "Optic nerve imaging",
        "Treatment plan development",
        "Ongoing monitoring"
      ],
      category: "medical"
    },
    {
      id: 5,
      title: "Pediatric Eye Care",
      body: "Specialized eye exams and vision therapy for children.",
      icon: "bi-heart",
      price: 160,
      duration: "60 minutes",
      features: [
        "Child-friendly examination",
        "Developmental vision assessment", 
        "Amblyopia screening",
        "Vision therapy options",
        "School vision certification"
      ],
      category: "pediatric"
    },
    {
      id: 6,
      title: "Low Vision Support",
      body: "Advanced solutions and rehabilitation for low vision patients.",
      icon: "bi-eye",
      price: 250,
      duration: "90 minutes",
      features: [
        "Low vision assessment",
        "Magnification aids fitting",
        "Adaptive technology training", 
        "Home safety evaluation",
        "Counseling & support services"
      ],
      category: "rehabilitative"
    }
  ],

  cta: {
    title: "Ready to Schedule Your Visit?",
    description: "Take the first step towards better vision health. Our experienced team is here to provide the personalized care you deserve.",
    buttons: {
      appointment: {
        text: "Book Appointment",
        icon: "bi-calendar-plus"
      },
      phone: {
        text: "Call {phone}",
        icon: "bi-telephone" 
      }
    }
  }
}