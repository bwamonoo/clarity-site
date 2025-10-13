import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
// Import from new modular content structure
import { websiteContent } from '../config/content/index'
import { 
  ChevronLeft, ChevronRight, Calendar, Phone, MapPin, Clock, 
  Eye, Award, Users, Star 
} from 'lucide-react'

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { clinic, hero } = websiteContent
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === hero.images.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000)
    
    return () => clearInterval(interval)
  }, [hero.images.length])

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hero.images.length)
  }

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + hero.images.length) % hero.images.length)
  }

  const iconMap = {
    Users, Star, Award, Clock
  }

  return (
    <section className="hero-bg min-vh-100 position-relative overflow-hidden">
      {/* Background overlays */}
      <div className="position-absolute w-100 h-100 hero-overlay" style={{ top: 0, left: 0 }}></div>
      <div className="position-absolute w-100 h-100 pattern-overlay" style={{ top: 0, left: 0 }}></div>
      
      <div className="position-relative" style={{ zIndex: 10 }}>
        <div className="w-100 px-4 px-lg-7" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
          <div className="row align-items-center g-5 mx-0">
            {/* Left Content */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="col-lg-7"
            >
              {/* Main Headline */}
              <div className="mb-5">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <h1 className="display-custom text-brand mb-0 lh-1">
                    {hero.title.line1}
                    <span className="d-block text-accent position-relative animate-underline">
                      {hero.title.line2}
                    </span>
                    <span className="d-block text-brand">{hero.title.line3}</span>
                  </h1>
                </motion.div>
                
                <motion.p 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="fs-5 text-light-custom lh-base mt-4"
                  style={{ maxWidth: '600px' }}
                >
                  {hero.description}
                </motion.p>
              </div>
              
              {/* CTA Buttons */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="d-flex flex-column flex-sm-row gap-3 mb-5"
              >
                <Link 
                  to="/appointments" 
                  className="btn btn-gradient-primary btn-lg px-5 py-3 rounded-4 shadow-custom d-flex align-items-center justify-content-center gap-3"
                >
                  <Calendar size={20} />
                  Book Your Appointment
                </Link>
                <a 
                  href={`tel:${clinic.contact.phone.primary}`} 
                  className="btn btn-outline-accent btn-lg px-5 py-3 rounded-4 d-flex align-items-center justify-content-center gap-3"
                >
                  <Phone size={20} />
                  {clinic.contact.phone.formatted}
                </a>
              </motion.div>
              
              {/* Stats Grid */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="row g-3 pt-4"
              >
                {hero.stats.map((stat, index) => {
                  const IconComponent = iconMap[stat.icon]
                  return (
                    <div key={index} className="col-6 col-sm-3">
                      <div className="stat-card rounded-4 p-3 text-center h-100">
                        <IconComponent size={32} className="text-accent mx-auto mb-2" />
                        <p className="fs-4 text-brand mb-1 fw-bold">{stat.value}</p>
                        <p className="small text-light-custom mb-0">{stat.label}</p>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>
            
            {/* Right Visual - Slideshow */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="col-lg-5 position-relative"
            >
              <div className="position-relative slideshow-wrapper">
                {/* Background glassmorphism card */}
                <div className="position-absolute glass rounded-4 shadow-custom-lg" style={{ 
                  top: '1rem', right: '1rem', bottom: '1rem', left: '1rem' 
                }}></div>
                
                {/* Slideshow */}
                <div className="position-relative h-100 p-4" style={{ zIndex: 10 }}>
                  <div className="position-relative w-100 h-100 rounded-4 overflow-hidden group slideshow-container">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="position-absolute w-100 h-100"
                        style={{ top: 0, left: 0 }}
                      >
                        <img
                          src={hero.images[currentImageIndex]}
                          alt="Clarity Eye Clinic"
                          className="w-100 h-100 object-fit-cover"
                        />
                        <div 
                          className="position-absolute w-100 h-100"
                          style={{
                            top: 0,
                            left: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent, transparent)'
                          }}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                      onClick={prevSlide}
                      className="position-absolute btn rounded-circle d-flex align-items-center justify-content-center text-white"
                      style={{
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '48px',
                        height: '48px',
                        zIndex: 10,
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <button
                      onClick={nextSlide}
                      className="position-absolute btn rounded-circle d-flex align-items-center justify-content-center text-white"
                      style={{
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '48px',
                        height: '48px',
                        zIndex: 10,
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* Indicators */}
                    <div 
                      className="position-absolute d-flex gap-2"
                      style={{
                        bottom: '1.5rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 10
                      }}
                    >
                      {hero.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`btn rounded-circle ${index === currentImageIndex ? 'bg-white' : 'bg-white-50'}`}
                          style={{ 
                            border: 'none', 
                            padding: 0,
                            width: '12px',
                            height: '12px'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Floating Info Cards */}
                <motion.div 
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="position-absolute glass rounded-4 p-4 shadow-custom"
                  style={{ 
                    left: '-2rem', 
                    top: '4rem', 
                    zIndex: 20,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="brand-logo-modern rounded-3 d-flex align-items-center justify-content-center shadow" style={{ width: '56px', height: '56px' }}>
                      <img src="/images/clarity-logo.png" alt="Clarity Eye Clinic" />
                    </div>
                    <div>
                      <p className="fs-4 text-brand mb-0 fw-bold">{hero.floatingCards.procedures.value}</p>
                      <p className="small text-light-custom mb-0">{hero.floatingCards.procedures.label}</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="position-absolute glass rounded-4 p-4 shadow-custom"
                  style={{ 
                    right: '-2rem', 
                    bottom: '5rem', 
                    zIndex: 20,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="icon-gradient-brand rounded-3 d-flex align-items-center justify-content-center shadow" style={{ width: '56px', height: '56px' }}>
                      <Award size={28} className="text-white" />
                    </div>
                    <div>
                      <p className="fs-4 text-brand mb-0 fw-bold">{hero.floatingCards.rating.value}</p>
                      <p className="small text-light-custom mb-0">{hero.floatingCards.rating.label}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Bottom Contact Bar */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="glass rounded-4 p-4 p-lg-5 shadow-custom mt-5"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="row g-4 align-items-center">
              <div className="col-md-4">
                <div className="d-flex align-items-center gap-3">
                  <MapPin size={24} className="text-accent" />
                  <div>
                    <p className="text-brand mb-1 fw-semibold">{clinic.contact.address.street}</p>
                    <p className="small text-light-custom mb-0">{clinic.contact.address.landmark}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center gap-3">
                  <Clock size={24} className="text-accent" />
                  <div>
                    <p className="text-brand mb-1 fw-semibold">{clinic.hours.weekdays}</p>
                    <p className="small text-light-custom mb-0">{clinic.hours.saturday}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center gap-3">
                  <Phone size={24} className="text-accent" />
                  <div>
                    <p className="text-brand mb-1 fw-semibold">{clinic.hours.emergency}</p>
                    <p className="small text-light-custom mb-0">{clinic.contact.phone.formatted}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}