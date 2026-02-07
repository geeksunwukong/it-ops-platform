import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">IT Ops Platform</Link>
          </div>
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/assets" 
              className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Assets
            </Link>
            <Link 
              to="/monitoring" 
              className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Monitoring
            </Link>
            <Link 
              to="/automation" 
              className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Automation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;