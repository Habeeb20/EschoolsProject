import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../component/bookshop/api";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
const BookRegister = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setError('');
    e.preventDefault();
    setLoading(true); 
    try {
      await api.post("/register", form);
      toast.success("Registration successful! Redirecting to login...");
      setLoading(false);
      navigate("/bookshoplogin");
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Registration failed");
      setError(err.response?.data?.error || 'Registration failed!');
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Bookshop Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        
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
            disabled={loading}
            className={`w-full flex justify-center items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookRegister;
