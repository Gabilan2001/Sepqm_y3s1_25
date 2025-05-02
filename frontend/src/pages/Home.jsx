import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = ({ isLoggedIn }) => {
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
  }, [isLoggedIn]); // Re-fetch user data when isLoggedIn changes

  if (loading) {
    return <div className="text-center p-8 text-lg text-gray-700">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-8 flex items-center justify-center">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl p-8 space-y-6 w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Welcome to IT22060426 Project</h1>

        {isLoggedIn ? (
          <div className="space-y-8">
            <div className="p-6 bg-blue-50 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-blue-800">Welcome back, {userData?.name}!</h2>
              <p className="text-gray-600 mt-2">You are logged in as: <span className="font-semibold">{userData?.role}</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Profile</h3>
                <p className="text-gray-500 mb-4">View and update your personal information.</p>
                <Link
                  to="/profile"
                  className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                >
                  Go to Profile
                </Link>
              </div>

              <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Book Management</h3>
                <p className="text-gray-500 mb-4">Manage your book collection. Add, edit, and delete books.</p>
                <Link
                  to="/books"
                  className="inline-block bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600 transition-colors"
                >
                  Manage Books
                </Link>
              </div>

              {userData?.role === 'Admin' && (
                <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Admin Dashboard</h3>
                  <p className="text-gray-500 mb-4">Access administrative features and manage users.</p>
                  <Link
                    to="/admin-dashboard"
                    className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold mb-4">Please log in or register</h2>
            <div className="flex justify-center space-x-6">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-green-700 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">About This Project</h3>
          <p className="text-gray-600">
            This is a full-stack application demonstrating user authentication, profile management, 
            book management, and role-based access control. Built with React, Node.js, Express, and MongoDB.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
