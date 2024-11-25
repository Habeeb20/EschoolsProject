import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API}/job/jobs`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-4 mt-10">
      <h1 className="text-xl font-bold">Available Jobs</h1>
      {jobs.map((job) => (
        <div key={job._id} className="border p-4 my-4 rounded">
          <h2 className="text-lg font-semibold">{job.title}</h2>
          <p>{job.description}</p>
          <p><strong>Requirements:</strong> {job.requirements.join(', ')}</p>
          <button
            onClick={() => alert('Apply feature here')}
            className="bg-green-500 text-white p-2 rounded mt-2"
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobList;
