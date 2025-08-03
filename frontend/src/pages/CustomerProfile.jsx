import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import defaultAvatar from '../assets/default-avatar.png'
import logo from '../assets/SkillHive.png'
import '../App.css'

const CustomerProfile = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3002/api/getProfile', {
          withCredentials: true, // IMPORTANT for cookie-based auth
        })
        setUser(res.data)
      } catch (err) {
        console.error('Unauthorized or error fetching profile:', err)
        navigate('/login')
      }
    }

    fetchProfile()
  }, [navigate])

  if (!user) {
    return <div className="text-center my-5">Loading profile...</div>
  }

  return (
    <div>
      {/* Top profile card */}
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <img src={logo} alt="Logo" style={{ height: '60px' }} />
        </div>

        <div className="row">
          {/* Profile Info */}
          <div className="col-md-8 text-center">
            <img
              src={user.profilePicture || defaultAvatar}
              alt="Profile"
              className="rounded-circle mb-3"
              width="120"
              height="120"
              style={{ objectFit: 'cover' }}
            />
            <h4 className="fw-bold">{user.name}</h4>
            <p className="text-muted">4.9 · 123 reviews</p>

            <div className="mt-5 text-start">
              <h5 className="fw-bold mb-3">About</h5>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Age</strong><br />
                  {user.age}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>District</strong><br />
                  {user.district}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>City</strong><br />
                  {user.city}
                </div>
              </div>
            </div>
          </div>

          {/* Verified Info */}
          <div className="col-md-4">
            <h5 className="fw-bold">Verified</h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2"><i className="bi bi-credit-card-2-front me-2"></i> NIC</li>
              <li className="mb-2"><i className="bi bi-telephone-fill me-2"></i> Phone number</li>
              <li className="mb-2"><i className="bi bi-envelope-fill me-2"></i> Email address</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerProfile
