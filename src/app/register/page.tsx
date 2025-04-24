'use client';  

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/lib/services/authService';
import { UserForm, UserFormValues } from '@/components/forms/UserForm';

export default function RegisterPage() {
  const { login } = useAuthStore();
  const router = useRouter();

  const handleRegister = async (data: UserFormValues) => {
    const { token } = await authService.register(data);
    login(token);
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <UserForm onSubmit={handleRegister} submitLabel="Create Account" isRegister={1} />
      </div>
    </div>
  );
}
