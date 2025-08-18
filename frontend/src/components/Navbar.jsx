import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/SkillHive.png';
import defaultAvatar from '../assets/default-avatar.png';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, userType, logout } = useAuth();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(defaultAvatar);

  // Fetch logged-in user's profile picture (only for normal users: Customer or Service Provider)
  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated && (userType === 'Customer' || userType === 'Service Provider')) {
        try {
          const response = await axios.get('http://localhost:3002/api/getProfile', {
            withCredentials: true, // send JWT cookie
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
    <nav className="navbar navbar-expand-lg custom-navbar px-4" style={{ backgroundColor: '#4CB67A' }}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="SkillHive Logo" width="40" height="40" className="me-2-logo" />
        </Link>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav align-items-center">
            {userType === 'Admin' ? (
              <>
                <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/About">About</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="#">Services</Link></li>
                <li className="nav-item">
                  <button className="btn btn-link text-white fs-5" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/About">About</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="#">Services</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="#">Contact</Link></li>

                {isAuthenticated && (
                  <li className="nav-item"><Link className="nav-link text-white" to="#">Hired Services</Link></li>
                )}

                {isAuthenticated ? (
                  <>
                    {/* Notification Bell */}
                    <li className="nav-item mx-2">
                      <button className="btn btn-link text-white p-0 fs-5" onClick={() => alert('Notifications')}>
                        <i className="bi bi-bell-fill"></i>
                      </button>
                    </li>

                    {/* Profile Picture */}
                    <li className="nav-item me-2">
                      <img
                        src={profilePic}
                        alt="Profile"
                        onClick={goToProfile}
                        className="rounded-circle"
                        style={{ width: '32px', height: '32px', cursor: 'pointer', objectFit: 'cover' }}
                      />
                    </li>

                    {/* Logout Icon */}
                    <li className="nav-item">
                      <button className="btn btn-link text-white fs-5" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="nav-item ms-3">
                    <Link to="/signup" className="btn btn-light btn-sm">Sign Up</Link>
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
