"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  changePassword,
  changeUsername,
  updateProfile,
  getCurrentUser,
} from '@/lib/services/userService';
import Layout from '@/components/layout/Layout';


interface User {
  username: string;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    sex: 'MALE' | 'FEMALE';
  };
}

// Validation Schemas
const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(1, 'Age must be at least 1').max(120),
  sex: z.enum(['MALE', 'FEMALE']),
});

const usernameSchema = z.object({
  newUsername: z.string().min(3, 'Username must be at least 3 characters'),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Current password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirmation is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

 
  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  });

 
  const {
    register: usernameRegister,
    handleSubmit: handleUsernameSubmit,
    formState: { errors: usernameErrors },
    reset: resetUsername,
  } = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
  });

 
  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const userData = await getCurrentUser(token);
        setUser(userData);
        resetProfile(userData.profile);
      } catch (error) {
        console.error('Failed to load user', error);
        router.push('/login');
      } finally {
        setAuthLoading(false);
      }
    };
    fetchUser();
  }, [router, resetProfile]);

  const handleProfileUpdate = async (data: z.infer<typeof profileSchema>) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      await updateProfile(data, token);
      const updated = await getCurrentUser(token);
      setUser(updated);
      resetProfile(updated.profile);
      setEditProfile(false);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  const handleUsernameUpdate = async (data: z.infer<typeof usernameSchema>) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      await changeUsername(data.newUsername, token);
      const updated = await getCurrentUser(token);
      setUser(updated);
      resetUsername();
      setEditUsername(false);
    } catch (error) {
      console.error('Username update failed:', error);
    }
  };

  const handlePasswordUpdate = async (data: z.infer<typeof passwordSchema>) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      await changePassword(data.currentPassword,data.newPassword,token);
      localStorage.removeItem('authToken');
      router.push('/login');
    } catch (error) {
      console.error('Password change failed:', error);
    }
  };


  if (authLoading || !user) {
    return (
      <Layout pageTitle="Profile">
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            <p className="text-gray-600">Loading your profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Profile">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Display current username */}
        <div className="text-center">
          <h1 className="text-3xl text-black font-bold">Welcome, {user.username}!</h1>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-gray-600 font-semibold">Profile Information</h2>
            <Button variant="secondary" onClick={() => setEditProfile(!editProfile)}>
              {editProfile ? 'Cancel' : 'Edit'}
            </Button>
          </div>
          <form onSubmit={handleProfileSubmit(handleProfileUpdate)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Username" value={user.username} disabled />
              <Input label="First Name" {...profileRegister('firstName')} error={profileErrors.firstName?.message} disabled={!editProfile} />
              <Input label="Last Name" {...profileRegister('lastName')} error={profileErrors.lastName?.message} disabled={!editProfile} />
              <Input label="Email" type="email" {...profileRegister('email')} error={profileErrors.email?.message} disabled={!editProfile} />
              <Input label="Age" type="number" {...profileRegister('age', { valueAsNumber: true })} error={profileErrors.age?.message} disabled={!editProfile} />
              <div><label className="block text-gray-600 text-sm font-medium mb-1">Gender</label>
                <select {...profileRegister('sex')} className="w-full p-2 text-gray-600 border rounded disabled:opacity-50" disabled={!editProfile}>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
            </div>
            {editProfile && (<div className="flex justify-end gap-4"><Button type="submit">Save</Button></div>)}
          </form>
        </div>

        {/* Username Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-gray-600 font-semibold">Change Username</h2>
            <Button variant="secondary" onClick={() => setEditUsername(!editUsername)}>
              {editUsername ? 'Cancel' : 'Change'}
            </Button>
          </div>
          {editUsername && (
            <form onSubmit={handleUsernameSubmit(handleUsernameUpdate)} className="space-y-4">
              <Input label="New Username" {...usernameRegister('newUsername')} error={usernameErrors.newUsername?.message} />
              <div className="flex justify-end gap-4"><Button type="submit">Update</Button></div>
            </form>
          )}
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-gray-600 font-semibold">Change Password</h2>
            <Button variant="secondary" onClick={() => setEditPassword(!editPassword)}>
              {editPassword ? 'Cancel' : 'Change'}
            </Button>
          </div>
          {editPassword && (
            <form onSubmit={handlePasswordSubmit(handlePasswordUpdate)} className="space-y-4">
              <Input label="Current Password" type="password" {...passwordRegister('currentPassword')} error={passwordErrors.currentPassword?.message} />
              <Input label="New Password" type="password" {...passwordRegister('newPassword')} error={passwordErrors.newPassword?.message} />
              <Input label="Confirm Password" type="password" {...passwordRegister('confirmPassword')} error={passwordErrors.confirmPassword?.message} />
              <div className="flex justify-end gap-4"><Button type="submit">Update</Button></div>
            </form>
          )}
        </div>
      </div>
      
    </Layout>
  );
}