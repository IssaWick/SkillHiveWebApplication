import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service_name: "",
    service_type: "",
    description: "",
    city: "",
    district: "",
    certificate: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "certificate") {
      setFormData({ ...formData, certificate: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.service_name) newErrors.service_name = "Service name is required";
    if (!formData.service_type) newErrors.service_type = "Service type is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.district) newErrors.district = "District is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const data = new FormData();
      data.append("service_name", formData.service_name);
      data.append("service_type", formData.service_type);
      data.append("description", formData.description);
      data.append("city", formData.city);
      data.append("district", formData.district);
      if (formData.certificate) {
        data.append("certificate", formData.certificate);
      }

      const res = await axios.post("http://localhost:3002/api/addService", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message || "Service added successfully!");
      navigate("/providerhome");
    } catch (err) {
      console.error(err);
      alert("Failed to add service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="service-wrapper">
      <div className="service-form container mt-5 p-4 shadow bg-white rounded">
        <h2 className="text-center mb-4">Add New Service</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Service Name</label>
              <input
                type="text"
                className="form-control"
                name="service_name"
                value={formData.service_name}
                onChange={handleChange}
              />
              <div className="text-danger">{errors.service_name}</div>
            </div>

            <div className="col-md-6 mb-3">
              <label>Service Type</label>
              <input
                type="text"
                className="form-control"
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
              />
              <div className="text-danger">{errors.service_type}</div>
            </div>

            <div className="col-md-12 mb-3">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              />
              <div className="text-danger">{errors.description}</div>
            </div>

            <div className="col-md-6 mb-3">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <div className="text-danger">{errors.city}</div>
            </div>

            <div className="col-md-6 mb-3">
              <label>District</label>
              <input
                type="text"
                className="form-control"
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
              <div className="text-danger">{errors.district}</div>
            </div>

            <div className="col-md-12 mb-3">
              <label>Upload Certificate (Optional)</label>
              <input
                type="file"
                className="form-control"
                name="certificate"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Adding..." : "Add Service"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
