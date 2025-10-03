import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/SkillHive.png';
import defaultAvatar from '../assets/default-avatar.png';
import { useAuth } from '../context/AuthContext';
import "../App.css";

const Navbar = () => {
  const { isAuthenticated, userType, logout } = useAuth();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(defaultAvatar);

  // Fetch logged-in user's profile picture
  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated && (userType === 'Customer' || userType === 'Service Provider')) {
        try {
          const response = await axios.get('http://localhost:3002/api/getProfile', {
            withCredentials: true,
          });
          const profilePicture = response.data.profilePicture || defaultAvatar;
          setProfilePic(profilePicture);
        } catch (error) {
          console.error('Error fetching profile:', error);
          setProfilePic(defaultAvatar);
        }
      }
    };
    fetchProfile();
  }, [isAuthenticated, userType]);

  const handleLogout = async () => {
    await logout();
  };

  const goToProfile = () => {
    if (userType === 'Customer') {
      navigate('/customer-profile');
    } else if (userType === 'Service Provider') {
      navigate('/service-provider-profile');
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="SkillHive Logo" width="40" height="40" className="me-2-logo" />
        </NavLink>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav align-items-center">
            {userType === 'Admin' ? (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/About">About</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/services">Services</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/admin-dashboard">Dashboard</NavLink></li>
                <li className="nav-item">
                  <button className="btn btn-link logout-btn" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                {userType === 'Service Provider' && isAuthenticated && (
                  <li className="nav-item"><NavLink className="nav-link" to="/providerhome">Dashboard</NavLink></li>
                )}
                <li className="nav-item"><NavLink className="nav-link" to="/About">About</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/services">Services</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>

                {isAuthenticated && (
                  <li className="nav-item"><NavLink className="nav-link" to="/hired-services">Hired Services</NavLink></li>
                )}

                {isAuthenticated ? (
                  <>
                    {/* Notification Bell */}
                    <li className="nav-item mx-2">
                      <button className="btn btn-link notification-btn" onClick={() => alert('Notifications')}>
                        <i className="bi bi-bell-fill"></i>
                      </button>
                    </li>

                    {/* Profile Picture */}
                    <li className="nav-item me-2">
                      <img
                        src={profilePic}
                        alt="Profile"
                        onClick={goToProfile}
                        className="profile-avatar"
                      />
                    </li>

                    {/* Logout Icon */}
                    <li className="nav-item">
                      <button className="btn btn-link logout-btn" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="nav-item ms-3">
                    <NavLink to="/signup" className="btn btn-light btn-sm">Sign Up</NavLink>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
