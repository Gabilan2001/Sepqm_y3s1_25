import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.token) {
          const { data } = await axios.get('http://localhost:5000/api/users/profile', {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          });
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to IT22060426 Project</h1>
        
        {userData ? (
          <div>
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-800">Welcome back, {userData.name}!</h2>
              <p className="text-gray-600 mt-2">You are logged in as: <span className="font-medium">{userData.role}</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Your Profile</h3>
                <p className="text-gray-600 mb-4">View and update your personal information</p>
                <Link 
                  to="/profile" 
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Go to Profile
                </Link>
              </div>

              {userData.role === 'Admin' && (
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2">Admin Dashboard</h3>
                  <p className="text-gray-600 mb-4">Access administrative features</p>
                  <Link 
                    to="/admin-dashboard" 
                    className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold mb-4">Please log in or register</h2>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/login" 
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-2">About This Project</h3>
          <p className="text-gray-600">
            This is a full-stack application demonstrating user authentication, profile management, 
            and role-based access control. Built with React, Node.js, Express, and MongoDB.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;