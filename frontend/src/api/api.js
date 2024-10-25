import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use the environment variable
  withCredentials: true,                 // Allow credentials (cookies) if needed
});

// Login a user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api/users/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout a user
export const logoutUser = async () => {
  try {
    const response = await api.post('/api/users/logout'); // Call the logout endpoint
    return response.data; // You can return the response if needed
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Sign up a new user
export const signupUser = async (userData) => {
    try {
      const response = await api.post('/api/users/signup', userData); // Call the signup endpoint
      return response.data; // Return the response data
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

export default api;
