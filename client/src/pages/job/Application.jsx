import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Application = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/job/applications`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setApplications(res.data);
      } catch (err) {
        console.error(err.message);
        alert('Failed to Load Applications');
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Job Applications</h1>
      {applications.length > 0 ? (
        applications.map((application) => (
          <div key={application._id} className="border p-4 my-4 rounded">
            <h2 className="font-semibold">{application.job.title}</h2>
            <p>
              <strong>Applicant:</strong> {application.applicant.name}
            </p>
            <p>
              <strong>Email:</strong> {application.applicant.email}
            </p>
            <p>
              <strong>Cover Letter:</strong> {application.coverLetter}
            </p>
          </div>
        ))
      ) : (
        <p>No Applications Found</p>
      )}
    </div>
  );
};

export default Application;
