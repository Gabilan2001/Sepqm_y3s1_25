// frontend/src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
  const role = localStorage.getItem('role'); // Get user role from localStorage

  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="text-xl">IT22060426</div>
      <div>
        {isLoggedIn ? (
          <div className="flex space-x-4">
            <button onClick={onLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            <Link to="/profile" className="px-4 py-2 rounded bg-blue-500">Profile</Link>
            {role === 'Admin' && (
              <Link to="/admin-dashboard" className="px-4 py-2 rounded bg-green-500">Admin Dashboard</Link>
            )}
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">Login</Link>
            <Link to="/register" className="bg-green-500 px-4 py-2 rounded">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
