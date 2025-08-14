import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/default-avatar.png";
import "../App.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3002/api";

const ServiceProviderProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [removePic, setRemovePic] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE}/getProfile`, {
          withCredentials: true,
        });

        const profile = res.data;

        // Ensure only Service Provider can access
        if (profile.userType !== "Service Provider") {
          navigate("/");
          return;
        }

        setUser(profile);
        setFormData(profile);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleEditClick = () => setEditMode(true);
  const handleCancelClick = () => {
    setFormData(user);
    setSelectedImage(null);
    setRemovePic(false);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setRemovePic(false);
    }
  };

  const handleRemovePicToggle = () => {
    setSelectedImage(null);
    setRemovePic((v) => !v);
  };

  const handleSaveClick = async () => {
    try {
      const data = new FormData();
      const updatable = ["name", "contact", "district", "city", "age", "nic", "email"];
      updatable.forEach((k) => {
        if (formData[k] !== undefined && formData[k] !== null) {
          data.append(k, formData[k]);
        }
      });

      if (selectedImage) data.append("profilePic", selectedImage);
      if (removePic && !selectedImage) data.append("removePic", "true");

      const res = await axios.put(`${API_BASE}/updateProfile`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        setUser(res.data);
        setFormData(res.data);
        setEditMode(false);
        setSelectedImage(null);
        setRemovePic(false);
      }
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to update profile");
    }
  };

  if (!user) return <div className="text-center mt-5">Loading profile...</div>;

  const previewSrc =
    selectedImage
      ? URL.createObjectURL(selectedImage)
      : removePic
      ? defaultAvatar
      : user.profilePicture || defaultAvatar;

  return (
    <div className="container mt-5">
      <div className="d-flex flex-wrap justify-content-between align-items-start">
        {/* Left Section: Profile Picture, Name, Reviews, Edit */}
        <div className="text-center flex-grow-1">
          <div className="position-relative d-inline-block">
            <img
              src={previewSrc}
              alt="Profile"
              className="rounded-circle"
              style={{ width: 150, height: 150, objectFit: "cover" }}
            />
            {editMode && (
              <div className="d-flex justify-content-center gap-2 mt-2">
                <label className="btn btn-sm btn-outline-primary mb-0">
                  <i className="bi bi-camera me-1" /> Change
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                </label>
                <button
                  type="button"
                  className={`btn btn-sm ${removePic ? "btn-danger" : "btn-outline-danger"}`}
                  onClick={handleRemovePicToggle}
                  disabled={!!selectedImage}
                  title={selectedImage ? "Remove disabled when new image selected" : ""}
                >
                  <i className="bi bi-x-circle me-1" />
                  {removePic ? "Will Remove" : "Remove"}
                </button>
              </div>
            )}
          </div>

          {/* Name */}
          <div className="mt-3">
            {editMode ? (
              <input
                type="text"
                name="name"
                className="form-control d-inline-block text-center"
                style={{ maxWidth: 300 }}
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Name"
              />
            ) : (
              <h3>{user.name}</h3>
            )}
          </div>

          {/* Reviews */}
          {!editMode && <div className="text-muted mb-2">4.9 · 123 reviews</div>}

          {/* Edit Button */}
          {!editMode && (
            <button className="btn btn-outline-primary btn-sm" onClick={handleEditClick}>
              <i className="bi bi-pencil me-1" /> Edit
            </button>
          )}
        </div>

        {/* Right Section: Verified Info */}
        <div style={{ minWidth: 250 }}>
          <h5>Verified</h5>
          <p>
            <i className="bi bi-card-text me-2" />
            {editMode ? (
              <input
                type="text"
                name="nic"
                className="form-control d-inline-block"
                style={{ width: 200 }}
                value={formData.nic || ""}
                onChange={handleChange}
                placeholder="NIC"
              />
            ) : (
              user.nic
            )}
          </p>
          <p>
            <i className="bi bi-telephone me-2" />
            {editMode ? (
              <input
                type="text"
                name="contact"
                className="form-control d-inline-block"
                style={{ width: 200 }}
                value={formData.contact || ""}
                onChange={handleChange}
                placeholder="Contact"
              />
            ) : (
              user.contact
            )}
          </p>
          <p>
            <i className="bi bi-envelope me-2" />
            {editMode ? (
              <input
                type="email"
                name="email"
                className="form-control d-inline-block"
                style={{ width: 200 }}
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Email"
              />
            ) : (
              user.email
            )}
          </p>
        </div>
      </div>

      <hr className="my-4" />

      {/* About Section */}
      <div>
        <h5>About</h5>
        <div className="row mt-3">
          <div className="col-md-4 mb-2">
            <strong>Age</strong>
            <br />
            {editMode ? (
              <input
                type="number"
                name="age"
                className="form-control"
                value={formData.age ?? ""}
                onChange={handleChange}
              />
            ) : (
              user.age
            )}
          </div>
          <div className="col-md-4 mb-2">
            <strong>District</strong>
            <br />
            {editMode ? (
              <input
                type="text"
                name="district"
                className="form-control"
                value={formData.district || ""}
                onChange={handleChange}
              />
            ) : (
              user.district
            )}
          </div>
          <div className="col-md-4 mb-2">
            <strong>City</strong>
            <br />
            {editMode ? (
              <input
                type="text"
                name="city"
                className="form-control"
                value={formData.city || ""}
                onChange={handleChange}
              />
            ) : (
              user.city
            )}
          </div>
        </div>
      </div>

      {/* Save/Cancel Buttons aligned left */}
      {editMode && (
        <div className="d-flex gap-2 mt-4 mb-5">
          <button
            type="button"
            className="btn btn-sm btn-outline-success"
            onClick={handleSaveClick}
          >
            <i className="bi bi-check-circle me-1" /> Save Changes
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={handleCancelClick}
          >
            <i className="bi bi-x-circle me-1" /> Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderProfile;
