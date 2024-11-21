// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// const CategoryPage = () => {
//   const { category } = useParams();
//   const [schools, setSchools] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [cardDetails, setCardDetails] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   useEffect(() => {
//     axios
//       .get('http://localhost:9000/schools') 
//       .then((response) => {
//         console.log('cat',category);
//         if (response.data && Array.isArray(response.data)) {
//           const filteredSchools = response.data.filter((school) => {
//             return( school.category === category)
//           });
//           console.log('object', filteredSchools)
//           setSchools(filteredSchools);
//         } else {
//             console.log("not structured well")
//           setError('No schools data available or incorrect format.');
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError('Failed to load schools. Please try again later.');
//         setLoading(false);
//       });
//   }, [category]);

  
  
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-lg font-semibold">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h2 className="text-2xl font-bold text-green-600 mb-4 mt-4 capitalize">
//         {category} Schools category
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {schools?.map((school) => (
//           <div key={school.id} className="bg-white shadow-lg p-4 rounded-lg">
//           <img
//   src={school.coverPicture || school.picture || school.schoolPictire || "https://via.placeholder.com/150"}
//   alt={school.schoolName}
//   className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg mx-auto"
// />

//             <h3 className="text-xl font-bold text-gray-800">Name:{school.schoolName}</h3>
//             <p className="text-gray-600">Email:{school.email}</p>
//             <p className="text-gray-600">phone no:{school.phone}</p>
//             <p className="text-gray-600">Address:{school.location}</p>
//             <p className="text-gray-600">category{school.category}</p>
//             <Link to={`/schooldetail/${school._id}`}>
//                 <button className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4 mx-4">
//                   View More
//                 </button>
//               </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const { category } = useParams();
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:9000/schools')
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          const filteredSchools = response.data.filter((school) => school.category === category);
          setSchools(filteredSchools);
          setFilteredSchools(filteredSchools);
        } else {
          setError('No schools data available or incorrect format.');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load schools. Please try again later.');
        setLoading(false);
      });
  }, [category]);

  useEffect(() => {
    const searchResults = schools.filter((school) =>
      school.schoolName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSchools(searchResults);
  }, [searchTerm, schools]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4 mt-4 capitalize">
        {category} Schools Category
      </h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by school name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSchools.map((school) => (
          <div key={school.id} className="bg-white shadow-lg p-4 rounded-lg">
            <img
              src={school.coverPicture || school.picture || school.schoolPicture || "https://via.placeholder.com/150"}
              alt={school.schoolName}
              className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg mx-auto"
            />
            <h3 className="text-xl font-bold text-gray-800">Name: {school.schoolName}</h3>
            <p className="text-gray-600">Email: {school.email}</p>
            <p className="text-gray-600">Phone No: {school.phone}</p>
            <p className="text-gray-600">Address: {school.location}</p>
            <p className="text-gray-600">Category: {school.category}</p>
            <Link to={`/schooldetail/${school._id}`}>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4 mx-4">
                View More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
