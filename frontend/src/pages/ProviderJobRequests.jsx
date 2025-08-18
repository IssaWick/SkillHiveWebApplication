import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ProviderJobRequests.css";

const ProviderJobRequests = () => {
  const [jobRequests, setJobRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [providerId, setProviderId] = useState(null);
  const [error, setError] = useState(null);

  const [selectedCustomer, setSelectedCustomer] = useState(null); // user data
  const [selectedJob, setSelectedJob] = useState(null); // job request data
  const [showModal, setShowModal] = useState(false); // modal state

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

  // Fetch user info when job clicked
  const handleRowClick = async (job) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/user-info/${job.customer_id}`
      );
      setSelectedCustomer(response.data); // save user data
      setSelectedJob(job); // save job data
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      alert("Failed to load customer info");
    }
  };

  if (loading) return <p>Loading job requests...</p>;
  if (error) return <p>{error}</p>;

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
                onClick={() => handleRowClick(job)} // pass whole job
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

      {/* Modal for job + customer info */}
      {showModal && selectedCustomer && selectedJob && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Job Request Details</h3>
            <p><strong>Job ID:</strong> {selectedJob.id}</p>
            <p><strong>Service ID:</strong> {selectedJob.service_id}</p>
            <p><strong>From:</strong> {selectedJob.requested_time_from}</p>
            <p><strong>To:</strong> {selectedJob.requested_time_to}</p>
            <p><strong>Status:</strong> {selectedJob.status}</p>
            <p><strong>Notes:</strong> {selectedJob.notes}</p>
            <p><strong>Created At:</strong> {new Date(selectedJob.created_at).toLocaleString()}</p>

            <h3>Customer Information</h3>
            <p><strong>Name:</strong> {selectedCustomer.name}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Contact:</strong> {selectedCustomer.contact}</p>
            <p><strong>District:</strong> {selectedCustomer.district}</p>

            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderJobRequests;
