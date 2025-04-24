"use client";

import UsersManagement from '@/components/ui/UsersManagement';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import { checkUserRole } from '@/lib/services/userService';

const Loader = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      <p className="text-gray-600">Verifying permissions...</p>
    </div>
  </div>
);

export default function Home() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const adminStatus = await checkUserRole(localStorage.getItem("authToken"));
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error('Error verifying role:', error);
        setIsAdmin(false);
      }
    };
    
    checkAdmin();
  }, []);

  return (
    <ProtectedRoute>
      <Layout pageTitle="Home">
        {isAdmin === null ? (
          <Loader />
        ) : isAdmin ? (
          <UsersManagement />
        ) : (
          <div className="p-4 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600">
              {"You don't have administrator privileges."}
              <br />
              {"Contact your system administrator for assistance."}
            </p>
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  );
}