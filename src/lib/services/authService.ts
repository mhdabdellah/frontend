import apiClient from "../axios";

export const authService = {
  register: async (userData: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    sex: string;
    age: number;
    role: string;
  }) => {
    try {
      const response = await apiClient.post('auth/register', userData);
      console.log("response.data: "+ response.data)
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  login: async (credentials: { username: string; password: string }) => {
    try {
      const response = await apiClient.post('auth/login', credentials);
      console.log("response.data: "+ response.data)
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await apiClient.post('auth/logout');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
};