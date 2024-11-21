import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const TeacherRegister = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
          await axios.post(`${import.meta.env.VITE_APIT}/register`, { username, password });
          toast.success('Registration successful!');
          navigate('/teacherlogin');
        } catch (err) {
          toast.error("registration failed")
          console.log(err)
          setError(err.response?.data?.error || 'Registration failed!');
        } finally {
          setLoading(false);
        }
      };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <form
      className="bg-white p-8 rounded-lg shadow-lg w-80"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Register
      </h2>
      {error && (
        <div className="text-red-500 mb-4 text-center font-semibold">
          {error}
        </div>
      )}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className={`w-full py-2 rounded text-white font-semibold ${
          loading
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        disabled={loading}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
          </div>
        ) : (
          'Register'
        )}
      </button>
      <Link to="/teacherlogin">Already have an account? Login</Link>
    </form>
  </div>
  )
}

export default TeacherRegister
