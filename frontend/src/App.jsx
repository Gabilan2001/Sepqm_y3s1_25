import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load and verify user data on component mount
  useEffect(() => {
    const verifyAuth = async () => {
      const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      if (storedUserInfo?.token) {
        try {
          // Verify token with backend
          const { data } = await axios.get('http://localhost:5000/api/users/profile', {
            headers: {
              Authorization: `Bearer ${storedUserInfo.token}`,
            },
          });
          
          setIsLoggedIn(true);
          setUserInfo(data);
        } catch (error) {
          // Token is invalid or expired
          localStorage.removeItem('userInfo');
          setIsLoggedIn(false);
          setUserInfo(null);
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  // Handle login
  const handleLogin = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUserInfo(userData);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  // Update user info
  const handleUpdateUserInfo = (updatedInfo) => {
    const newUserInfo = { ...userInfo, ...updatedInfo };
    localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
    setUserInfo(newUserInfo);
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <Router>
      <Header 
        isLoggedIn={isLoggedIn} 
        userInfo={userInfo} 
        onLogout={handleLogout} 
      />
      <Routes>
        <Route 
          path="/" 
          element={<Home isLoggedIn={isLoggedIn} userInfo={userInfo} />} 
        />
        <Route 
          path="/login" 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <Profile 
              userInfo={userInfo} 
              onUpdateUserInfo={handleUpdateUserInfo} 
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;