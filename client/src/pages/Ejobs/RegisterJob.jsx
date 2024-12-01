import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const RegisterJob = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'seeker', // Default to 'seeker'
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner
    try {
    
      const endpoint =
        formData.userType === 'employer'
          ? `${import.meta.env.VITE_APIJ}/registeremployer`
          : `${import.meta.env.VITE_APIJ}/registerjobseeker`;
      const response = await axios.post(endpoint, formData);
      toast.success(response.data.message || 'Registration successful!');
      setFormData({ name: '', email: '', password: '', userType: 'seeker' }); 
      navigate("/joblogin")
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        {/* User Type Selector */}
        <div className="space-y-2">
          <label className="block font-medium">Register as:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="border p-2 w-full rounded"
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
            'Register'
          )}
        </button>
      </form>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default RegisterJob;
