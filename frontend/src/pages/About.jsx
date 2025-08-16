import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import aboutImg from "../assets/about.png";

const About = () => {
  return (
    <div className="about-page container py-5">
      
      <div className="row align-items-center mb-5">
        
        <div className="col-md-5 text-center">
          <img
            src={aboutImg}
            alt="About SkillHive"
            className="img-fluid rounded shadow-lg"
          />
        </div>
        
        <div className="col-md-7">
          <h1 className="about-title">
            About SkillHive
          </h1>
          <h4 className="text-muted mb-3">
            Your trusted service partner
          </h4>
          <p className="lead">
            At SkillHive, we believe in connecting people with the right experts for
            any job. Whether you need a reliable service provider or want to showcase
            your skills, SkillHive is the bridge that brings opportunities closer to you.
          </p>
          <p>
            Our mission is simple — to create a trusted, user-friendly, and efficient
            platform where customers and service providers can connect, collaborate,
            and grow together. With our innovative tools and features, you can easily
            manage bookings, track service history, and leave valuable feedback.
          </p>
        </div>
      </div>

      
      <div className="our-values text-center">
        <h2 className="fw-bold mb-4">Our Values</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <i className="bi bi-shield-check icon-trust"></i>
                <h5 className="card-title fw-bold">Trust & Reliability</h5>
                <p className="card-text">
                  We ensure all our service providers meet the highest standards of
                  professionalism and quality.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <i className="bi bi-lightbulb icon-innovation"></i>
                <h5 className="card-title fw-bold">Innovation</h5>
                <p className="card-text">
                  We continuously evolve to bring modern solutions for seamless
                  service management and booking experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <i className="bi bi-people icon-community"></i>
                <h5 className="card-title fw-bold">Community</h5>
                <p className="card-text">
                  Building strong connections between customers and service providers
                  to create long-lasting relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
