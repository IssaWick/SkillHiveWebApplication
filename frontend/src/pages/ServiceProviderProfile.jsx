import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import defaultAvatar from '../assets/default-avatar.png';
import '../App.css';

const ServiceProviderProfile = () => {
  const [user, setUser] = useState(null);
  const { isAuthenticated } = useAuth(); // Can still be used globally if you want
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3002/api/getProfile', {
          withCredentials: true, // send HttpOnly token automatically
        });

        const profile = res.data;

        // If userType is not Customer, redirect
        if (profile.userType !== 'Service Provider') {
          navigate('/');
          return;
        }

        setUser(profile);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        navigate('/login'); // Not logged in or unauthorized
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap justify-content-between align-items-start">
        {/* Profile Picture & Name */}
        <div className="d-flex align-items-center">
          <img
            src={user.profilePicture || defaultAvatar}
            alt="Profile"
            className="rounded-circle"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          <div className="ms-4">
            <h4 className="mb-0">{user.name}</h4>
            <small className="text-muted">4.9 · 123 reviews</small>
          </div>
        </div>

        {/* Verified Section */}
        <div>
          <h5>Verified</h5>
          <p><i className="bi bi-card-text me-2"></i> {user.nic}</p>
          <p><i className="bi bi-telephone me-2"></i> {user.contact}</p>
          <p><i className="bi bi-envelope me-2"></i> {user.email}</p>
        </div>
      </div>

      <hr />

      {/* About Section */}
      <div>
        <h5>About</h5>
        <div className="row mt-3">
          <div className="col-md-4 mb-2"><strong>Age</strong><br />{user.age}</div>
          <div className="col-md-4 mb-2"><strong>District</strong><br />{user.district}</div>
          <div className="col-md-4 mb-2"><strong>City</strong><br />{user.city}</div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderProfile;
