import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Don't forget to import Link
import toast from 'react-hot-toast';
const JobSeekerDashboard = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [userData, setUserData] = useState({
    schoolAttended:"",
    Grade:"",
    Qualification:"",
    workExp:"",
    phone:'',
    state:"",
    LGA:"",
    location:"",
    profilePicture:"",
  })
  const [user, setUser] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState()
  useEffect(() => {
    const fetchData = async() => {
      try {
        const token =localStorage.getItem('token')
        const {data} = await axios.get(`${import.meta.env.VITE_APIJ}/dashbaord`, {
          headers:{Authorization: `Bearer ${token}`}
        })

        setUserData(data)
 
        setUser(data)
        setUserId(data._id)
      } catch (error) {
        toast.error("failed to fetch user data")
        setError('Failed to fetch user data.')
      }
    };

    fetchData()
  })



const handleApply = async (jobId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APIJ}/applyjob/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token for authentication
      },
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
    } else {
      toast.error(data.message || "Failed to apply for the job");
    }
  } catch (error) {
    console.error("Error applying for job:", error);
    toast.error("An unexpected error occurred");
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_APIJ}/${userId}`, userData,
        {
          headers:{Authorization: `Bearer ${token}`}
        }
      );
      console.log(userData)
      toast.success("profile successfully updated")
      setSuccessMessage('Profile updated successfully!');
      setShowPopup(false);
    } catch (error) {
      toast.error("failed to update profile")
      console.log(error)
      setError('Failed to update profile.');
    }
  }

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dc0poqt9l/image/upload', formData, {
        params: {
          upload_preset: 'essential',
        },
      });
      setUserData((prevData) => ({
        ...prevData,
        [field]: response.data.secure_url, 
      }));
    } catch (err) {
      console.error('Error uploading file to Cloudinary', err);
    }
  };



  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const token = localStorage.getItem('token');
      console.log("this is token!!!", token)
      const response = await axios.get(`${import.meta.env.VITE_APIJ}/getjobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
   
      setAppliedJobs(response.data);
      console.log("this is job!!",response.data)
    };
    fetchAppliedJobs();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APIJ}/alljobs`);
        setJobs(response.data);
        console.log("you are looking for me", response.data)
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-6 mt-3 max-w-screen-lg mx-auto">
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          General Information
        </h2>   
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Email", value: user.email },
            { label: "Address", value: user.location },
            { label: "LGA", value: user.LGA },
            { label: "State", value: user.state },
            { label: "Qualification", value: user.Qualification },
            { label: "SchoolAttended", value: user.schoolAttended },
            { label: "Grade", value: user.Grade },
            user.profilePicture
          ].map((info, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-200 p-4 rounded-md shadow-sm"
            >
              <p className="text-sm text-gray-500">{info?.label}</p>
              <p className="text-lg font-semibold text-gray-800">
                {info?.value || "N/A"}
              </p>
            </div>
          ))}
        </div>
        {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Update Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.keys(userData).map((key) =>
             
                key !== "profilePicture" ? (
                  <div key={key} className="flex flex-col">
                    <label
                      className="block text-sm font-medium text-gray-600 mb-1"
                      htmlFor={key}
                    >
                      {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </label>
                    <input
                      type={key.includes("Date") ? "date" : "text"}
                      id={key}
                      name={key}
                      value={userData[key]}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                ) : null
              )}
    
              {/* New input fields */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                school Attended
                </label>
                <input
                  type="text"
                  name="schoolAttended"
                  value={userData.schoolAttended}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
    
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Grade graduated with
                </label>
                <input
                  type="text"
                  name="Grade"
                  value={userData.Grade}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  phone number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
               Qualification
                </label>
                <input
                  type="text"
                  name="Qualification"
                  value={userData.Qualification}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
          

         


              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
              work experience
                </label>
                <input
                  type="text"
                  name="workExp"
                  value={userData.workExp}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
           

              

        




              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={userData.state}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

          

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  LGA
                </label>
                <input
                  type="text"
                  name="LGA"
                  value={userData.LGA}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>



       
        
    
         
    
         

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  profile Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picture1")}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>
        
         

         
    
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
    
      <button
        onClick={() => setShowPopup(true)}
        className="mt-5 py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        Edit Profile
      </button>
    
      {error && <div className="text-red-500 mt-5">{error}</div>}
      {successMessage && (
        <div className="text-green-500 mt-5">{successMessage}</div>
      )}
      
    
  

      </section>
      
      <h2 className="text-3xl font-bold mb-6 text-center">Your Applied Jobs</h2>

      {/* Applied Jobs Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Applied Jobs</h3>
        {appliedJobs.length > 0 ? (
          <ul className="space-y-4">
            {appliedJobs.map((application) => (
              <li key={application._id} className="border p-4 rounded-lg shadow-md hover:shadow-xl transition ease-in-out">
                <h4 className="text-xl font-semibold text-blue-600">{application.job?.title}</h4>
                <p className="text-gray-700 mt-2">{application.job?.description}</p>
                <p className="text-sm text-gray-500 mt-2">{application.job?.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You have not applied to any jobs yet.</p>
        )}
      </div>


      {/* All Jobs Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Available Jobs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition ease-in-out">
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-blue-600">Job title: {job.title}</h4>
                  <p className="text-gray-700 mt-2">job description:{job.description}</p>
                  <p className="text-sm text-gray-500 mt-2">Location: {job.location}</p>
                  <p className="text-sm text-gray-500 mt-2">Employer Name: {job.employerName}</p>

                  <div className="mt-4">
                  <button
              onClick={() => handleApply(job.jobId)}
              className="inline-block px-6 py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Apply Now
            </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No jobs available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
