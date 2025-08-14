import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../ServiceStage.css";

const allServices = [
  {
    name: "Plumbing",
    city: "Colombo",
    providers: [
      { provider_id: "1", service_id: "5", name: "Jaya Plumbing", description: "Experienced plumber for all household needs." },
      { provider_id: "p2", service_id: "S6", name: "Saman Plumbing", description: "Affordable and reliable plumbing services." },
      { provider_id: "p10", service_id: "S7", name: "CityFix Plumbing", description: "Quick emergency plumbing solutions." },
    ]
  },
  {
    name: "Electrical",
    city: "Kandy",
    providers: [
      { provider_id: "p3", service_id: "S8", name: "Kandy Electricians", description: "Certified electricians with 10+ years experience." },
      { provider_id: "p4", service_id: "S9", name: "Lanka Electricals", description: "Fast and safe electrical repairs." },
      { provider_id: "p5", service_id: "S10", name: "Power Plus", description: "Expert in residential and commercial wiring." },
    ]
  },
  {
    name: "Cleaning",
    city: "Galle",
    providers: [
      { provider_id: "p6", service_id: "S11", name: "Galle Cleaners", description: "Professional home and office cleaning." },
      { provider_id: "p7", service_id: "S12", name: "Sparkle Clean", description: "Eco-friendly cleaning services." },
    ]
  },
  {
    name: "Gardening",
    city: "Colombo",
    providers: [
      { provider_id: "p8", service_id: "S13", name: "GreenThumb Gardeners", description: "Lawn care and garden design." },
      { provider_id: "p9", service_id: "S14", name: "Nature Care", description: "Plant care and landscaping." },
    ]
  },
  {
    name: "Painting",
    city: "Negombo",
    providers: [
      { provider_id: "p11", service_id: "S15", name: "Negombo Painters", description: "Interior and exterior painting experts." },
      { provider_id: "p12", service_id: "S16", name: "Color Splash", description: "Affordable house painting services." },
    ]
  },
  {
    name: "Electrical",
    city: "Colombo",
    providers: [
      { provider_id: "p13", service_id: "S17", name: "Colombo Electric", description: "Reliable electrical installations and repairs." },
      { provider_id: "p14", service_id: "S18", name: "Safe Electric", description: "Safety-certified electricians." },
    ]
  },
];

const cities = ["All", "Colombo", "Kandy", "Galle", "Negombo"];
const serviceNames = ["All", "Plumbing", "Electrical", "Cleaning", "Gardening", "Painting"];

export default function ServiceFilterWithProviderStage() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedService, setSelectedService] = useState("All");
  const [selectedProvider, setSelectedProvider] = useState(null);

  const navigate = useNavigate();

  const filtered = allServices.filter(service => {
    const cityMatch = selectedCity === "All" || service.city === selectedCity;
    const serviceMatch = selectedService === "All" || service.name === selectedService;
    return cityMatch && serviceMatch;
  });

  if (selectedProvider) {
    return (
      <div className="provider-stage">
        <h2>Provider Details</h2>
        <p><strong>Provider ID:</strong> {selectedProvider.provider_id}</p>
        <p><strong>Service ID:</strong> {selectedProvider.service_id}</p>
        <p><strong>Provider Name:</strong> {selectedProvider.name}</p>
        <p><strong>Description:</strong> {selectedProvider.description}</p>

        <div className="provider-buttons">
          <button onClick={() => alert(`Booked ${selectedProvider.name} (Service ID: ${selectedProvider.service_id})`)}>
            Book
          </button>

          <button
            onClick={() =>
              navigate("/quickbookform", {
                state: { provider: selectedProvider } // provider already has service_id
              })
            }
          >
            Quick request
          </button>

          <button onClick={() => setSelectedProvider(null)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="service-container">
      <h2>Filter Services and Providers</h2>

      <div className="filter-controls">
        <label>
          City:
          <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </label>

        <label>
          Service:
          <select value={selectedService} onChange={e => setSelectedService(e.target.value)}>
            {serviceNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length > 0 ? (
        filtered.map(service => (
          <div key={service.name + service.city} className="service-card">
            <h3>{service.name} {selectedCity === "All" ? `- ${service.city}` : ""}</h3>
            <div className="provider-list">
              {service.providers.map(provider => (
                <div
                  key={provider.provider_id}
                  className="provider-card"
                  onClick={() => setSelectedProvider(provider)}
                >
                  <p className="provider-name">{provider.name}</p>
                  <p className="provider-description">{provider.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No services found.</p>
      )}
    </div>
  );
}
