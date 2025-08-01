import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    userType: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3001/api/login', formData)
      const { token, userType } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('userType', userType)

      navigate('/')
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-form container mt-5 p-4 shadow bg-white rounded" style={{ maxWidth: 500 }}>
        <h2 className="text-center mb-4">Welcome!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
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
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 text-end">
            <a href="#">Forgotten Password?</a>
          </div>
          <button type="submit" className="btn btn-primary w-100">Log in</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
