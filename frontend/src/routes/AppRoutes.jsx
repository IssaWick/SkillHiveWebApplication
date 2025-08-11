import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import SignupForm from '../pages/SignupForm'
import LoginForm from '../pages/LoginForm'
import CustomerProfile from '../pages/CustomerProfile'
import CreteService from '../pages/CreateService'
import ProviderHome from '../pages/ProviderHome'


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userType')
  return token ? children : <Navigate to="/signup" />
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/creteservice" element={<CreteService />} />
       <Route path="/providerhome" element={<ProviderHome />} />
      <Route path="/profile/customer" element={<ProtectedRoute><CustomerProfile /></ProtectedRoute>} />
    </Routes>
  )
}

export default AppRoutes
