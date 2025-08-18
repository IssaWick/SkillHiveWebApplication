import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import SignupForm from '../pages/SignupForm'
import Login from '../pages/Login'
import CustomerProfile from '../pages/CustomerProfile'
import ServiceProviderProfile from '../pages/ServiceProviderProfile';
import ProviderHome from '../pages/ProviderHome'
import FindServices from '../pages/FindServices'
import QuickBookForm from '../pages/QuickBookForm'
import About from '../pages/About'
import AdminDashboard from "../pages/adminPages/adminDashboard";
import ManageUsers from "../pages/adminPages/ManageUsers";
import AdminLayout from "../layouts/AdminLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/About" element={<About />} />
      <Route path="/providerhome" element={<ProviderHome />} />
      <Route path="/findservices" element={<FindServices />} />
        <Route path="/quickbookform" element={<QuickBookForm />} />
      <Route path="/customer-profile" element={<CustomerProfile />} />
      <Route path="/service-provider-profile" element={<ServiceProviderProfile />} />

      {/* Admin Routes inside AdminLayout */}
      <Route
        path="/admin-dashboard"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/Manage-Users"
        element={
          <AdminLayout>
            <ManageUsers />
          </AdminLayout>
        }
      />
    </Routes>
  )
}

export default AppRoutes
