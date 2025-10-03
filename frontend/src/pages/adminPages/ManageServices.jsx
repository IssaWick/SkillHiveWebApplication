import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "../../App.css";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState(""); // NEW state

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:3002/api/allServices", {
        withCredentials: true,
      });
      setServices(res.data || []);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:3002/api/updateServiceStatus/${id}`,
        { status },
        { withCredentials: true }
      );
      fetchServices();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await axios.delete(`http://localhost:3002/api/deleteServiceById/${id}`, {
        withCredentials: true,
      });
      fetchServices();
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  const renderTable = (filterStatus) => {
    let filtered = services.filter(
      (s) =>
        (filterStatus === "pending" && s.status === "Pending") ||
        (filterStatus === "accept" && s.status === "Accept") ||
        (filterStatus === "declined" && s.status === "Declined")
    );

    // 🔍 Apply search term (matches id, name, type, provider_id, city, district)
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.service_id.toString().includes(term) ||
          s.service_name.toLowerCase().includes(term) ||
          s.service_type.toLowerCase().includes(term) ||
          s.provider_id.toString().includes(term) ||
          s.city.toLowerCase().includes(term) ||
          s.district.toLowerCase().includes(term)
      );
    }

    return (
      <div className="mt-4">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Provider ID</th>
              <th>City</th>
              <th>District</th>
              <th>Certificate</th>
              {filterStatus === "pending" && <th>Actions</th>}
              {(filterStatus === "accept" || filterStatus === "declined") && (
                <th>Delete</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((service) => (
              <tr key={service.service_id}>
                <td>{service.service_id}</td>
                <td>{service.service_name}</td>
                <td>{service.service_type}</td>
                <td>{service.description}</td>
                <td>{service.provider_id}</td>
                <td>{service.city}</td>
                <td>{service.district}</td>
                <td>
                  {service.certificate ? (
                    <a href={service.certificate} target="_blank" rel="noreferrer">
                      Download
                    </a>
                  ) : (
                    "No File"
                  )}
                </td>
                {filterStatus === "pending" && (
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() =>
                        handleStatusUpdate(service.service_id, "Accept")
                      }
                    >
                      <i className="bi bi-check-lg"></i>
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleStatusUpdate(service.service_id, "Declined")
                      }
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </td>
                )}
                {(filterStatus === "accept" || filterStatus === "declined") && (
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(service.service_id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center mt-3">No services found.</p>
        )}
      </div>
    );
  };

  return (
    <div>
      <h3 className="fw-bold">Manage Services</h3>

      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="Search services..."
        className="form-control my-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Services
        </button>
        <button
          className={`tab-btn ${activeTab === "accept" ? "active" : ""}`}
          onClick={() => setActiveTab("accept")}
        >
          Accepted Services
        </button>
        <button
          className={`tab-btn ${activeTab === "declined" ? "active" : ""}`}
          onClick={() => setActiveTab("declined")}
        >
          Declined Services
        </button>
      </div>

      {activeTab === "pending" && renderTable("pending")}
      {activeTab === "accept" && renderTable("accept")}
      {activeTab === "declined" && renderTable("declined")}
    </div>
  );
};

export default ManageServices;
