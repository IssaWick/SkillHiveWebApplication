import React from 'react'
import logo from '../assets/SkillHive.png'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} alt="SkillHive Logo" className="me-2" />
        </a>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
