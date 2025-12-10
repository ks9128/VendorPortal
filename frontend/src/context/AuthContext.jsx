import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // axios defaults are set in main.jsx

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Use relative path - baseURL handles the domain
      const response = await axios.get(`/vendors/current-user`);
      setUser(response.data.data);
    } catch (error) {
      console.error("Auth check failed", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post(`/vendors/login`, { email, password });
    setUser(response.data.data.user); 
    return response.data;
  };

  const register = async (vendorData) => {
    const response = await axios.post(`/vendors/register`, vendorData);
    // Auto login or just successful reg
    return response.data;
  };

  const logout = async () => {
    try {
        await axios.post(`/vendors/logout`);
    } catch (error) {
        console.error("Logout failed on backend", error);
    } finally {
        setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
