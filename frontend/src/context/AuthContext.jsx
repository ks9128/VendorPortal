import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configure axios defaults
  axios.defaults.withCredentials = true;
  // Use a proxy or full URL. For dev, specific port logic might be needed.
  // Assuming backend is on 8000 based on previous context.
  const API_URL = 'http://localhost:8000/api/v1'; 

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/vendors/current-user`);
      setUser(response.data.data);
    } catch (error) {
      console.error("Auth check failed", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/vendors/login`, { email, password });
    setUser(response.data.data.user); 
    return response.data;
  };

  const register = async (vendorData) => {
    const response = await axios.post(`${API_URL}/vendors/register`, vendorData);
    // Auto login or just successful reg
    return response.data;
  };

  const logout = async () => {
    await axios.post(`${API_URL}/vendors/logout`);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
