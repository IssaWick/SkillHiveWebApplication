import React from 'react'
import logo from '../assets/SkillHive.png'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="SkillHive Logo" width="40" height="40" className="me-2" />
        </Link>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="#">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="#">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="#">Contact</Link>
            </li>
            {isLoggedIn ? (
              <li className="nav-item ms-3">
                <button className="btn btn-light" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li className="nav-item ms-3">
                <Link className="btn btn-light" to="/signup">Sign up</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
