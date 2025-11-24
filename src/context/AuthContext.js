import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/auth/user`);
      setUser(res.data);
    } catch (err) {
      console.error('Error loading user:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (nip, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        nip,
        password
      });
      
      // Check if user is verified
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        axios.defaults.headers.common['x-auth-token'] = res.data.token;
        return { success: true };
      }
      
      return { success: false, message: 'Login failed' };
    } catch (err) {
      // Handle verification error
      if (err.response?.status === 403) {
        return { 
          success: false, 
          message: err.response.data.message || 'Your account is pending admin verification'
        };
      }
      return { 
        success: false, 
        message: err.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
      
      // Registration successful but needs verification
      // Do NOT log user in automatically
      return { 
        success: true,
        message: res.data.message || 'Registration successful'
      };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['x-auth-token'];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};