import React from 'react'
import logo from '../assets/SkillHive.png'

const Footer = () => {
  return (
    <footer className="footer-area text-white pt-4 pb-3 custom-footer">
      <div className="container">
        <div className="row align-items-center mb-3">
          <div className="col-md-6 d-flex align-items-center">
            <img src={logo} alt="Logo" width="40" height="40" className="me-2-logo" />
          </div>
          <div className="col-md-6 text-md-end">
            <div>71/7, Niyandagala Road, Pannipitiya</div>
            <div>(123) 456-7890</div>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-md-6">
            <span>Social Media</span>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="social-icons">
              <i className="bi bi-facebook me-2"></i>
              <i className="bi bi-twitter me-2"></i>
              <i className="bi bi-linkedin me-2"></i>
              <i className="bi bi-instagram me-2"></i>
              <i className="bi bi-google me-2"></i>
              <i className="bi bi-pinterest me-2"></i>
              <i className="bi bi-rss"></i>
            </div>
          </div>
        </div>
        <div className="text-center pt-3">
          © 2024 SkillHive. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
