import React, { useState } from 'react';
import axios from 'axios';

const PostJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API}/job/jobs`,
        { title, description, requirements: requirements.split(',') },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      alert('Job Posted Successfully');
      setTitle('');
      setDescription('');
      setRequirements('');
    } catch (err) {
      console.error(err.message);
      alert('Failed to Post Job');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Post a Job</h1>
      <form onSubmit={handlePostJob} className="space-y-4 max-w-lg">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-2 border rounded"
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Requirements (comma-separated)"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="block w-full p-2 border rounded"
        />
        <button className="bg-blue-500 text-white p-2 rounded w-full">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
