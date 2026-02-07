import { Request, Response } from 'express';

// Mock data for demonstration
const mockServerMetrics = [
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
];

const mockNetworkMetrics = [
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
];

const mockAlerts = [
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
];

// Get server metrics
export const getServerMetrics = async (req: Request, res: Response) => {
  try {
    // In a real implementation, this would fetch data from a monitoring system
    res.json({ metrics: mockServerMetrics });
  } catch (error) {
    console.error('Error fetching server metrics:', error);
    res.status(500).json({ message: 'Server error while fetching server metrics' });
  }
};

// Get network metrics
export const getNetworkMetrics = async (req: Request, res: Response) => {
  try {
    // In a real implementation, this would fetch data from a network monitoring system
    res.json({ metrics: mockNetworkMetrics });
  } catch (error) {
    console.error('Error fetching network metrics:', error);
    res.status(500).json({ message: 'Server error while fetching network metrics' });
  }
};

// Get alerts
export const getAlerts = async (req: Request, res: Response) => {
  try {
    const { resolved, severity } = req.query;
    
    let filteredAlerts = [...mockAlerts];
    
    if (resolved !== undefined) {
      filteredAlerts = filteredAlerts.filter(alert => 
        alert.resolved === (resolved === 'true')
      );
    }
    
    if (severity) {
      filteredAlerts = filteredAlerts.filter(alert => 
        alert.severity === severity
      );
    }
    
    res.json({ alerts: filteredAlerts });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ message: 'Server error while fetching alerts' });
  }
};

// Create alert
export const createAlert = async (req: Request, res: Response) => {
  try {
    const { title, description, severity, serverId } = req.body;

    // Create new alert
    const newAlert = {
      id: mockAlerts.length + 1,
      title,
      description,
      severity,
      serverId,
      timestamp: new Date(),
      resolved: false
    };

    mockAlerts.push(newAlert);

    res.status(201).json({
      message: 'Alert created successfully',
      alert: newAlert
    });
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({ message: 'Server error while creating alert' });
  }
};

// Get system health
export const getSystemHealth = async (req: Request, res: Response) => {
  try {
    // In a real implementation, this would check various system components
    const healthData = {
      overallStatus: 'healthy',
      checks: {
        database: 'connected',
        redis: 'connected',
        api: 'running',
        storage: 'ok'
      },
      timestamp: new Date(),
      uptime: process.uptime()
    };

    res.json(healthData);
  } catch (error) {
    console.error('Error fetching system health:', error);
    res.status(500).json({ message: 'Server error while fetching system health' });
  }
};