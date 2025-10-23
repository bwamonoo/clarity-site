/**
 * TEAM MEMBERS CONFIGURATION
 * Easy to add/remove staff members
 */
export const teamMembers = {
  // Team introduction
  introduction: {
    title: "Meet Our Expert Team",
    description: "Our board-certified ophthalmologists and optometrists bring decades of experience and specialized training to provide you with the highest quality eye care."
  },

  // Staff members array
  members: [
    {
      id: 1,
      name: "Dr. Georgette Osei Kontoh",
      title: "Specialist Ophthalmologist",
      specialization: "Cataract & Refractive Surgery",
      bio: "With over 15 years of experience, Dr. Kontoh specializes in advanced cataract surgery and laser vision correction.",
      education: ["MD - University of Ghana", "Fellowship - Johns Hopkins University"],
      image: "/images/team/dr-kontoh.jpg",
      specialties: ["Cataract Surgery", "LASIK", "Glaucoma Treatment"],
      languages: ["English", "Twi"],
      yearsExperience: 15,
      location: "Madina - East Legon - Accra"
    },
    {
      id: 2, 
      name: "Dr. Richelle Adamson",
      title: "Specialist Ophthalmologist",
      specialization: "Children's Eye Health",
      bio: "Dr. Adamson is dedicated to providing compassionate eye care for children of all ages.",
      education: ["MD - Kwame Nkrumah University", "Pediatric Fellowship - Great Ormond Street Hospital"],
      image: "/images/team/dr-adamson.jpg", 
      specialties: ["Pediatric Eye Exams", "Strabismus Surgery", "Vision Therapy"],
      languages: ["English", "Twi"],
      yearsExperience: 12,
      location: "Kwahu - Mpraeso"
    },
    {
      id: 3,
      name: "Dr. Joel Oti Amankwah", 
      title: "Specialist Ophthalmologist",
      specialization: "Contact Lenses & Primary Care",
      bio: "Dr. Amankwah provides comprehensive eye examinations and specializes in contact lens fittings.",
      education: ["OD - University of Cape Coast", "Contact Lens Residency - Moorfields Eye Hospital"],
      image: "/images/team/dr-amankwah.jpg",
      specialties: ["Contact Lenses", "Dry Eye Treatment", "Myopia Control"],
      languages: ["English", "Twi"], 
      yearsExperience: 8,
      location: "Kumasi"
    }
  ],

  // Team statistics
  statistics: [
    { value: "50+", label: "Years Combined Experience" },
    { value: "10K+", label: "Patients Treated" },
    { value: "5", label: "Specialized Areas" },
    { value: "98%", label: "Patient Satisfaction" }
  ]
}