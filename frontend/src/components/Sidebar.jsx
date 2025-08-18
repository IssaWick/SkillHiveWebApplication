// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <aside className="sidebar bg-white shadow-sm">
      <div className="sidebar-logo p-3 d-flex align-items-center">
        <i className="bi bi-house-door-fill text-success fs-5 me-2"></i>
        <span className="fw-bold fs-5">Admin Panel</span>
      </div>
      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <Link to="/admin-dashboard" className={`nav-link ${isActive("/admin-dashboard")}`}>
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Manage-Users" className={`nav-link ${isActive("/Manage-Users")}`}>
            <i className="bi bi-people me-2"></i> Manage Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link">
            <i className="bi bi-list-ul me-2"></i> Service Categories
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link">
            <i className="bi bi-bar-chart-line me-2"></i> Bookings & Analytics
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link">
            <i className="bi bi-person-workspace me-2"></i> Service Providers
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link">
            <i className="bi bi-chat-left-text me-2"></i> Complaints
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
