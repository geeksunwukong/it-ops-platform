import React, { useState, useEffect } from 'react';

interface ServerMetric {
  id: number;
  serverName: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkIn: number;
  networkOut: number;
  status: string;
  lastUpdated: Date;
}

interface NetworkMetric {
  id: number;
  deviceName: string;
  bandwidthUtilization: number;
  packetLoss: number;
  latency: number;
  status: string;
  lastUpdated: Date;
}

interface Alert {
  id: number;
  title: string;
  description: string;
  severity: string;
  serverId: number;
  timestamp: Date;
  resolved: boolean;
}

const Monitoring: React.FC = () => {
  const [serverMetrics, setServerMetrics] = useState<ServerMetric[]>([]);
  const [networkMetrics, setNetworkMetrics] = useState<NetworkMetric[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data initialization
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setServerMetrics([
        {
          id: 1,
          serverName: 'Web Server 1',
          cpuUsage: 45,
          memoryUsage: 60,
          diskUsage: 30,
          networkIn: 12.5,
          networkOut: 8.2,
          status: 'online',
          lastUpdated: new Date()
        },
        {
          id: 2,
          serverName: 'Database Server',
          cpuUsage: 75,
          memoryUsage: 85,
          diskUsage: 65,
          networkIn: 45.1,
          networkOut: 32.7,
          status: 'warning',
          lastUpdated: new Date()
        }
      ]);

      setNetworkMetrics([
        {
          id: 1,
          deviceName: 'Core Switch',
          bandwidthUtilization: 35,
          packetLoss: 0.1,
          latency: 5,
          status: 'online',
          lastUpdated: new Date()
        },
        {
          id: 2,
          deviceName: 'Firewall',
          bandwidthUtilization: 65,
          packetLoss: 0.2,
          latency: 12,
          status: 'online',
          lastUpdated: new Date()
        }
      ]);

      setAlerts([
        {
          id: 1,
          title: 'High CPU Usage',
          description: 'Server Web Server 1 has high CPU usage',
          severity: 'warning',
          serverId: 1,
          timestamp: new Date(),
          resolved: false
        },
        {
          id: 2,
          title: 'Disk Space Low',
          description: 'Database Server has low disk space',
          severity: 'critical',
          serverId: 2,
          timestamp: new Date(),
          resolved: false
        }
      ]);

      setLoading(false);
    }, 800);
  }, []);

  // Calculate status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Calculate severity colors
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'info':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Monitoring</h1>
      
      {/* Server Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Server Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serverMetrics.map((server) => (
            <div key={server.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">{server.serverName}</h3>
                <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor(server.status)} mr-2`}></span>
              </div>
              
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CPU Usage</span>
                    <span>{server.cpuUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        server.cpuUsage > 80 ? 'bg-red-500' : 
                        server.cpuUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`} 
                      style={{ width: `${server.cpuUsage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Memory Usage</span>
                    <span>{server.memoryUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        server.memoryUsage > 80 ? 'bg-red-500' : 
                        server.memoryUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`} 
                      style={{ width: `${server.memoryUsage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Disk Usage</span>
                    <span>{server.diskUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        server.diskUsage > 80 ? 'bg-red-500' : 
                        server.diskUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`} 
                      style={{ width: `${server.diskUsage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-xs text-gray-500">Network In</p>
                    <p className="font-medium">{server.networkIn} Mbps</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Network Out</p>
                    <p className="font-medium">{server.networkOut} Mbps</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Network Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Network Metrics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Device</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Bandwidth</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Packet Loss</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Latency</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {networkMetrics.map((device) => (
                <tr key={device.id}>
                  <td className="py-3 px-4 text-sm">{device.deviceName}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            device.bandwidthUtilization > 80 ? 'bg-red-500' : 
                            device.bandwidthUtilization > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`} 
                          style={{ width: `${device.bandwidthUtilization}%` }}
                        ></div>
                      </div>
                      <span>{device.bandwidthUtilization}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{device.packetLoss}%</td>
                  <td className="py-3 px-4 text-sm">{device.latency}ms</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(device.status)} text-white`}>
                      {device.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Alerts */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Alerts</h2>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`border-l-4 p-4 rounded-r ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex justify-between">
                <h3 className="font-medium">{alert.title}</h3>
                <span className="text-sm">{new Date(alert.timestamp).toLocaleString()}</span>
              </div>
              <p className="mt-1 text-gray-700">{alert.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  Server ID: {alert.serverId}
                </span>
                <button className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                  {alert.resolved ? 'Reopen' : 'Resolve'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Monitoring;