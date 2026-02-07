import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Assets</h2>
          <p className="text-3xl font-bold text-blue-600">127</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Monitored Servers</h2>
          <p className="text-3xl font-bold text-green-600">42</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Active Alerts</h2>
          <p className="text-3xl font-bold text-yellow-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Automated Tasks</h2>
          <p className="text-3xl font-bold text-purple-600">18</p>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 py-1">
            <p className="font-medium">Server maintenance completed</p>
            <p className="text-gray-600 text-sm">2 minutes ago</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-1">
            <p className="font-medium">New asset registered</p>
            <p className="text-gray-600 text-sm">1 hour ago</p>
          </div>
          <div className="border-l-4 border-red-500 pl-4 py-1">
            <p className="font-medium">High CPU usage alert</p>
            <p className="text-gray-600 text-sm">3 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;