"use client";

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initializeAuth = useAuthStore((state: any) => state.initializeAuth);
  
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
};