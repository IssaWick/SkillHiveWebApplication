

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ProviderJobRequests.css";

const ProviderJobRequests = () => {
  const [jobRequests, setJobRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [providerId, setProviderId] = useState(null);
  const [error, setError] = useState(null);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch provider profile (to get providerId)
  useEffect(() => {
    const fetchProviderProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/getProfile", {
          withCredentials: true,
        });

        if (response.data && response.data.id) {
          setProviderId(response.data.id);
        } else {
          setError("Failed to get provider ID");
        }
      } catch (err) {
        console.error("Failed to fetch provider profile:", err);
        setError("Failed to fetch provider profile");
      }
    };

    fetchProviderProfile();
  }, []);

  // Fetch job requests for provider
  useEffect(() => {
    if (!providerId) return;

    const fetchJobRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/job-request/provider/${providerId}`
        );
        setJobRequests(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch job requests");
      } finally {
        setLoading(false);
      }
    };

    fetchJobRequests();
  }, [providerId]);

  const handleUpdateStatus = async (jobId, status) => {
  try {
    await axios.put(`http://localhost:3004/job-request/${jobId}/status`, { status });
    alert(`Job ${jobId} marked as ${status}`);
    
    // Update frontend immediately
    setJobRequests(prev =>
      prev.map(job => job.id === jobId ? { ...job, status } : job)
    );
    setSelectedJob(prev => prev ? { ...prev, status } : prev);
  } catch (err) {
    console.error("Failed to update status:", err);
    alert("Failed to update status");
  }
};


  // Fetch user info when job clicked
  const handleRowClick = async (job) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/user-info/${job.customer_id}`
      );
      setSelectedCustomer(response.data);
      setSelectedJob(job);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      alert("Failed to load customer info");
    }
  };

  if (loading) return <p>Loading job requests...</p>;
  if (error) return <p>{error}</p>;


  if (selectedJob && selectedCustomer) {
   return (
  <div className="job-detail-container">

    {/* Job Request Card */}
    <div className="job-card">
      <h2>Job Request Details</h2>
      <div className="detail-row">
        <span className="label">Job ID:</span>
        <span className="value">{selectedJob.id}</span>
      </div>
      <div className="detail-row">
        <span className="label">Service ID:</span>
        <span className="value">{selectedJob.service_id}</span>
      </div>
      <div className="detail-row">
        <span className="label">From:</span>
        <span className="value">{selectedJob.requested_time_from}</span>
      </div>
      <div className="detail-row">
        <span className="label">To:</span>
        <span className="value">{selectedJob.requested_time_to}</span>
      </div>
      <div className="detail-row">
        <span className="label">Status:</span>
        <span className="value status">{selectedJob.status}</span>
      </div>
      <div className="detail-row">
        <span className="label">Notes:</span>
        <span className="value">{selectedJob.notes}</span>
      </div>
      <div className="detail-row">
        <span className="label">Created At:</span>
        <span className="value">{new Date(selectedJob.created_at).toLocaleString()}</span>
      </div>
    </div>

    {/* Customer Card */}
    <div className="job-card">
      <h2>Customer Information</h2>
      <div className="detail-row">
        <span className="label">Name:</span>
        <span className="value">{selectedCustomer.name}</span>
      </div>
      <div className="detail-row">
        <span className="label">Email:</span>
        <span className="value">{selectedCustomer.email}</span>
      </div>
      <div className="detail-row">
        <span className="label">Contact:</span>
        <span className="value">{selectedCustomer.contact}</span>
      </div>
      <div className="detail-row">
        <span className="label">District:</span>
        <span className="value">{selectedCustomer.district}</span>
      </div>
    </div>

    {/* Buttons */}
    <div className="job-buttons">
      
      <button onClick={() => handleUpdateStatus(selectedJob.id, "accepted")}>Accept</button>
      <button onClick={() => handleUpdateStatus(selectedJob.id, "rejected")}>Reject</button>
      <button onClick={() => { setSelectedJob(null); setSelectedCustomer(null); }}>Back</button>
    </div>

  </div>
);


  }

  //   Table  
  return (
    <div>
      <h2>Provider Job Requests</h2>
      {jobRequests.length === 0 ? (
        <p>No job requests found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Service ID</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {jobRequests.map((job) => (
              <tr
                key={job.id}
                onClick={() => handleRowClick(job)}
                style={{ cursor: "pointer" }}
              >
                <td>{job.id}</td>
                <td>{job.customer_id}</td>
                <td>{job.service_id}</td>
                <td>{job.requested_time_from}</td>
                <td>{job.requested_time_to}</td>
                <td>{job.status}</td>
                <td>{job.notes}</td>
                <td>{new Date(job.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProviderJobRequests;

