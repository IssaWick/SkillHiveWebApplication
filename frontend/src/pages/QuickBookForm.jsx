// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import "../QuickBook.css";

// const QuickBookForm = ({ onClose }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const providerData = location.state?.provider; // get provider info from previous page

//   const [formData, setFormData] = useState({
//     provider_id: providerData?.provider_id || "",
//     service_id: providerData?.service_id || "",
//     customer_id: "",
//     requested_time_from: "",
//     requested_time_to: "",
//     notes: ""
//   });

//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   // Update provider_id and service_id if providerData changes
//   useEffect(() => {
//     if (providerData) {
//       setFormData(prev => ({
//         ...prev,
//         provider_id: providerData.provider_id,
//         service_id: providerData.service_id
//       }));
//     }
//   }, [providerData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.provider_id) newErrors.provider_id = "Provider ID is required";
//     if (!formData.customer_id) newErrors.customer_id = "Customer ID is required";
//     if (!formData.service_id) newErrors.service_id = "Service ID is required";
//     if (!formData.requested_time_from) newErrors.requested_time_from = "Start time is required";
//     if (!formData.requested_time_to) newErrors.requested_time_to = "End time is required";

//     if (formData.requested_time_from && formData.requested_time_to) {
//       if (new Date(formData.requested_time_to) <= new Date(formData.requested_time_from)) {
//         newErrors.requested_time_to = "End time must be after start time";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setSubmitting(true);
//     setMessage({ type: "", text: "" });

//     try {
//       const formatBackendDate = (datetime) => datetime.replace("T", " ") + ":00";

//       const payload = {
//         provider_id: Number(formData.provider_id),
//         customer_id: Number(formData.customer_id),
//         service_id: Number(formData.service_id),
//         requested_time_from: formatBackendDate(formData.requested_time_from),
//         requested_time_to: formatBackendDate(formData.requested_time_to),
//         notes: formData.notes
//       };

//       const response = await axios.post(
//         "http://localhost:3004/job-request/create_request",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );

//       if (response.status === 201 && response.data.message === "Job request created successfully") {
//         alert("Booking created successfully!");
//         navigate("/findservices");
//         onClose?.();
//       } else {
//         setMessage({ type: "error", text: response.data.message || "Request failed" });
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage({ type: "error", text: "Error creating booking" });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="quick-book-overlay">
//       <div className="quick-book-form">
//         <h2>Quick Book</h2>
//         <form onSubmit={handleSubmit}>
//           <label>Provider ID</label>
//           <input
//             name="provider_id"
//             type="text"
//             value={formData.provider_id}
//             readOnly
//           />

//           <label>Service ID</label>
//           <input
//             name="service_id"
//             type="text"
//             value={formData.service_id}
//             readOnly
//           />

//           <label>Customer ID</label>
//           <input
//             name="customer_id"
//             type="number"
//             placeholder="Enter customer ID"
//             value={formData.customer_id}
//             onChange={handleChange}
//           />
//           {errors.customer_id && <div className="text-danger">{errors.customer_id}</div>}

//           <label>From</label>
//           <input
//             type="datetime-local"
//             name="requested_time_from"
//             value={formData.requested_time_from}
//             onChange={handleChange}
//           />
//           {errors.requested_time_from && <div className="text-danger">{errors.requested_time_from}</div>}

//           <label>To</label>
//           <input
//             type="datetime-local"
//             name="requested_time_to"
//             value={formData.requested_time_to}
//             onChange={handleChange}
//           />
//           {errors.requested_time_to && <div className="text-danger">{errors.requested_time_to}</div>}

//           <label>Notes (optional)</label>
//           <textarea
//             name="notes"
//             placeholder="Any additional notes"
//             value={formData.notes}
//             onChange={handleChange}
//           />

//           {message.text && (
//             <div className={message.type === "success" ? "text-success" : "text-danger"}>
//               {message.text}
//             </div>
//           )}

//           <div className="quick-book-buttons">
//             <button type="submit" disabled={submitting}>
//               {submitting ? "Booking..." : "Book"}
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 onClose?.();
//                 navigate("/findservices");
//               }}
//               disabled={submitting}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default QuickBookForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../QuickBook.css";

const QuickBookForm = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const providerData = location.state?.provider; // get provider info from previous page

  const [formData, setFormData] = useState({
    provider_id: providerData?.provider_id || "",
    service_id: providerData?.service_id || "",
    customer_id: "",
    requested_time_from: "",
    requested_time_to: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Fetch user profile when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/getProfile", {
          withCredentials: true // to send cookies
        });
        
        if (response.data && response.data.id) {
          setFormData(prev => ({
            ...prev,
            customer_id: response.data.id
          }));
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setMessage({ type: "error", text: "Failed to load user information" });
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Update provider_id and service_id if providerData changes
  useEffect(() => {
    if (providerData) {
      setFormData(prev => ({
        ...prev,
        provider_id: providerData.provider_id,
        service_id: providerData.service_id
      }));
    }
  }, [providerData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.provider_id) newErrors.provider_id = "Provider ID is required";
    if (!formData.customer_id) newErrors.customer_id = "Customer ID is required";
    if (!formData.service_id) newErrors.service_id = "Service ID is required";
    if (!formData.requested_time_from) newErrors.requested_time_from = "Start time is required";
    if (!formData.requested_time_to) newErrors.requested_time_to = "End time is required";

    if (formData.requested_time_from && formData.requested_time_to) {
      if (new Date(formData.requested_time_to) <= new Date(formData.requested_time_from)) {
        newErrors.requested_time_to = "End time must be after start time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const formatBackendDate = (datetime) => datetime.replace("T", " ") + ":00";

      const payload = {
        provider_id: Number(formData.provider_id),
        customer_id: Number(formData.customer_id),
        service_id: Number(formData.service_id),
        requested_time_from: formatBackendDate(formData.requested_time_from),
        requested_time_to: formatBackendDate(formData.requested_time_to),
        notes: formData.notes
      };

      const response = await axios.post(
        "http://localhost:3004/job-request/create_request",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201 && response.data.message === "Job request created successfully") {
        alert("Booking created successfully!");
        navigate("/findservices");
        onClose?.();
      } else {
        setMessage({ type: "error", text: response.data.message || "Request failed" });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Error creating booking" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="quick-book-overlay">
        <div className="quick-book-form">
          <h2>Loading user information...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="quick-book-overlay">
      <div className="quick-book-form">
        <h2>Quick Book</h2>
        <form onSubmit={handleSubmit}>
          <label>Provider ID</label>
          <input
            name="provider_id"
            type="text"
            value={formData.provider_id}
            readOnly
          />

          <label>Service ID</label>
          <input
            name="service_id"
            type="text"
            value={formData.service_id}
            readOnly
          />

          <label>Customer ID</label>
          <input
            name="customer_id"
            type="number"
            value={formData.customer_id}
            readOnly
          />

          <label>From</label>
          <input
            type="datetime-local"
            name="requested_time_from"
            value={formData.requested_time_from}
            onChange={handleChange}
          />
          {errors.requested_time_from && <div className="text-danger">{errors.requested_time_from}</div>}

          <label>To</label>
          <input
            type="datetime-local"
            name="requested_time_to"
            value={formData.requested_time_to}
            onChange={handleChange}
          />
          {errors.requested_time_to && <div className="text-danger">{errors.requested_time_to}</div>}

          <label>Notes (optional)</label>
          <textarea
            name="notes"
            placeholder="Any additional notes"
            value={formData.notes}
            onChange={handleChange}
          />

          {message.text && (
            <div className={message.type === "success" ? "text-success" : "text-danger"}>
              {message.text}
            </div>
          )}

          <div className="quick-book-buttons">
            <button type="submit" disabled={submitting}>
              {submitting ? "Booking..." : "Book"}
            </button>
            <button
              type="button"
              onClick={() => {
                onClose?.();
                navigate("/findservices");
              }}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickBookForm;
