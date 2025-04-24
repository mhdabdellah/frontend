// stores/authStore.ts
import { create } from 'zustand';
import { UserModel } from '@/models/userModel';

interface AuthState {
  user: UserModel | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  initializeAuth: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  
  login: (token) => {
    localStorage.setItem('authToken', token);
    set({ token, isAuthenticated: true });
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  initializeAuth: () => {
    const token = localStorage.getItem('authToken');
    // You might want to add token validation here
    set({ 
      token,
      isAuthenticated: !!token,
      isLoading: false
    });
  },
  
  setLoading: (loading) => set({ isLoading: loading })
}));