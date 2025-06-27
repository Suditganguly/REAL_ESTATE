import Header from '../../components/Header';
import './Reports.css';

export default function Reports() {
  const salesData = {
    monthly: {
      amount: 150000,
      count: 5,
      change: '+12.5%',
      trend: 'up'
    },
    quarterly: {
      amount: 450000,
      count: 15,
      change: '+8.3%',
      trend: 'up'
    },
    yearly: {
      amount: 1800000,
      count: 61,
      change: '+15.2%',
      trend: 'up'
    }
  };

  const propertyStats = {
    active: 58,
    pending: 12,
    sold: 23,
    totalValue: 25000000
  };

  const topAgents = [
    {
      name: 'Ankita Sharma',
      sales: 15,
      revenue: 4500000,
      rating: 4.8,
      deals: { pending: 3, completed: 15 }
    },
    {
      name: 'Rahul Mehta',
      sales: 12,
      revenue: 3800000,
      rating: 4.6,
      deals: { pending: 4, completed: 12 }
    },
    {
      name: 'Priya Patel',
      sales: 10,
      revenue: 3200000,
      rating: 4.7,
      deals: { pending: 2, completed: 10 }
    }
  ];

  const marketInsights = [
    {
      area: 'Mumbai',
      avgPrice: 1200000,
      demand: 'High',
      trend: '+5.2%'
    },
    {
      area: 'Bangalore',
      avgPrice: 950000,
      demand: 'Very High',
      trend: '+7.8%'
    },
    {
      area: 'Delhi NCR',
      avgPrice: 1100000,
      demand: 'Medium',
      trend: '+3.5%'
    }
  ];

  return (
    <>
      <Header />
      <div className="p-6 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Reports & Analytics</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Comprehensive overview of your real estate business
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: June 5, 2025
          </div>
        </div>

        {/* Sales Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {Object.entries(salesData).map(([period, data]) => (
            <div key={period} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white capitalize">{period} Sales</h3>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${(data.amount).toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm ${
                    data.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {data.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    ({data.count} properties)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Property Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Property Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Active Listings</span>
                <span className="text-gray-900 dark:text-white font-semibold">{propertyStats.active}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Pending Sales</span>
                <span className="text-gray-900 dark:text-white font-semibold">{propertyStats.pending}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Sold Properties</span>
                <span className="text-gray-900 dark:text-white font-semibold">{propertyStats.sold}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-300">Total Portfolio Value</span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  ${(propertyStats.totalValue).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Market Insights */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Market Insights</h3>
            <div className="space-y-4">
              {marketInsights.map((area) => (
                <div key={area.area} className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-900 dark:text-white font-semibold">{area.area}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      (Demand: {area.demand})
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-900 dark:text-white font-semibold">
                      ${(area.avgPrice).toLocaleString()}
                    </div>
                    <span className={`text-sm ${
                      area.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {area.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Agents */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Top Performing Agents</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="px-4 py-2">Agent</th>
                  <th className="px-4 py-2">Sales</th>
                  <th className="px-4 py-2">Revenue</th>
                  <th className="px-4 py-2">Rating</th>
                  <th className="px-4 py-2">Active Deals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {topAgents.map((agent) => (
                  <tr key={agent.name}>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{agent.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{agent.sales} properties</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      ${(agent.revenue).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-yellow-500">{agent.rating} ★</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {agent.deals.pending} pending, {agent.deals.completed} completed
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
