// src/pages/About.jsx
import React from "react";
import { websiteContent } from "../config/content/index";

export default function About() {
  const { about } = websiteContent;

  return (
    <div className="about-page-modern">
      {/* Hero Section - Redesigned */}
      <section className="about-hero-section position-relative overflow-hidden">
        {/* Background with gradient and pattern */}
        <div className="about-hero-bg">
          <div className="bg-gradient-layer-1"></div>
          <div className="bg-gradient-layer-2"></div>
          <div className="bg-pattern-premium"></div>
        </div>

        {/* Animated background elements */}
        <div className="hero-animated-elements">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
        </div>

        {/* Floating Icons - Correct Original Styles */}
        <div className="floating-icons-premium">
          <div className="floating-icon-premium icon-1">
            <div className="icon-glow"></div>
            <i className="bi bi-building"></i>
          </div>
          <div className="floating-icon-premium icon-2">
            <div className="icon-glow"></div>
            <i className="bi bi-heart-pulse"></i>
          </div>
          <div className="floating-icon-premium icon-3">
            <div className="icon-glow"></div>
            <i className="bi bi-award"></i>
          </div>
        </div>

        <div className="container position-relative z-3">
          <div className="row align-items-center min-vh-50 py-4">
            {/* Text Content - Left Side */}
            <div className="col-lg-6 col-md-7">
              <div className="hero-content-premium pe-lg-4">
                <h1 className="hero-title-premium mb-3">
                  <span className="title-line-1 d-block fw-bold">
                    {about.hero.title}
                  </span>
                  <span className="title-line-2 text-gradient-premium d-block fw-bold">
                    {about.hero.subtitle}
                  </span>
                </h1>

                <p className="hero-description-premium mb-4">
                  {about.hero.description}
                </p>
              </div>
            </div>

            {/* Statistics - Right Side */}
            <div className="col-lg-6 col-md-5">
              <div className="stats-grid-premium row g-3">
                {about.statistics.map((stat, index) => (
                  <div key={index} className="col-6">
                    <div className="stat-card-premium text-center p-3 position-relative">
                      <div className="stat-icon-container mb-2">
                        <i className={`bi ${stat.icon} stat-icon`}></i>
                        <div className="stat-icon-glow"></div>
                      </div>
                      <div className="stat-value-premium fw-bold mb-1">
                        {stat.value}
                      </div>
                      <div className="stat-label-premium small">
                        {stat.label}
                      </div>
                      <div className="stat-card-border"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-section py-5 position-relative">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <h2 className="section-title-premium mb-3">
                {about.mission.title}
              </h2>
              <div className="title-divider-premium mb-4"></div>
            </div>
          </div>

          <div className="row g-4">
            {/* Story */}
            <div className="col-lg-4">
              <div className="mission-card glass-admin-card h-100">
                <div className="glass-card-body text-center p-4">
                  <div className="mission-icon mb-4">
                    <i className="bi bi-journal-text"></i>
                  </div>
                  <h4 className="mission-title mb-3">
                    {about.mission.story.title}
                  </h4>
                  <p className="mission-text text-muted">
                    {about.mission.story.content}
                  </p>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="col-lg-4">
              <div className="mission-card glass-admin-card h-100">
                <div className="glass-card-body text-center p-4">
                  <div className="mission-icon mb-4">
                    <i className="bi bi-bullseye"></i>
                  </div>
                  <h4 className="mission-title mb-3">
                    {about.mission.mission.title}
                  </h4>
                  <p className="mission-text text-muted">
                    {about.mission.mission.content}
                  </p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="col-lg-4">
              <div className="mission-card glass-admin-card h-100">
                <div className="glass-card-body text-center p-4">
                  <div className="mission-icon mb-4">
                    <i className="bi bi-eye"></i>
                  </div>
                  <h4 className="mission-title mb-3">
                    {about.mission.vision.title}
                  </h4>
                  <p className="mission-text text-muted">
                    {about.mission.vision.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Features Section */}
      <section className="features-section py-5 bg-light position-relative">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <h2 className="section-title-premium mb-3">
                {about.clinicInfo.title}
              </h2>
              <p className="section-description-premium">
                {about.clinicInfo.description}
              </p>
              <div className="title-divider-premium mb-4"></div>
            </div>
          </div>

          <div className="row g-4">
            {about.clinicInfo.features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="feature-card-modern text-center p-4">
                  <div className="feature-icon-modern mb-4">
                    <i className={`bi ${feature.icon}`}></i>
                  </div>
                  <h5 className="feature-title-modern mb-3">{feature.title}</h5>
                  <p className="feature-description-modern text-muted small">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section py-5 position-relative">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <h2 className="section-title-premium mb-3">
                {about.values.title}
              </h2>
              <div className="title-divider-premium mb-4"></div>
            </div>
          </div>

          <div className="row g-4">
            {about.values.items.map((value, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="value-card glass-admin-card h-100 text-center p-4">
                  <div className="value-icon mb-4">
                    <i className={`bi ${value.icon}`}></i>
                  </div>
                  <h5 className="value-title mb-3">{value.title}</h5>
                  <p className="value-description text-muted small">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA Section */}
      <section className="team-cta-section py-5 bg-light position-relative">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h3 className="mb-3">{about.team.title}</h3>
              <p className="text-muted mb-4">{about.team.description}</p>
              <a href={about.team.cta.link} className="btn elegant-btn">
                {about.team.cta.text}
                <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-section py-5 position-relative">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <h2 className="section-title-premium mb-3">
                {about.contactInfo.title}
              </h2>
              <div className="title-divider-premium mb-4"></div>
            </div>
          </div>

          <div className="row g-4">
            {/* Address */}
            <div className="col-md-4">
              <div className="contact-card text-center p-4">
                <div className="contact-icon mb-4">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <h5 className="contact-title mb-3">Location</h5>
                <p className="contact-info text-muted">
                  {about.contactInfo.address.street}
                  <br />
                  {about.contactInfo.address.city}
                  <br />
                  {about.contactInfo.address.postal}
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="col-md-4">
              <div className="contact-card text-center p-4">
                <div className="contact-icon mb-4">
                  <i className="bi bi-clock"></i>
                </div>
                <h5 className="contact-title mb-3">Opening Hours</h5>
                <div className="contact-info text-muted">
                  <p className="mb-1">{about.contactInfo.hours.weekdays}</p>
                  <p className="mb-1">{about.contactInfo.hours.saturday}</p>
                  <p className="mb-0">{about.contactInfo.hours.sunday}</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="col-md-4">
              <div className="contact-card text-center p-4">
                <div className="contact-icon mb-4">
                  <i className="bi bi-telephone"></i>
                </div>
                <h5 className="contact-title mb-3">Contact Us</h5>
                <div className="contact-info text-muted">
                  <p className="mb-2">
                    <i className="bi bi-phone me-2"></i>
                    {about.contactInfo.contact.phone}
                  </p>
                  <p className="mb-0">
                    <i className="bi bi-envelope me-2"></i>
                    {about.contactInfo.contact.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
