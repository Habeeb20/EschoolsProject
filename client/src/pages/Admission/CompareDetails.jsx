import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';



const CompareDetails = () => {
    const [searchParams, setSearchParams] = useState({
        location: '',
        schoolFees: '',
        onBoarding: '',
        name: ''
      });
      const [results, setResults] = useState([]);
      const [userLocation, setUserLocation] = useState('');
      const [showMap, setShowMap] = useState(false);
      const [selectedSchool, setSelectedSchool] = useState(null);
    
      const handleChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
      };

      const handleSearch = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API}/schools/schoolscompare`, {
            params: searchParams
          });
          setResults(response.data);
          if (response.status === 200) {
            toast.success("Successfully fetched");
          } else {
            toast.error("An error occurred");
          }
        } catch (error) {
          console.error('Error fetching schools:', error);
          toast.error("An error occurred externally");
        }
      };

      const handleShowMap = (school) => {
        setSelectedSchool(school);
        setShowMap(true);
      };
    
      const handleLocationChange = (e) => {
        setUserLocation(e.target.value);
      };
    
      const closeMap = () => {
        setShowMap(false);
        setUserLocation('');
        setSelectedSchool(null);
      };

      const renderMap = () => {
        if (!selectedSchool || !userLocation) return null;
    
        const schoolAddress = encodeURIComponent(selectedSchool.name); 
        const userAddress = encodeURIComponent(userLocation);
        const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${userAddress}&destination=${schoolAddress}`;
        return (
            <div className="absolute top-0 left-0 w-full h-full bg-white p-4 shadow-lg z-10">
              <button onClick={closeMap} className="text-red-500 mb-4">Close</button>
              <h4 className="text-xl font-semibold mb-2">Distance to {selectedSchool.school}</h4>
              <input
                type="text"
                placeholder="Enter your location"
                value={userLocation}
                onChange={handleLocationChange}
                className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 text-center bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
              >
                View Route on Google Maps
              </a>
            </div>
          );
        };
  return (
    <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg relative">
    <h2 className="text-2xl font-bold mb-4">Compare School Details</h2>

    <input
      type="text"
      name="location"
      value={searchParams.location}
      onChange={handleChange}
      placeholder="Location"
      className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
    />
    <input
      type="number"
      name="schoolFees"
      value={searchParams.schoolFees}
      onChange={handleChange}
      placeholder="School Fees"
      className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
    />
    <select
      name="onBoarding"
      value={searchParams.onBoarding}
      onChange={handleChange}
      className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option value="">Do you prefer a school that has boarding? Select...</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
    <input
      type="text"
      name="name"
      value={searchParams.name}
      onChange={handleChange}
      placeholder="Address"
      className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
    />
    <button 
      onClick={handleSearch} 
      className="mb-4 w-full p-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
    >
      Search
    </button>

    <div className="mt-4">
      {results.length > 0 ? (
        results.map((school) => (
          <div key={school._id} className="mb-4 p-4 border border-gray-300 rounded shadow-md">
            <h4 className="text-lg font-semibold">{school.schoolName}</h4>
            <h5 className="text-gray-700">Email: {school.email}</h5>
            <h5 className="text-gray-700">phone: {school.phone}</h5>
            <h5 className="text-gray-700">Location: {school.location}</h5>
            <h5 className="text-gray-700">School Fees: {school.schoolFees}</h5>
            <h5 className="text-gray-700">Onboarding: {school.onBoarding ? 'Yes' : 'No'}</h5>
            <h5 className="text-gray-700">Address: {school.location}</h5>
            <div className="mt-2 flex space-x-3">
              <a 
                href={`https://wa.me/${school.phone}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600"
              >
                <FaWhatsapp size={24} />
              </a>
              <a 
                href={`tel:${school.phone}`} 
                className="text-blue-500 hover:text-blue-600"
              >
                <FaPhone size={24} />
              </a>
              <a 
                href={`mailto:${school.email}`} 
                className="text-red-500 hover:text-red-600"
              >
                <FaEnvelope size={24} />
              </a>
              <button 
                onClick={() => handleShowMap(school.name)}
                className="ml-auto p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Google Map
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No results found</p>
      )}
    </div>

    {showMap && renderMap()}
  </div>
  )
}

export default CompareDetails
