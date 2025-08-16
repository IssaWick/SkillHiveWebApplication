import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../ServiceStage.css";

const serviceNames = ["All", "Plumbing", "Electrical", "Cleaning", "Gardening", "Painting",];
const districts = [
  "Ampara","Anuradhapura","Badulla","Batticaloa","Colombo","Galle",
  "Gampaha","Hambantota","Jaffna","Kalutara","Kandy","Kegalle",
  "Kilinochchi","Kurunegala","Mannar","Matale","Matara","Moneragala",
  "Mullaitivu","Nuwara Eliya","Polonnaruwa","Puttalam","Ratnapura","Trincomalee","Vavuniya"
];

export default function ServiceFilterWithProviderStage() {
  const [services, setServices] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(""); 
  const [selectedCity, setSelectedCity] = useState("");         
  const [selectedService, setSelectedService] = useState("All");
  const [selectedProvider, setSelectedProvider] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const params = {};
        if (selectedDistrict) params.district = selectedDistrict;
        if (selectedCity) params.city = selectedCity;
        if (selectedService !== "All") params.service_type = selectedService;

        const res = await axios.get("http://localhost:3005/matching/filter", { params });
        setServices(res.data.services || []);
      } catch (err) {
        console.error(err);
        setServices([]);
      }
    };
    fetchServices();
  }, [selectedDistrict, selectedCity, selectedService]);

  const handleProviderClick = async (service) => {
    try {
      const res = await axios.get(
        `http://localhost:3005/matching/provider/${service.provider_id}`
      );
      setSelectedProvider({
        ...res.data.provider,
        provider_id: service.provider_id,
        service_id: service.service_id,
        service_name: service.service_name,
        description: service.description,
      });
    } catch (err) {
      console.error("Error fetching provider details:", err);
    }
  };

  if (selectedProvider) {
    return (
      <div className="provider-stage">
        <h2>Provider Details</h2>
        <p><strong>Provider ID:</strong> {selectedProvider.id}</p>
        <p><strong>Name:</strong> {selectedProvider.name}</p>
        <p><strong>Email:</strong> {selectedProvider.email}</p>
        <p><strong>Contact:</strong> {selectedProvider.contact}</p>
        <p><strong>District:</strong> {selectedProvider.district}</p>
        <p><strong>Rating:</strong> {selectedProvider.ratings}</p>
        <p><strong>City:</strong> {selectedProvider.city}</p>
        <p><strong>Service:</strong> {selectedProvider.service_name}</p>
        <p><strong>Description:</strong> {selectedProvider.description}</p>

        <div className="provider-buttons">
          <button onClick={() => alert(`Booked ${selectedProvider.name}`)}>Book</button>
          <button
            onClick={() =>
              navigate("/quickbookform", { state: { provider: selectedProvider } })
            }
          >
            Quick request
          </button>
          <button onClick={() => setSelectedProvider(null)}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="service-container">
      <h2>Filter Services and Providers</h2>
      <div className="filter-controls">
        <label>
          District:
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </label>

        <label>
          City (optional):
          <input
            type="text"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            placeholder="Enter city"
          />
        </label>

        <label>
          Service:
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            {serviceNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="service-container2">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service.service_id} className="service-card">
              <h3>
                {service.service_name}{" "}
                {selectedCity === "" ? `- ${service.city}` : ""}
              </h3>
              <div className="provider-list">
                <div
                  className="provider-card"
                  onClick={() => handleProviderClick(service)}
                >
                  <p className="provider-description">{service.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No services found.</p>
        )}
      </div>
    </div>
  );
}
