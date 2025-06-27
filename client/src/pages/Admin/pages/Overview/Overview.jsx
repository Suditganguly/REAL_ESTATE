import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

import Header from '../../components/Header'; // ✅ import the header
import './Overview.css';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function Overview() {
  const pieData = {
    labels: ['Available', 'Sold'],
    datasets: [
      {
        data: [35, 23],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderColor: ['rgba(76, 175, 80, 0.8)', 'rgba(244, 67, 54, 0.8)'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Users', 'Uploaded', 'Sold'],
    datasets: [
      {
        label: 'Overview Stats',
        data: [120, 58, 23],
        backgroundColor: '#3B82F6',
        borderColor: '#2563EB',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151',
        },
      },
      tooltip: {
        backgroundColor: document.documentElement.classList.contains('dark') ? '#374151' : '#FFFFFF',
        titleColor: document.documentElement.classList.contains('dark') ? '#F3F4F6' : '#111827',
        bodyColor: document.documentElement.classList.contains('dark') ? '#F3F4F6' : '#111827',
        borderColor: document.documentElement.classList.contains('dark') ? '#4B5563' : '#E5E7EB',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#E5E7EB',
        },
      },
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#374151',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#E5E7EB',
        },
      },
    },
  };

  return (
    <>
      <Header />
      <div className="p-6 dark:bg-gray-900">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">Total Properties</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">150</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">Active Listings</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">89</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">Total Sales</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">61</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Sales Distribution</h3>
            <div className="h-[300px] w-full">
              <Pie data={pieData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Monthly Overview</h3>
            <div className="h-[300px] w-full">
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
