import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginJob = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'seeker', // Default to 'seeker'
  });

  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner
    try {
      // Determine the endpoint based on the selected userType
      const endpoint =
        formData.userType === 'employer'
          ? `${import.meta.env.VITE_APIJ}/employerlogin`
          : `${import.meta.env.VITE_APIJ}/jobseekerlogin`;

      const response = await axios.post(endpoint, {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('token', response.data.token); 
      toast.success('Login successful!');
  

      // Navigate to the respective route
      if (formData.userType === 'seeker') {
        navigate('/jobseekerdashboard'); 
      } else {
        navigate('/employerdashboard')
      }
    } catch (error) {
        console.log(error)
      toast.error(error.response?.data?.message || 'An error occurred during login.');
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-3">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* User Type Selector */}
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Login as:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="seeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            'Login'
          )}
        </button>
        <Link to="/jobregister">
            Dnt have an account? register
        </Link>
      </form>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default LoginJob;
