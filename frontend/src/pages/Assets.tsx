import React, { useState, useEffect } from 'react';

interface Asset {
  id: number;
  name: string;
  hostname: string;
  type: string;
  status: string;
  ipAddress: string;
  description: string;
  location: string;
  owner: string;
  createdAt: Date;
}

const Assets: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [newAsset, setNewAsset] = useState({
    name: '',
    hostname: '',
    type: 'server',
    status: 'active',
    ipAddress: '',
    description: '',
    location: '',
    owner: ''
  });

  // Mock data initialization
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAssets([
        {
          id: 1,
          name: 'Web Server Production',
          hostname: 'web-prod-01',
          type: 'server',
          status: 'active',
          ipAddress: '192.168.1.10',
          description: 'Production web server',
          location: 'Data Center A',
          owner: 'Dev Team',
          createdAt: new Date('2023-01-15')
        },
        {
          id: 2,
          name: 'Database Server',
          hostname: 'db-prod-01',
          type: 'server',
          status: 'active',
          ipAddress: '192.168.1.11',
          description: 'Primary database server',
          location: 'Data Center A',
          owner: 'Dev Team',
          createdAt: new Date('2023-01-20')
        },
        {
          id: 3,
          name: 'Core Switch',
          hostname: 'core-sw-01',
          type: 'switch',
          status: 'maintenance',
          ipAddress: '192.168.1.1',
          description: 'Main network switch',
          location: 'Data Center B',
          owner: 'Network Team',
          createdAt: new Date('2022-11-10')
        },
        {
          id: 4,
          name: 'Firewall',
          hostname: 'fw-01',
          type: 'firewall',
          status: 'active',
          ipAddress: '192.168.1.254',
          description: 'Network perimeter firewall',
          location: 'Data Center A',
          owner: 'Security Team',
          createdAt: new Date('2022-12-05')
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleCreateAsset = () => {
    if (newAsset.name && newAsset.hostname && newAsset.ipAddress) {
      const asset: Asset = {
        id: assets.length + 1,
        ...newAsset,
        createdAt: new Date()
      };
      
      setAssets([...assets, asset]);
      setNewAsset({
        name: '',
        hostname: '',
        type: 'server',
        status: 'active',
        ipAddress: '',
        description: '',
        location: '',
        owner: ''
      });
      setShowModal(false);
    }
  };

  const handleUpdateAsset = () => {
    if (editingAsset) {
      setAssets(assets.map(asset => 
        asset.id === editingAsset.id ? editingAsset : asset
      ));
      setEditingAsset(null);
      setShowModal(false);
    }
  };

  const handleDeleteAsset = (id: number) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const openEditModal = (asset: Asset) => {
    setEditingAsset(asset);
    setShowModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'retired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'server':
        return 'bg-blue-100 text-blue-800';
      case 'workstation':
        return 'bg-purple-100 text-purple-800';
      case 'switch':
        return 'bg-indigo-100 text-indigo-800';
      case 'router':
        return 'bg-teal-100 text-teal-800';
      case 'firewall':
        return 'bg-orange-100 text-orange-800';
      case 'printer':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter assets based on search term and type
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.ipAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || asset.type === filterType;
    
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Assets</h1>
        <button 
          onClick={() => {
            setEditingAsset(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Add Asset
        </button>
      </div>
      
      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="server">Servers</option>
            <option value="workstation">Workstations</option>
            <option value="switch">Switches</option>
            <option value="router">Routers</option>
            <option value="firewall">Firewalls</option>
            <option value="printer">Printers</option>
          </select>
        </div>
      </div>
      
      {/* Assets Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAssets.map((asset) => (
              <tr key={asset.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                    <div className="text-sm text-gray-500">{asset.hostname}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(asset.type)}`}>
                    {asset.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {asset.ipAddress}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                    {asset.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {asset.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {asset.owner}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => openEditModal(asset)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteAsset(asset.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Asset Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">
              {editingAsset ? 'Edit Asset' : 'Add New Asset'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={editingAsset ? editingAsset.name : newAsset.name}
                  onChange={(e) => 
                    editingAsset 
                      ? setEditingAsset({...editingAsset, name: e.target.value}) 
                      : setNewAsset({...newAsset, name: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter asset name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hostname *</label>
                <input
                  type="text"
                  value={editingAsset ? editingAsset.hostname : newAsset.hostname}
                  onChange={(e) => 
                    editingAsset 
                      ? setEditingAsset({...editingAsset, hostname: e.target.value}) 
                      : setNewAsset({...newAsset, hostname: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter hostname"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={editingAsset ? editingAsset.type : newAsset.type}
                  onChange={(e) => 
                    editingAsset 
                      ? setEditingAsset({...editingAsset, type: e.target.value}) 
                      : setNewAsset({...newAsset, type: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="server">Server</option>
                  <option value="workstation">Workstation</option>
                  <option value="laptop">Laptop</option>
                  <option value="switch">Switch</option>
                  <option value="router">Router</option>
                  <option value="firewall">Firewall</option>
                  <option value="printer">Printer</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingAsset ? editingAsset.status : newAsset.status}
                  onChange={(e) => 
                    editingAsset 
                      ? setEditingAsset({...editingAsset, status: e.target.value}) 
                      : setNewAsset({...newAsset, status: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="retired">Retired</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IP Address *</label>
                <input
                  type="text"
                  value={editingAsset ? editingAsset.ipAddress : newAsset.ipAddress}
                  onChange={(e) => 
                    editingAsset 
                      ? setEditingAsset({...editingAsset, ipAddress: e.target.value}) 
                      : setNewAsset({...newAsset, ipAddress: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter IP address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editingAsset ? editingAsset.location : newAsset.location}
                  onChange={(e) => 
                    editingAsset 
                      ? setEditingAsset({...editingAsset, location: e.target.value}) 
                      : setNewAsset({...newAsset, location: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingAsset ? editingAsset.description : newAsset.description}
                  onChange={(e) => 
                    editingAsset 
                      ? setEditingAsset({...editingAsset, description: e.target.value}) 
                      : setNewAsset({...newAsset, description: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                <input
                  type="text"
                  value={editingAsset ? editingAsset.owner : newAsset.owner}
                  onChange={(e) => 
                    editingAsset 
                      ? setEditingAsset({...editingAsset, owner: e.target.value}) 
                      : setNewAsset({...newAsset, owner: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter owner"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={editingAsset ? handleUpdateAsset : handleCreateAsset}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingAsset ? 'Update Asset' : 'Create Asset'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Assets</h3>
          <p className="text-3xl font-bold text-blue-600">{assets.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Active Assets</h3>
          <p className="text-3xl font-bold text-green-600">
            {assets.filter(a => a.status === 'active').length}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Servers</h3>
          <p className="text-3xl font-bold text-purple-600">
            {assets.filter(a => a.type === 'server').length}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Maintenance</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {assets.filter(a => a.status === 'maintenance').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assets;