import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        phone,
      });

      if (data?.token) {
        const userData = {
          token: data.token,
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role
        };
        
        onRegisterSuccess(userData);
        navigate('/');
      } else {
        setError('Registration failed - please try again');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">Phone</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-green-500 text-white p-2 rounded-md disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>Already have an account? <Link to="/login" className="text-blue-500">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;