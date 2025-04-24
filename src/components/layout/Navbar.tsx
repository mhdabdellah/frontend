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





// 'use client';

// import Link from 'next/link';
// import { Button } from '../ui/Button';
// import { useAuthStore } from '@/stores/authStore';

// export const Navbar = () => {
//   const { logout } = useAuthStore();

//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           <Link href="/" className="text-xl font-bold text-gray-900">
//             Logo
//           </Link>

//           <div className="flex items-center gap-4">
//             {/* “Homme” goes to home */}
//             <Link href="/">
//               <Button variant="primary">
//                 Homme
//               </Button>
//             </Link>

//             {/* “Profile” goes to /profiles */}
//             <Link href="/profiles">
//               <Button variant="primary">
//                 Profile
//               </Button>
//             </Link>

//             {/* Logout stays a button */}
//             <Button variant="primary" onClick={logout}>
//               Logout
//             </Button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };
