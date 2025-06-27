import { useState, useEffect } from 'react';
import StatsCard from './components/StatsCard';
import PropertyList from './components/PropertyList';
import Header from './components/Header';
import { Moon, Sun } from 'lucide-react';

export default function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(() => {
    // Get initial theme from localStorage or default to false
    return localStorage.getItem('darkMode') === 'true';
  });

  const totalUsers = 120;
  const totalProperties = 35;
  const propertiesSold = 18;

  useEffect(() => {
    // Update localStorage and apply theme
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 p-6 flex flex-col gap-6">
          {/* Top Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 shadow-sm"
            >
              {darkMode ? (
                <Sun className="text-yellow-400 w-5 h-5" />
              ) : (
                <Moon className="text-gray-600 dark:text-gray-400 w-5 h-5" />
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <StatsCard title="Total Users" value={totalUsers} />
            <StatsCard title="Properties Uploaded" value={totalProperties} />
            <StatsCard title="Properties Sold" value={propertiesSold} />
          </div>

          <PropertyList />
        </div>
      </div>
    </>
  );
}
