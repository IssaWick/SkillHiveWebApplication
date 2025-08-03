import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/SkillHive.png'
import defaultAvatar from '../assets/default-avatar.png'

const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const userType = localStorage.getItem('userType')
  const profilePicture = localStorage.getItem('profilePicture') // fallback if null

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const handleProfileClick = () => {
    if (userType === 'Customer') {
      navigate('/profile/customer')
    } else if (userType === 'Service Provider') {
      navigate('/profile/serviceprovider')
    }
  }

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#4CB67A' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center text-white" to="/">
          <img src={logo} alt="SkillHive Logo" width="45" className="me-2" />
          <strong>SKILLHIVE</strong>
        </Link>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/contact">Contact</Link>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/hired-services">Hired Services</Link>
                </li>
                <li className="nav-item mx-2">
                  <button
                    className="btn btn-outline-light rounded-circle"
                    onClick={() => alert('Notifications')}
                  >
                    <i className="bi bi-bell-fill"></i>
                  </button>
                </li>
                <li className="nav-item">
                  <img
                    src={profilePicture || defaultAvatar}
                    alt="Profile"
                    className="rounded-circle"
                    width="40"
                    height="40"
                    style={{ cursor: 'pointer', objectFit: 'cover' }}
                    onClick={handleProfileClick}
                  />
                </li>
                <li className="nav-item ms-3">
                  <button className="btn btn-light" onClick={handleLogout}>Logout</button>
                </li>
              </>
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
