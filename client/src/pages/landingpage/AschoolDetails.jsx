import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"; 

const AschoolDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("School ID not found");
      return;
    }

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API}/schools/aschool/${id}`)
      .then((response) => {
        setSchool(response.data.school);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load profile, please try again later");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 font-semibold text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-6 py-3 rounded-md mt-4 hover:bg-red-600 transition"
        >
          Reload
        </button>
      </div>
    );
  }

  if (loading || !school) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-green-600"></div>
        <p className="text-lg font-semibold text-gray-700 mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row md:space-x-6 items-center md:items-start space-y-6 md:space-y-0">
        <img
          src={school.coverPicture || school.picture || school.schoolPictire || "https://via.placeholder.com/150"}
          alt={school.schoolName}
          className="w-32 h-32 md:w-48 md:h-48 rounded-md object-cover shadow-lg"
        />
        <div className="flex flex-col text-center md:text-left space-y-3">
          <h2 className="font-bold text-2xl text-green-600">{school.schoolName}</h2>
          <p className="font-medium text-gray-700">Email: {school.email}</p>
          <p className="font-medium text-gray-700">Phone: {school.phone}</p>
          <p className="font-medium text-gray-700">State: {school.state}</p>
          <p className="font-medium text-gray-700">LGA: {school.LGA}</p>
          <p className="font-medium text-gray-700">Address: {school.location}</p>
          <p className="font-medium text-gray-700">Accommodation: {school.onBoarding}</p>
          <p className="font-medium text-gray-700">Discount: {school.discount ? "Yes" : "No"}</p>
          {school.discount && (
            <div>
              <p className="font-medium text-gray-700">Discount Percentage: {school.percent}%</p>
              <p className="font-medium text-gray-700">Discount Duration: {school.duration}</p>
            </div>
          )}
          <p className="font-medium text-gray-700">Minimum School Fees: {school.schoolFees}</p>
          <p className="font-medium text-gray-700">Admission Start Date: {new Date (school.admissionStartDate).toLocaleDateString()}</p>
          <p className="font-medium text-gray-700">Admission End Date: {new Date(school.admissionEndDate).toLocaleDateString()}</p>
          <p className="font-medium text-gray-700">Admission Requirements: {school.admissionRequirements}</p>
          
          <div className="flex items-center justify-center md:justify-start space-x-1 text-yellow-500">
            <FaStar />
            <span className="font-semibold">4.7</span>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AschoolDetails;
