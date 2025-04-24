// components/layout/Sidebar.tsx
import { deleteUser } from '@/lib/services/userService';
import Link from 'next/link';
import {
  HiHome,
  HiUser,
  HiChartBar,
  HiCog,
  HiLogout,
  HiTrash,
} from 'react-icons/hi';

import { useRouter } from 'next/navigation';

export function Sidebar() {

    const router = useRouter();
  return (
    <aside className="h-full flex flex-col bg-white shadow-md w-64">
      <div className="h-16 flex items-center px-4 bg-indigo-600">
        <span className="text-white font-bold text-lg">Skills Assessment Test</span>
      </div>
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <ul className="space-y-1">
          <li>
            <Link
              href="/"
              className="flex items-center p-2 rounded hover:bg-gray-100 text-gray-700"
            >
              <HiHome className="w-5 h-5 mr-3" /> Home
            </Link>
          </li>
          <li>
            <Link
              href="/profiles"
              className="flex items-center p-2 rounded hover:bg-gray-100 text-gray-700"
            >
              <HiUser className="w-5 h-5 mr-3" /> Profile
            </Link>
          </li>

          <li>
            <button
                onClick={() => {
                if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                    // Delete account logic here
                    console.log("Account deleted");
                    deleteUser(localStorage.getItem("authToken"))
                    localStorage.removeItem('authToken');
                    router.push('/login');
                }
                }}
                className="flex items-center p-2 rounded hover:bg-red-100 text-red-600 w-full"
            >
                <HiTrash className="w-5 h-5 mr-3 text-red-600" />
                Delete Account
            </button>
           </li>
        </ul>
      </nav>
    </aside>
  );
}
