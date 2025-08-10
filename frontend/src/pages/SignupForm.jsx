import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const SignupForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userType: '',
    name: '',
    age: '',
    nic: '',
    email: '',
    contact: '',
    district: '',
    city: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  const validate = async () => {
    const newErrors = {}

    if (!formData.userType) newErrors.userType = 'User type is required'
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.age || isNaN(formData.age)) newErrors.age = 'Valid age required'
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/))
      newErrors.email = 'Must be a valid Gmail address'
    if (!formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/))
      newErrors.password = 'Password must be 8+ chars with upper, lower, number'
    if (!formData.contact) newErrors.contact = 'Contact is required'

    // Check if email already exists via backend
    try {
      const res = await axios.post('http://localhost:3001/api/check-email', {
        email: formData.email,
        userType: formData.userType
      })
      if (res.data.exists) newErrors.email = 'Email already registered'
    } catch (err) {
      console.error(err)
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const isValid = await validate()
    if (!isValid) return

    try {
      const res = await axios.post('http://localhost:3001/api/signup', formData)
      alert(res.data.message)
      navigate('/login')
    } catch (error) {
      alert('Signup failed')
    }
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-form container mt-5 p-4 shadow bg-white rounded">
        <h2 className="text-center mb-4">Create your account</h2>
        <form onSubmit={handleSubmit}>
          {/* User Type */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>I am a</label>
              <select
                className="form-control"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="">Select User Type</option>
                <option value="Customer">Customer</option>
                <option value="Service Provider">Service Provider</option>
              </select>
              <div className="text-danger">{errors.userType}</div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Full name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <div className="text-danger">{errors.name}</div>
            </div>

            <div className="col-md-6 mb-3">
              <label>Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
              <div className="text-danger">{errors.age}</div>
            </div>

            <div className="col-md-6 mb-3">
              <label>NIC</label>
              <input
                type="text"
                className="form-control"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="text-danger">{errors.email}</div>
            </div>

            <div className="col-md-6 mb-3">
              <label>Contact</label>
              <input
                type="text"
                className="form-control"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
              <div className="text-danger">{errors.contact}</div>
            </div>

            <div className="col-md-6 mb-3">
              <label>District</label>
              <input
                type="text"
                className="form-control"
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12 mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="text-danger">{errors.password}</div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign up</button>
          <p className="mt-3 text-center">Already have an account? <Link to="/login">Log in</Link></p>
        </form>
      </div>
    </div>
  )
}

export default SignupForm
