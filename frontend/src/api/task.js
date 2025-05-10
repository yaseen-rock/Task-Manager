import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/tasks'; 

// Get all tasks for current user
export const getTasks = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch tasks';
  }
};

// Create a new task
export const createTask = async (taskData) => {
  const token = localStorage.getItem('token');
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const response = await axios.post(API_URL, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create task';
  }
};

// Update an existing task
export const updateTask = async (taskId, taskData) => {
  const token = localStorage.getItem('token');
  try {
    // Add 10-second delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update task';
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete task';
  }
};

// Toggle task completion status
export const toggleTaskCompletion = async (taskId, completed) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.patch(
      `${API_URL}/${taskId}/complete`,
      { completed },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update task status';
  }
};