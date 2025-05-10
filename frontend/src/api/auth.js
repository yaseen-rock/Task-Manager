import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/auth'; 

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const login = async (userData) => {
    try {
      console.log('Sending login request...'); // Debug log
      const response = await axios.post(`${API_URL}/login`, userData);
      console.log('Response:', response.data); // Inspect the response
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token saved to localStorage'); // Confirm storage
      } else {
        console.warn('No token in response!'); // Debug missing token
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  };

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  return token ? { token } : null;
};

export const logout = () => {
  localStorage.removeItem('token');
};