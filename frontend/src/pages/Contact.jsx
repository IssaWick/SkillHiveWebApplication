import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import bannerImage from '../assets/contactus.png'

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [toast, setToast] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      setToast({ message: data.message, type: "success" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setToast({ message: "Something went wrong. Please try again.", type: "error" });
    }
  } catch (error) {
    setToast({ message: "Failed to send message. Try later.", type: "error" });
  }

  // Remove toast after 3 seconds
  setTimeout(() => setToast({ message: "", type: "" }), 3000);
};




  return (
    <div>
      
      {/* ---------- Banner Section ---------- */}
      <div className="contact-banner" style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className="contact-banner-overlay">
          <h1>Contact Us</h1>
        </div>
      </div>

      {/* ---------- Contact Form & Info ---------- */}
      <div className="contact-wrapper">
        {/* Left Part */}
        <div className="contact-left">
          <h2>Get In Touch</h2>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Write your message here..."
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="contact-send-btn">
              Send Message
            </button>
          </form>
        </div>

        {/* Right Part */}
        <div className="contact-right">
          <div className="contact-info-box">
            <div>
              <FaPhoneAlt className="contact-info-icon" />
              <h4>Phone Number</h4>
              <p>+94 77 123 4567</p>
            </div>
          </div>

          <div className="contact-info-box">
            
            <div>
              <FaEnvelope className="contact-info-icon" />
              <h4>Email</h4>
              <p>info@skillhive.com</p>
            </div>
          </div>

          <div className="contact-info-box">
            
            <div>
              <FaMapMarkerAlt className="contact-info-icon" />
              <h4>Location</h4>
              <p>Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Map Section ---------- */}
      <div className="contact-map-section">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126742.10461643393!2d79.77344660294118!3d6.927078600000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593b23c8dfb7%3A0xf5f6e3a46b7b7a5!2sColombo!5e0!3m2!1sen!2slk!4v1695119432711!5m2!1sen!2slk"
          width="80%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
