import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
          },
        });
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setProfileImage(data.profileImage); // Set the profile image URL from the backend
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchProfile();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        'http://localhost:5000/api/users/profile',
        { name, email, phone, profileImage },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
          },
        }
      );
      setMessage('Profile updated successfully'); // Set the success message
      localStorage.setItem('userInfo', JSON.stringify(data));
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setProfileImage(data.profileImage); // Update the profile image state immediately
    } catch (error) {
      //console.error('Error updating profile:', error);
      //setMessage('Error updating profile'); // Set the error message only on failure
    }
  };

  if (loading) {
    return <div className="text-center p-8 text-lg text-gray-700">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      {message && <div className="mb-4 text-green-500">{message}</div>} {/* Display message only if it exists */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profileImage" className="block text-gray-700">Profile Image URL</label>
          <input
            type="text"
            id="profileImage"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Update Profile</button>
      </form>

      {profileImage && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Profile Image</h3>
          <img
            src={profileImage}
            alt="Profile"
            className="mt-2 rounded-lg border shadow-lg w-32 h-32 object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
