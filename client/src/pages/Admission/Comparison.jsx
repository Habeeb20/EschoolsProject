import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CompareDetails from './CompareDetails';

const Comparison = () => {
  const [school1, setSchool1] = useState('');
  const [school2, setSchool2] = useState('');
  const [school3, setSchool3] = useState('');
  const [schoolData1, setSchoolData1] = useState(null);
  const [schoolData2, setSchoolData2] = useState(null);
  const [schoolData3, setSchoolData3] = useState(null);
  const [error, setError] = useState('');

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');

    if (!school1 || !school2 || !school3) {
      setError('Please enter all three schools to compare.');
      return;
    }

    try {
      const response1 = await axios.get(`${import.meta.env.VITE_API}/schools/comparison`, {
        params: { school: school1 },
      });
      setSchoolData1(response1.data);

      const response2 = await axios.get(`${import.meta.env.VITE_API}/schools/comparison`, {
        params: { school: school2 },
      });
      setSchoolData2(response2.data);

      const response3 = await axios.get(`${import.meta.env.VITE_API}/schools/comparison`, {
        params: { school: school3 },
      });
      setSchoolData3(response3.data);
    } catch (err) {
      setError('One or more schools not found. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-green-700 drop-shadow-md">
        Compare Schools
      </h1>
      <form
        onSubmit={handleSearch}
        className="max-w-4xl mx-auto flex flex-col gap-6 p-6 bg-white rounded-lg shadow-2xl"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={school1}
            onChange={(e) => setSchool1(e.target.value)}
            placeholder="Enter School 1"
            className="flex-1 p-3 text-lg border border-gray-300 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            value={school2}
            onChange={(e) => setSchool2(e.target.value)}
            placeholder="Enter School 2"
            className="flex-1 p-3 text-lg border border-gray-300 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            value={school3}
            onChange={(e) => setSchool3(e.target.value)}
            placeholder="Enter School 3"
            className="flex-1 p-3 text-lg border border-gray-300 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="py-3 text-lg font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 shadow-md transition-all"
        >
          Compare
        </button>
      </form>

      {error && <p className="text-center mt-4 text-red-500 font-medium">{error}</p>}

      {(schoolData1 || schoolData2 || schoolData3) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[schoolData1, schoolData2, schoolData3].map((schoolData, index) => (
            schoolData && (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all"
              >
                <img
                  src={schoolData.picture1 || schoolData.coverPicture || schoolData.schoolPicture}
                  alt="School"
                  className="w-full h-52 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-700 mb-3">{schoolData.school}</h3>
                  <table className="w-full text-left text-gray-700">
                    <tbody>
                      <tr>
                        <td className="py-2 font-semibold">Admission Date:</td>
                        <td>{formatDate(schoolData.admissionStartDate)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">End Date:</td>
                        <td>{formatDate(schoolData.admissionEndDate)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">Requirements:</td>
                        <td>{schoolData.admissionRequirements}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Link to="/admission">
                    <button className="mt-4 w-full py-2 bg-green-600 text-white font-medium text-lg rounded-md hover:bg-green-700">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            )
          ))}
        </div>
      )}
      <CompareDetails />
    </div>
  );
};

export default Comparison;
