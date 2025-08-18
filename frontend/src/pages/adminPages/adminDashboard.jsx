// src/pages/adminPages/AdminDashboard.jsx
import React from "react";
import "../../App.css";

const AdminDashboard = () => {
  return (
    <>
      <h3 className="fw-bold">Dashboard</h3>

      {/* Stats */}
      <div className="row g-3 mt-3">
        <div className="col-md-3">
          <div className="stat-card p-3 shadow-sm bg-white rounded">
            <h5>Total Users</h5>
            <h3>
              1,250 <span className="text-success fs-6">+10%</span>
            </h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card p-3 shadow-sm bg-white rounded">
            <h5>Total Service Providers</h5>
            <h3>
              850 <span className="text-success fs-6">+5%</span>
            </h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card p-3 shadow-sm bg-white rounded">
            <h5>Pending Approvals</h5>
            <h3>
              35 <span className="text-danger fs-6">-2%</span>
            </h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card p-3 shadow-sm bg-white rounded">
            <h5>Total Bookings</h5>
            <h3>
              520 <span className="text-success fs-6">+8%</span>
            </h3>
          </div>
        </div>
      </div>

      {/* Quick Analytics */}
      <div className="row g-3 mt-4">
        <div className="col-md-6">
          <div className="p-3 shadow-sm bg-white rounded">
            <h5>Bookings Over Time</h5>
            <p className="mb-1">
              <strong>120</strong> Last 7 Days{" "}
              <span className="text-success">+15%</span>
            </p>
            <div
              className="chart-placeholder bg-light rounded"
              style={{ height: "150px" }}
            ></div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-3 shadow-sm bg-white rounded">
            <h5>Service Category Distribution</h5>
            <p className="mb-1">
              <strong>100</strong> Current Month{" "}
              <span className="text-success">+5%</span>
            </p>
            <div className="progress mb-2">
              <div className="progress-bar bg-success" style={{ width: "70%" }}>
                Electrical
              </div>
            </div>
            <div className="progress mb-2">
              <div className="progress-bar bg-primary" style={{ width: "50%" }}>
                Plumbing
              </div>
            </div>
            <div className="progress mb-2">
              <div className="progress-bar bg-warning" style={{ width: "40%" }}>
                Tutoring
              </div>
            </div>
            <div className="progress mb-2">
              <div className="progress-bar bg-info" style={{ width: "60%" }}>
                Cleaning
              </div>
            </div>
            <div className="progress">
              <div
                className="progress-bar bg-secondary"
                style={{ width: "30%" }}
              >
                Other
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
