import React, { useState } from 'react';
import Header from '../../components/Header';

export default function Bookings() {
  const [bookings] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      contact: '+91 98765 43210',
      property: {
        name: 'Ocean View Apartment',
        location: 'Mumbai',
        price: '$250,000',
      },
      bookingDate: '2025-06-03',
      bookingTime: '14:00',
      visitDate: '2025-06-10',
      visitTime: '16:00',
      status: 'confirmed',
      agent: 'Ankita Sharma',
      notes: 'Interested in 3BHK options',
      paymentStatus: 'paid',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      contact: '+91 98765 43211',
      property: {
        name: 'Mountain Cabin',
        location: 'Shimla',
        price: '$180,000',
      },
      bookingDate: '2025-06-04',
      bookingTime: '10:30',
      visitDate: '2025-06-12',
      visitTime: '13:00',
      status: 'pending',
      agent: 'Rahul Mehta',
      notes: 'Looking for vacation home',
      paymentStatus: 'pending',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      contact: '+91 98765 43212',
      property: {
        name: 'City Center Condo',
        location: 'Bangalore',
        price: '$320,000',
      },
      bookingDate: '2025-06-05',
      bookingTime: '09:15',
      visitDate: '2025-06-15',
      visitTime: '11:00',
      status: 'cancelled',
      agent: 'Priya Patel',
      notes: 'Requested virtual tour first',
      paymentStatus: 'refunded',
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      contact: '+91 98765 43213',
      property: {
        name: 'Garden Villa',
        location: 'Delhi',
        price: '$450,000',
      },
      bookingDate: '2025-06-05',
      bookingTime: '16:45',
      visitDate: '2025-06-18',
      visitTime: '15:30',
      status: 'confirmed',
      agent: 'Sudit Ganguly',
      notes: 'Interested in immediate purchase',
      paymentStatus: 'paid',
    },
  ]);

  return (
    <>
      <Header />
      <div className="p-6 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Property Viewings
          </h1>
          <div className="flex gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Bookings: {bookings.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Client Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Property Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Visit Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Agent & Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {booking.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {booking.email}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {booking.contact}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {booking.property.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {booking.property.location}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {booking.property.price}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      Visit: {booking.visitDate}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      Time: {booking.visitTime}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      Booked: {booking.bookingDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}
                    >
                      {booking.status}
                    </span>
                    <div className="mt-1">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.paymentStatus === 'paid'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : booking.paymentStatus === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      Agent: {booking.agent}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                      {booking.notes}
                    </div>
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
