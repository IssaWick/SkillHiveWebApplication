import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/SkillHive.png'
import defaultAvatar from '../assets/default-avatar.png'

const Navbar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3002/api/getProfile', {
          withCredentials: true,
        })
        setUser(res.data)
      } catch (err) {
        setUser(null) // not logged in
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = () => {
    // Clear token cookie on the server (optional)
    // For now, we just navigate to login
    navigate('/login')
  }

  const handleProfileClick = () => {
    if (user?.userType === 'Customer') {
      navigate('/profile/customer')
    } else if (user?.userType === 'Service Provider') {
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

            {user ? (
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
                    src={user.profilePicture || defaultAvatar}
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
