import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobSeekerDashboard = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_APIJ}/getjobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppliedJobs(response.data);
    };
    fetchAppliedJobs();
  }, []);

  return (
    <div className="p-6 mt-3">
      <h2 className="text-2xl font-bold mb-4">Your Applied Jobs</h2>
      <ul>
        {appliedJobs.map((application) => (
          <li key={application._id} className="border p-4 rounded mb-4">
            <h3 className="font-bold">{application.job.title}</h3>
            <p>{application.job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobSeekerDashboard;
