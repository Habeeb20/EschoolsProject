import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', location: "", });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] =useState()

  const token = localStorage.getItem('token'); 

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APIJ}/getapplicant`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data.jobs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_APIJ}/postjob`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Job posted successfully!");
      setFormData({ title: "", description: "", location: "" });
      setJobs([...jobs, response.data.job]);
      console.log([...jobs, response.data.job]);

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to post job!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.get(`${import.meta.env.VITE_APIJ}/myjobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(response.data.jobs);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching jobs");
    } finally {
      setIsLoading(false);
    }
  };

  fetchJobs();
}, []);

  return (
    <div className="container mx-auto py-6 px-4 mt-3">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-6 text-green-700">Employer Dashboard</h1>

      {/* Job Post Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      
      <h2 className="text-2xl font-bold text-green-700 mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter job title"
            className="w-full border-2 border-green-500 rounded-md p-2 focus:outline-none focus:border-green-700"
            required
          />
        </div>

        {/* Job Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter job description"
            rows="4"
            className="w-full border-2 border-green-500 rounded-md p-2 focus:outline-none focus:border-green-700"
            required
          />
        </div>

        {/* Job Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Job Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter job location"
            className="w-full border-2 border-green-500 rounded-md p-2 focus:outline-none focus:border-green-700"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition duration-300 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
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
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          ) : null}
          {isLoading ? "Posting..." : "Post Job"}
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>

      {/* Job List */}
      <h2 className="text-3xl font-bold text-green-700 mb-4">Your Job Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-green-600">
              <h3 className="text-xl font-semibold text-green-800">Job Title:{job.title}</h3>
              <p className="text-gray-600">Job description: {job.description}</p>
              <p className="text-gray-600">Job location: {job.location}</p>
              <p className="text-green-600 font-medium mt-2">Applicants: {job.applicants.length}</p>
              <p className="text-green-600 font-medium mt-2">Applicants details: {job.applicants}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600">No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
