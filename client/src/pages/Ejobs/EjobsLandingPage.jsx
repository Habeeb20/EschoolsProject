import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const EjobsLandingPage = () => {
const[schools, setSchools] = useState([])
  const [jobs, setJobs] = useState([]);
  
  const [chartData, setChartData] = useState({
    labels: ['Jobs Posted', 'Employers', 'Job Seekers'],
    datasets: [
      {
        data: [0, 0, 0], 
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF5A5F', '#36A2EB', '#FFB06A'],
      },
    ],
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APIJ}/alljobs`, );
        console.log(response.data)
        setJobs(response.data);
        
        // Example data for pie chart
        setChartData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: [
                response.data.jobs?.length, // Jobs posted
                response.data.employersCount, // Employers
                response.data.jobSeekersCount, // Job seekers
              ],
            },
          ],
        }));
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/schools`);
        const data = await response.json();

        const schoolsWithVacancies = data.filter(
          (school) => school.jobVacancy === "yes" || school.jobVacancy === "yeah"
        );
        
        setSchools(schoolsWithVacancies); 
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };
  
    fetchSchools();
  }, []);
  


  return (
    <div className="container   mt-10">
      <div className="flex justify-between items-center ">
        <h1 className="text-4xl font-bold">Available Jobs</h1>
        <Link
          to="/joblogin"
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
        >
          Login
        </Link>
      </div>

    
      <div className="mt-6">
  <h2 className="text-2xl font-semibold text-center mb-4">Job Statistics</h2>
  <div className="flex justify-center items-center">
    <div
      className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-2/3 lg:w-1/3"
      style={{
        maxWidth: "400px",
      }}
    >
      <Pie
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: {
                font: {
                  size: 14,
                },
                color: "#333",
              },
            },
            tooltip: {
              backgroundColor: "#f4f4f4",
              titleFont: { size: 16 },
              bodyFont: { size: 14 },
              borderColor: "#ddd",
              borderWidth: 1,
            },
          },
        }}
      />
    </div>
  </div>
</div>

         {/* Job Listings */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {jobs?.map((job) => (
          <div key={job._id} className="bg-white  rounded-lg shadow-lg hover:shadow-2xl transition">
            <h2 className="text-xl font-semibold text-blue-600">Job title: {job.title}</h2>
            <p className="text-gray-700 mt-2">Job description: {job.description}</p>
            <p className="text-gray-700 mt-2">Job location{job.location}</p>
            <div className="mt-4">
              <Link
                to="/joblogin"
                className="text-blue-500 hover:text-blue-700"
              >
              <button onClick={() => toast.error("you have to login to ur jobseeker account before you can apply for a job")}>
              Apply Now

              </button>
              
              </Link>
            </div>
          </div>
        ))}
      </div>
 
 




      <div className="container ">
  {schools.length > 0 ? (
    <div className=" grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {schools.map((school) => (
        <div key={school.id} className="bg-white p-6 rounded-lg shadow-lg transition transform  hover:shadow-2xl duration-300">
          {/* School Details */}
          <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">You can also apply for the vacant jobs in these schools via email</h2>

          {/* School Vacant Positions in Separate Grid Boxes */}
          <div className="grid grid-cols-1 gap-6 mt-4 w-full">
            {/* Vacant Position 1 */}
            {school.position1 && (
              <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                <h3 className="text-lg font-semibold text-blue-600">School Name: {school.schoolName}</h3>
                <p className="text-gray-700 mt-2">State: {school.state}</p>
                <p className="text-gray-700 mt-2">Location: {school.location}, {school.LGA}</p>
                <h4 className="text-lg font-semibold text-blue-600 mt-4">Vacant Position: {school.position1}</h4>
                <p className="text-gray-700 mt-2">Salary: {school.salary1}</p>
                <p className="text-gray-700 mt-2">Qualification: {school.qualification1}</p>
                <a href={`mailto:${school.email}`} className="text-blue-600 mt-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 5.25L12 12l9.75-6.75M12 12v9.75m0-9.75L2.25 5.25" />
                  </svg>
                  Send Email
                </a>
                <p className="text-gray-700 mt-2">Phone number: {school.phone}</p>
              </div>
            )}

            {/* Vacant Position 2 */}
            {school.position2 && (
              <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                <h3 className="text-lg font-semibold text-blue-600">School Name: {school.schoolName}</h3>
                <p className="text-gray-700 mt-2">State: {school.state}</p>
                <p className="text-gray-700 mt-2">Location: {school.location}, {school.LGA}</p>
                <h4 className="text-lg font-semibold text-blue-600 mt-4">Vacant Position: {school.position2}</h4>
                <p className="text-gray-700 mt-2">Salary: {school.salary2}</p>
                <p className="text-gray-700 mt-2">Qualification: {school.qualification2}</p>
                <a href={`mailto:${school.email}`} className="text-blue-600 mt-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 5.25L12 12l9.75-6.75M12 12v9.75m0-9.75L2.25 5.25" />
                  </svg>
                  Send Email
                </a>
                <p className="text-gray-700 mt-2">Phone number: {school.phone}</p>
              </div>
            )}

            {/* Vacant Position 3 */}
            {school.position3 && (
              <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                <h3 className="text-lg font-semibold text-blue-600">School Name: {school.schoolName}</h3>
                <p className="text-gray-700 mt-2">State: {school.state}</p>
                <p className="text-gray-700 mt-2">Location: {school.location}, {school.LGA}</p>
                <h4 className="text-lg font-semibold text-blue-600 mt-4">Vacant Position: {school.position3}</h4>
                <p className="text-gray-700 mt-2">Salary: {school.salary3}</p>
                <p className="text-gray-700 mt-2">Qualification: {school.qualification3}</p>
                <a href={`mailto:${school.email}`} className="text-blue-600 mt-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 5.25L12 12l9.75-6.75M12 12v9.75m0-9.75L2.25 5.25" />
                  </svg>
                  Send Email
                </a>
                <p className="text-gray-700 mt-2">Phone number: {school.phone}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-700">No vacancy in any of the registered schools</p>
  )}
</div>




   
    </div>
  );
};

export default EjobsLandingPage;
