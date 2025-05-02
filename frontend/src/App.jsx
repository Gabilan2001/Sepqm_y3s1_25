// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Header from './components/Header';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Profile from './pages/Profile';
// import AdminDashboard from './pages/AdminDashboard';
// import Offers from './pages/Offers';
// import axios from 'axios';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userInfo, setUserInfo] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verifyAuth = async () => {
//       const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      
//       if (storedUserInfo?.token) {
//         try {
//           const { data } = await axios.get('http://localhost:5000/api/users/profile', {
//             headers: {
//               Authorization: `Bearer ${storedUserInfo.token}`,
//             },
//           });
          
//           setIsLoggedIn(true);
//           setUserInfo(data);
//         } catch (error) {
//           localStorage.removeItem('userInfo');
//           setIsLoggedIn(false);
//           setUserInfo(null);
//         }
//       }
//       setLoading(false);
//     };

//     verifyAuth();
//   }, []);

//   const handleLogin = async (loginData) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/login', loginData);
      
//       if (response.data.token) {
//         const userData = {
//           token: response.data.token,
//           ...response.data.user
//         };
        
//         localStorage.setItem('userInfo', JSON.stringify(userData));
//         setIsLoggedIn(true);
//         setUserInfo(userData);
//         return { success: true };
//       }
//       return { success: false, message: 'Invalid response from server' };
//     } catch (error) {
//       console.error('Login failed:', error);
//       return { 
//         success: false, 
//         message: error.response?.data?.message || 'Login failed' 
//       };
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('userInfo');
//     setIsLoggedIn(false);
//     setUserInfo(null);
//   };

//   const handleUpdateUserInfo = (updatedInfo) => {
//     const newUserInfo = { ...userInfo, ...updatedInfo };
//     localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
//     setUserInfo(newUserInfo);
//   };

//   if (loading) {
//     return <div className="text-center p-8">Loading...</div>;
//   }

//   return (
//     <Router>
//       <Header 
//         isLoggedIn={isLoggedIn} 
//         userInfo={userInfo} 
//         onLogout={handleLogout} 
//       />
//       <Routes>
//         <Route path="/" element={<Home isLoggedIn={isLoggedIn} userInfo={userInfo} />} />
//         <Route 
//           path="/login" 
//           element={
//             isLoggedIn ? (
//               <Navigate to="/" replace />
//             ) : (
//               <Login onLogin={handleLogin} />
//             )
//           } 
//         />
//         <Route 
//           path="/register" 
//           element={
//             isLoggedIn ? (
//               <Navigate to="/" replace />
//             ) : (
//               <Register />
//             )
//           } 
//         />
//         <Route
//           path="/profile"
//           element={
//             isLoggedIn ? (
//               <Profile userInfo={userInfo} onUpdateUserInfo={handleUpdateUserInfo} />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//         <Route 
//           path="/admin-dashboard" 
//           element={
//             isLoggedIn && userInfo?.isAdmin ? (
//               <AdminDashboard />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           } 
//         />
//         <Route path="/offers" element={<Offers />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Offers from './pages/Offers';
import axios from 'axios';
import Product from './pages/Product'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      if (storedUserInfo?.token) {
        try {
          const { data } = await axios.get('http://localhost:5000/api/users/profile', {
            headers: {
              Authorization: `Bearer ${storedUserInfo.token}`,
            },
          });
          
          setIsLoggedIn(true);
          setUserInfo(data);
        } catch (error) {
          localStorage.removeItem('userInfo');
          setIsLoggedIn(false);
          setUserInfo(null);
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUserInfo(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setUserInfo(null);
  };

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
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} userInfo={userInfo} />} />
        <Route 
          path="/login" 
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          } 
        />
        <Route 
          path="/register" 
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Register onRegisterSuccess={handleLoginSuccess} />
            )
          } 
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Profile userInfo={userInfo} onUpdateUserInfo={handleUpdateUserInfo} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route 
          path="/admin-dashboard" 
          element={
            isLoggedIn && userInfo?.role === 'Admin' ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/product" 
          element={
            isLoggedIn && userInfo?.role === 'Admin' ? (
              <Product />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        <Route 
          path="/product" 
          element={
            isLoggedIn && userInfo?.role === 'Admin' ? (
              <Product />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        <Route path="/offers" element={<Offers />} />
        <Route path="/products" element={<Product />} />
        
      </Routes>
    </Router>
  );
}

export default App;