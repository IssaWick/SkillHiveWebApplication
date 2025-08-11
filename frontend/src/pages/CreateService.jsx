import React, { useState, useEffect } from "react";
import "../ServicePage.css"; 

const ServicePage = () => {
  const [serviceId, setServiceId] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [description, setDescription] = useState("");

  const serviceTypes = [
    "Plumbing",
    "Electrical Repairs",
    "House Cleaning",
    "Pest Control",
    "AC Repair",
    "Painting",
    "Moving & Shifting",
    "Appliance Repair",
    "Carpentry",
    "Car Wash & Maintenance",
  ];

  useEffect(() => {
    const uniqueId = `SRV-${Date.now().toString().slice(-6)}`;
    setServiceId(uniqueId);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || file.type === "image/png")) {
      setCertificateFile(file);
    } else {
      alert("Only PDF or PNG files are allowed");
      e.target.value = null;
      setCertificateFile(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!certificateFile) {
      alert("Please upload a valid certificate file (PDF or PNG).");
      return;
    }

    const formData = new FormData();
    formData.append("serviceId", serviceId);
    formData.append("serviceName", serviceName);
    formData.append("serviceType", serviceType);
    formData.append("description", description);
    formData.append("certificateFile", certificateFile);

    console.log("Form Data Prepared:", {
      serviceId,
      serviceName,
      serviceType,
      description,
      certificateFile: certificateFile.name,
    });

    setServiceName("");
    setServiceType("");
    setDescription("");
    setCertificateFile(null);
    setServiceId(`SRV-${Date.now().toString().slice(-6)}`);
  };

  return (
    <div className="service-page-container">
      <h2 className="form-title">Add New Service</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>
            <strong>Service ID:</strong>
            <input type="text" value={serviceId} readOnly className="form-input readonly" />
          </label>
        </div>

        <div className="form-group">
          <label>
            <strong>Service Name:</strong>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              required
              className="form-input"
              placeholder="Enter service name"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            <strong>Service Type:</strong>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
              className="form-input"
            >
              <option value="">Select type</option>
              {serviceTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            <strong>Certificate (PDF or PNG):</strong>
            <input
              type="file"
              accept=".pdf,.png"
              onChange={handleFileChange}
              required
              className="form-file"
            />
            {certificateFile && <p className="file-info">Selected: {certificateFile.name}</p>}
          </label>
        </div>

        <div className="form-group">
          <label>
            <strong>Description:</strong>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe the service"
              className="form-textarea"
            />
          </label>
        </div>

        <button type="submit" className="submit-btn">Submit Service</button>
      </form>
    </div>
  );
};

export default ServicePage;
