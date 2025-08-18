// src/pages/adminPages/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const ManageUsers = () => {
  const [customers, setCustomers] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3002/api/allUsers", {
        withCredentials: true,
      });
      setCustomers(res.data.customers || []);
      setServiceProviders(res.data.serviceProviders || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({ ...user });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:3002/api/updateProfile", formData, {
        withCredentials: true,
      });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:3002/api/deleteUser/${id}`, {
        withCredentials: true,
      });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const renderTable = (title, data) => (
    <div className="mt-4">
      <h4>{title}</h4>
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>NIC</th>
            <th>Email</th>
            <th>Contact</th>
            <th>District</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="number"
                    name="age"
                    value={formData.age || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  user.age
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  user.nic
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  user.contact
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    name="district"
                    value={formData.district || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  user.district
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  user.city
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                ) : (
                  <i
                    className="bi bi-pencil-square text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(user)}
                  ></i>
                )}
              </td>
              <td>
                <i
                  className="bi bi-trash text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(user.id)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <h3 className="fw-bold">Manage Users</h3>
      {renderTable("Customers", customers)}
      {renderTable("Service Providers", serviceProviders)}
    </>
  );
};

export default ManageUsers;
