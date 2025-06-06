import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    console.log('Signing out...');
    navigate('/login');
  };

  return (
    <>
      {/* Hamburger Button (shown only on small screens) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 p-2 rounded shadow"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} className="text-gray-600 dark:text-gray-300" />
      </button>

      {/* Background Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar (same size and style always, mobile and desktop) */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}
      >
        <nav className="flex flex-col h-full p-6 justify-between">
          {/* Top Section */}
          <div>
            <Link
              to="/admin"
              className="text-xl font-bold mb-6 block text-gray-800 dark:text-white hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>

            <NavLink
              to="/admin/overview"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 relative block mb-2 ${
                  isActive 
                    ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-200 font-semibold' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300'
                }`
              }
            >
              Overview
            </NavLink>
            <NavLink
              to="/admin/properties"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 relative block mb-2 ${
                  isActive 
                    ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-200 font-semibold' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300'
                }`
              }
            >
              Properties
            </NavLink>
            <NavLink
              to="/admin/users"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 relative block mb-2 ${
                  isActive 
                    ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-200 font-semibold' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300'
                }`
              }
            >
              Users
            </NavLink>
            <NavLink
              to="/admin/reports"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 relative block mb-2 ${
                  isActive 
                    ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-200 font-semibold' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300'
                }`
              }
            >
              Reports
            </NavLink>
            <NavLink
              to="/admin/bookings"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 relative block mb-2 ${
                  isActive 
                    ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-200 font-semibold' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300'
                }`
              }
            >
              Bookings
            </NavLink>
          </div>

          {/* Bottom Buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                handleSignOut();
                setIsOpen(false);
              }}
              className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Sign Out
            </button>
            <button
              onClick={() => {
                navigate('/');
                setIsOpen(false);
              }}
              className="bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 text-white py-2 px-4 rounded"
            >
              Home
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
