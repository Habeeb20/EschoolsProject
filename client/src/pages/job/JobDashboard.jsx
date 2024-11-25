import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobDashboard = () => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
        const fetchData = async () => {
          const currentUser = JSON.parse(localStorage.getItem('user'));
          setUser(currentUser);
    
          try {
            if (currentUser.role === 'job_seeker') {
              const res = await axios.get('/applications/mine', {
                headers: { Authorization: localStorage.getItem('token') },
              });
              setData(res.data);
            } else if (currentUser.role === 'employer') {
              const res = await axios.get('/jobs/mine', {
                headers: { Authorization: localStorage.getItem('token') },
              });
              setData(res.data);
            }
          } catch (err) {
            console.error(err.message);
            alert('Failed to Load Dashboard');
          }
        };
    
        fetchData();
      }, []);
    
      return (
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Dashboard</h1>
          {user && user.role === 'job_seeker' && (
            <div>
              <h2 className="text-lg font-bold mb-2">My Applications</h2>
              {data.length > 0 ? (
                data.map((application) => (
                  <div key={application._id} className="border p-4 my-4 rounded">
                    <h3 className="font-semibold">{application.job.title}</h3>
                    <p>
                      <strong>Status:</strong> {application.status}
                    </p>
                  </div>
                ))
              ) : (
                <p>No Applications Found</p>
              )}
            </div>
          )}
          {user && user.role === 'employer' && (
            <div>
              <h2 className="text-lg font-bold mb-2">My Posted Jobs</h2>
              {data.length > 0 ? (
                data.map((job) => (
                  <div key={job._id} className="border p-4 my-4 rounded">
                    <h3 className="font-semibold">{job.title}</h3>
                    <p>
                      <strong>Description:</strong> {job.description}
                    </p>
                    <p>
                      <strong>Applications:</strong> {job.applications.length}
                    </p>
                  </div>
                ))
              ) : (
                <p>No Jobs Posted</p>
              )}
            </div>
          )}
        </div>
  )
}

export default JobDashboard
