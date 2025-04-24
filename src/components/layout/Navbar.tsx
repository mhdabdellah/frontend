'use client';

import { HiMenu } from 'react-icons/hi';
import { useAuthStore } from '@/stores/authStore';
import { IconButton } from '../ui/IconButton';
import { FiLogOut } from 'react-icons/fi';

interface NavbarProps {
  pageTitle: string;
  onMenuClick: () => void;
}

export function Navbar({ pageTitle, onMenuClick }: NavbarProps) {
  const { logout } = useAuthStore();
  
  return (
    <header className="flex items-center justify-between bg-white shadow-md h-16 px-4">
      <button
        className="lg:hidden text-gray-700 focus:outline-none"
        onClick={onMenuClick}
      >
        <HiMenu className="w-6 h-6" />
      </button>
      <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
      <div> 
        <IconButton
          icon={FiLogOut}
          onClick={logout}
          tooltip="Logout"
          color="text-blue-500"
          size={24}
          className="bg-blue-50"
        />

      </div>
    </header>
  );
}