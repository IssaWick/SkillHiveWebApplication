import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  // Check authentication and get user type on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:3002/api/getProfile', {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsAuthenticated(true);
          setUserType(res.data.userType || null);
        } else {
          setIsAuthenticated(false);
          setUserType(null);
        }
      } catch (err) {
        setIsAuthenticated(false);
        setUserType(null);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await axios.post('http://localhost:3001/api/login', credentials, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setIsAuthenticated(true);
        // After login, get user profile to get userType
        const profileRes = await axios.get('http://localhost:3002/api/getProfile', {
          withCredentials: true,
        });
        setUserType(profileRes.data.userType || null);
        navigate('/'); // redirect home after login
      }
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:3001/api/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUserType(null);
      navigate('/'); // redirect home after logout
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
