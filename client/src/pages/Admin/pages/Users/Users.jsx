import React, { useState } from 'react';
import Header from '../../components/Header';
import './Users.css';

export default function Users() {
  const [users] = useState([
    {
      id: 1,
      name: 'Sudit Ganguly',
      email: 'sudit@example.com',
      phone: '+91 98765 43210',
      joinedDate: 'May 15, 2024',
      lastActive: '2 hours ago',
      status: 'active',
      propertyViews: 45,
      savedProperties: 12,
      inquiriesMade: 8,
      type: 'Buyer'
    },
    {
      id: 2,
      name: 'Ankita Sharma',
      email: 'ankita@example.com',
      phone: '+91 98765 43211',
      joinedDate: 'April 20, 2024',
      lastActive: '5 mins ago',
      status: 'active',
      propertyViews: 78,
      savedProperties: 15,
      inquiriesMade: 10,
      type: 'Agent'
    },
    {
      id: 3,
      name: 'Rahul Mehta',
      email: 'rahul@example.com',
      phone: '+91 98765 43212',
      joinedDate: 'June 1, 2024',
      lastActive: '1 day ago',
      status: 'inactive',
      propertyViews: 23,
      savedProperties: 5,
      inquiriesMade: 2,
      type: 'Seller'
    },
    {
      id: 4,
      name: 'Priya Patel',
      email: 'priya@example.com',
      phone: '+91 98765 43213',
      joinedDate: 'May 28, 2024',
      lastActive: '3 hours ago',
      status: 'active',
      propertyViews: 92,
      savedProperties: 20,
      inquiriesMade: 15,
      type: 'Buyer'
    }
  ]);

  return (
    <>
      <Header />
      <div className="p-6 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Users</h1>
          <div className="flex gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Users: {users.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          Joined {user.joinedDate}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">{user.email}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      <div>Views: {user.propertyViews}</div>
                      <div>Saved: {user.savedProperties}</div>
                      <div>Inquiries: {user.inquiriesMade}</div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      Last active: {user.lastActive}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.type === 'Buyer'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : user.type === 'Seller'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {user.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
