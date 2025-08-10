import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import SignupForm from '../pages/SignupForm'
import Login from '../pages/Login'
import CustomerProfile from '../pages/CustomerProfile'
import ServiceProviderProfile from '../pages/ServiceProviderProfile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/customer-profile" element={<CustomerProfile />} />
      <Route path="/service-provider-profile" element={<ServiceProviderProfile />} />
    </Routes>
  )
}

export default AppRoutes
