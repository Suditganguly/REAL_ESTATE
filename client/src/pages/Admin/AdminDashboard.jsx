import { useState, useEffect } from 'react';
import StatsCard from '../../components/Admin/StatsCard';
import PropertyList from '../../components/Admin/PropertyList';
import Header from '../../components/Admin/Header';
import axios from 'axios';

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [propertiesSold, setPropertiesSold] = useState(0);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(
          `${import.meta.env.VITE_ADMIN_API}/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data && response.data.status === 1) {
          setTotalUsers(response.data.totalUsers || 0);
          setTotalProperties(response.data.totalProperties || 0);
          setPropertiesSold(response.data.propertiesSold || 0);
        }
      } catch (error) {
        console.error("Failed to fetch admin dashboard data:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen w-full px-4 py-10 flex justify-center bg-gradient-to-br from-white via-indigo-50 to-blue-100 text-gray-900">
        <div className="w-full max-w-[1100px] rounded-2xl shadow-2xl border bg-white border-indigo-100 p-10 sm:p-6">
          <div className="flex justify-center mb-10 sm:mb-6">
            <h1 className="text-4xl sm:text-3xl font-extrabold tracking-wide drop-shadow-md text-indigo-800">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex flex-wrap justify-center gap-8 sm:gap-4 mb-10 sm:mb-6">
            {[{
              title: 'Total Users',
              value: totalUsers,
              icon: (
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" />
                </svg>
              )
            }, {
              title: 'Properties Uploaded',
              value: totalProperties,
              icon: (
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm2 2v8h8V5H5zm2 2h4v4H7V7z" />
                </svg>
              )
            }, {
              title: 'Properties Sold',
              value: propertiesSold,
              icon: (
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 00-1.414 0L10 10.586 7.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l6-6a1 1 0 000-1.414z" />
                </svg>
              )
            }].map((card, index) => (
              <div
                key={index}
                className="rounded-xl shadow-md p-6 flex flex-col items-center w-full max-w-xs flex-1 transition-transform duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-xl border bg-white border-indigo-100 text-gray-800"
              >
                <div className="mb-2 text-indigo-500">
                  {card.icon}
                </div>
                <StatsCard title={card.title} value={card.value} />
              </div>
            ))}
          </div>

          <div className="border-t my-10 border-indigo-200" />

          <PropertyList />
        </div>
      </div>
      <div className="h-20 w-full" />
    </>
  );
}
