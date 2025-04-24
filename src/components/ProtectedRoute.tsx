'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && mounted) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, mounted, router]);

  if (!mounted || isLoading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};