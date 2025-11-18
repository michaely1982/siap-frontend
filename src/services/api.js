import axios from 'axios';

// Use environment variable for production, fallback to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const API_URL = `${API_BASE_URL}/api/files`;
const HISTORY_URL = `${API_BASE_URL}/api/history`;
const USERS_URL = `${API_BASE_URL}/api/users`;

// Set token in header
const setAuthToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  }
};

// Files API
export const getAllFiles = async () => {
  setAuthToken();
  const response = await axios.get(API_URL);
  return response.data;
};

export const getFile = async (id) => {
  setAuthToken();
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createFile = async (fileData) => {
  setAuthToken();
  const response = await axios.post(API_URL, fileData);
  return response.data;
};

export const updateFile = async (id, fileData) => {
  setAuthToken();
  const response = await axios.put(`${API_URL}/${id}`, fileData);
  return response.data;
};

export const deleteFile = async (id) => {
  setAuthToken();
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// History API
export const getAllHistory = async () => {
  setAuthToken();
  const response = await axios.get(HISTORY_URL);
  return response.data;
};

// Users API (Admin only)
export const getAllUsers = async () => {
  setAuthToken();
  const response = await axios.get(USERS_URL);
  return response.data;
};

export const getUser = async (id) => {
  setAuthToken();
  const response = await axios.get(`${USERS_URL}/${id}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  setAuthToken();
  const response = await axios.put(`${USERS_URL}/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  setAuthToken();
  const response = await axios.delete(`${USERS_URL}/${id}`);
  return response.data;
};