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
import Contact from '../pages/Contact'
import Services from '../pages/Services'
import AddService from '../pages/AddService';
import ManageServices from '../pages/adminPages/ManageServices';

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
      <Route path="/contact" element={<Contact/>} />
      <Route path="/services" element={<Services/>} />
      <Route path="/addservice" element={<AddService />} />

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
        path="/manage-users"
        element={
          <AdminLayout>
            <ManageUsers />
          </AdminLayout>
        }
      />
      <Route
        path="/manage-services"
        element={
          <AdminLayout>
            <ManageServices />
          </AdminLayout>
        }
      />
    </Routes>
  )
}

export default AppRoutes
