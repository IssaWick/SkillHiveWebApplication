import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SignupForm = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3001/api/signup', formData)
      alert(response.data.message)
      setFormData({
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
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message)
      alert(error.response?.data?.error || 'Signup failed')
    }
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-form container mt-5 p-4 shadow bg-white rounded">
        <h2 className="text-center mb-4">Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>I am a</label>
              <select
                className="form-control"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="">Select User Type</option>
                <option value="Customer">Customer</option>
                <option value="Service Provider">Service Provider</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label>Full name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>NIC</label>
              <input
                type="text"
                className="form-control"
                name="nic"
                placeholder="Enter your NIC"
                value={formData.nic}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Contact number</label>
              <input
                type="text"
                className="form-control"
                name="contact"
                placeholder="Enter your contact number"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>District</label>
              <input
                type="text"
                className="form-control"
                name="district"
                placeholder="Enter your district"
                value={formData.district}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12 mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-50">Sign up</button>
            <p className="mt-3">Already have an account? <Link to="/login">Log in</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupForm
