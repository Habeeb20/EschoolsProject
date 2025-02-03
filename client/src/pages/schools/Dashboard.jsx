import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {Link} from "react-router-dom"


const Dashboard = () => {
    const [userData, setUserData] = useState({
        schoolName: '',
        email: '',
        phone: '',
        discount: '',
        discounttext:'',
        percent: '',
        duration: '',
        departments: '',
        faculty: '',
        admissionStartDate: '',
        admissionEndDate: '',
        admissionRequirements: '',
        category: '',
        state: '',
        LGA: '',
        location: '',
        schoolFees: '',
        schoolbus:'',
        onBoarding: '',
        picture: '',
        schoolPicture: '',
        coverPicture: '',
        picture1: '',
        picture2:'',
        picture3: '',
        picture4:'',
        TC:'',
        schoolNews:'',
        history:'',
        vcpicture:'',
        vcspeech:'',
        AO:'',

        
  ownership:'',

  schoolfees1:'',
  class1:'',

  schoolfees2:'',
  class2:'',

  schoolfees3:'',
  class3:'',

  schoolfees4:'',
  class4:'',

  schoolfees5:'',
  class5:'',

  schoolfees6:'',
  class6:'',

  schoolfees7:'',
  class7:'',



        jobVacancy:'',
        NumberOfVacancy:'',
        position1:'',
        salary1:'',
        qualification1: '',
      
      
        position2:'',
        salary2:'',
        qualification2: '',
      
        position3:'',
        salary3:'',
        qualification3: '',
      
        position4:'',
        salary4:'',
        qualification4: '',
      
        position5:'',
        salary5:'',
        qualification5: '',
      
        position6:'',
        salary6:'',
        qualification6: '',

     
      
    })
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [username, setUsername] = useState('');
    const [user, setUser] = useState([]);
    const [discount, setDiscount] = useState('');


    useEffect(() => {
   
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('https://api.eschoolconnect.ng/schools/dashboard', {
              headers: { Authorization: `Bearer ${token}` },
            });
        
            setUserData(data);
            setUserId(data._id);
            setUser(data);
            setDiscount(data.discount);
            toast.success("you welcome")
          } catch (err) {
            toast.error("failed to fetch user data")
            setError('Failed to fetch user data.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        try {
          const token = localStorage.getItem('token');
          await axios.put(
            `https://api.eschoolconnect.ng/schools/${userId}`,
            userData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          toast.success("profile successfully updated")
          setSuccessMessage('Profile updated successfully!');
          setShowPopup(false);
     
        
        } catch (err) {
          toast.error("failed to update profile")
          console.log(err)
          setError('Failed to update profile.');
        }
      };
    
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
    
      if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
      }
   
    return (
        <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen overflow-y-auto">
     <div className="bg-gray-100 min-h-screen p-6">
      {/* Header Section */}
      <header className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user.username}!
          </h1>
     
        </div>
        <p className="text-gray-600 mt-2">
          Dashboard for <span className="font-semibold">{user.schoolName}</span>
        </p>
      </header>

      {/* General Information Section */}
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
            { label: "Discount", value: user.discount },
            { label: "Who Deserves Discount", value: user.discounttext },
            { label: "Faculty", value: user.faculty },
          ].map((info, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-200 p-4 rounded-md shadow-sm"
            >
              <p className="text-sm text-gray-500">{info.label}</p>
              <p className="text-lg font-semibold text-gray-800">
                {info.value || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* School Details Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          School Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Terms and Conditions", value: user.TC },
            { label: "School News", value: user.schoolNews },
            { label: "History", value: user.history },
            { label: "Speech", value: user.vcspeech },
            { label: "Aims and Objectives", value: user.AO },
            { label: "Ownership", value: user.ownership },
          ].map((detail, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-200 p-4 rounded-md shadow-sm"
            >
              <p className="text-sm text-gray-500">{detail.label}</p>
              <p className="text-lg font-semibold text-gray-800">
                {detail.value || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Fees Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">School Fees</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <div
              key={num}
              className="bg-gray-50 border border-gray-200 p-4 rounded-md shadow-sm"
            >
              <p className="text-sm text-gray-500">
                Class for School Fees {num}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {user[`class${num}`] || "N/A"}
              </p>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="text-lg font-semibold text-gray-800">
                {user[`schoolfees${num}`] || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Job Vacancy Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Job Vacancies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              key={num}
              className="bg-gray-50 border border-gray-200 p-4 rounded-md shadow-sm"
            >
              <p className="text-sm text-gray-500">Position {num}</p>
              <p className="text-lg font-semibold text-gray-800">
                {user[`position${num}`] || "N/A"}
              </p>
              <p className="text-sm text-gray-500">Salary</p>
              <p className="text-lg font-semibold text-gray-800">
                {user[`salary${num}`] || "N/A"}
              </p>
              <p className="text-sm text-gray-500">Qualification</p>
              <p className="text-lg font-semibold text-gray-800">
                {user[`qualification${num}`] || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Images Section */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Images</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            user.coverPicture,
            user.schoolPicture,
            user.picture,
            user.picture1,
            user.picture2,
            user.picture3,
            user.picture4,
            user.vcpicture,
          ]
            .filter((pic) => pic)
            .map((pic, idx) => (
              <img
                key={idx}
                src={pic}
                alt={`School image ${idx + 1}`}
                className="w-36 h-36 rounded-lg shadow-md object-cover"
              />
            ))}
        </div>
      </section>
    </div>
   
      {/* <p className="text-lg text-gray-700 text-center">
        Username: <span className="font-semibold">{user.username}</span>
      </p>
      <p className="text-lg text-gray-700 text-center">
        School Name: <span className="font-semibold">{user.schoolName}</span>
      </p>
      <p className="text-lg text-gray-700 text-center">
        Email: <span className="font-semibold">{user.email}</span>
      </p>
      <p className="text-lg text-gray-700 text-center">
        Address: <span className="font-semibold">{user.location}</span>
      </p>
      <p className="text-lg text-gray-700 text-center">
        Discount: <span className="font-semibold">{user.discount}</span>
      </p>
      <p className="text-lg text-gray-700 text-center">
        Who Deserve Discount: <span className="font-semibold">{user.discounttext}</span>
      </p>
      <p className="text-lg text-gray-700 text-center">
        Faculty: <span className="font-semibold">{user.faculty}</span>
      </p>
      <p className="text-lg text-gray-700 text-center">
        LGA: <span className="font-semibold">{user.LGA}</span>
      </p>
      <p className="text-lg text-gray-700 text-center">
        State: <span className="font-semibold">{user.state}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        Terms and Conditions: <span className="font-semibold text-black">{user.TC}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        School News: <span className="font-semibold text-black">{user.schoolNews}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        History: <span className="font-semibold text-black">{user.history}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        Speech: <span className="font-semibold text-black">{user.vcspeech}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        Aims and Objectives: <span className="font-semibold text-black">{user.AO}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        ownership: <span className="font-semibold text-black">{user.ownership}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        school fees 1: <span className="font-semibold text-black">{user.schoolfees1}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        what class for schoolfees 1: <span className="font-semibold text-black">{user.class1}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        school fees 2: <span className="font-semibold text-black">{user.schoolfees2}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        what class for schoolfees 2: <span className="font-semibold text-black">{user.class2}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        school fees 3: <span className="font-semibold text-black">{user.schoolfees3}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        what class for schoolfees 3: <span className="font-semibold text-black">{user.class3}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        school fees 4: <span className="font-semibold text-black">{user.schoolfees4}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        what class for schoolfees 4: <span className="font-semibold text-black">{user.class4}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        school fees 5: <span className="font-semibold text-black">{user.schoolfees5}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        what class for schoolfees 5: <span className="font-semibold text-black">{user.class5}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        school fees 6: <span className="font-semibold text-black">{user.schoolfees6}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        what class for schoolfees 6: <span className="font-semibold text-black">{user.class6}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        school fees 7: <span className="font-semibold text-black">{user.schoolfees7}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        what class for schoolfees 7: <span className="font-semibold text-black">{user.class7}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        jobVacancy: <span className="font-semibold text-black">{user.jobVacancy}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        Number of vacancy position: <span className="font-semibold text-black">{user.NumberOfVacancy}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        position1: <span className="font-semibold text-black">{user.position1}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        salary for position1: <span className="font-semibold text-black">{user.salary1}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        qualification needed for position1: <span className="font-semibold text-black">{user.qualification1}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        position2: <span className="font-semibold text-black">{user.position2}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        salary for position 2: <span className="font-semibold text-black">{user.salary2}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        qualification needed for position2: <span className="font-semibold text-black">{user.qualification2}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        position3: <span className="font-semibold text-black">{user.position3}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        salary for position 3: <span className="font-semibold text-black">{user.salary3}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        qualification needed for position3: <span className="font-semibold text-black">{user.qualification3}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        position4: <span className="font-semibold text-black">{user.position4}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        salary for position 4: <span className="font-semibold text-black">{user.salary4}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        qualification needed for position4: <span className="font-semibold text-black">{user.qualification4}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        position5: <span className="font-semibold text-black">{user.position5}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        salary for position 5: <span className="font-semibold text-black">{user.salary5}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        qualification needed for position5: <span className="font-semibold text-black">{user.qualification5}</span>
      </p>

      <p className="text-lg text-blue-700 text-center">
        position6: <span className="font-semibold text-black">{user.position6}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        salary for position 6: <span className="font-semibold text-black">{user.salary6}</span>
      </p>
      <p className="text-lg text-blue-700 text-center">
        qualification needed for position6: <span className="font-semibold text-black">{user.qualification6}</span>
      </p> */}

  
      {/* <div className="flex flex-wrap justify-center gap-4 mt-6">
        {user.coverPicture && (
          <img
            src={user.coverPicture}
            alt="Cover"
            className="w-36 h-36 rounded-lg shadow-md object-cover"
          />
        )}
        {user.schoolPicture && (
          <img
            src={user.schoolPicture}
            alt="School"
            className="w-36 h-36 rounded-lg shadow-md object-cover"
          />
        )}
        {user.picture && (
          <img
            src={user.picture}
            alt="School"
            className="w-36 h-36 rounded-lg shadow-md object-cover"
          />
        )}
        {user.picture1 && (
          <img
            src={user.picture1}
            alt="School"
            className="w-36 h-36 rounded-lg shadow-md object-cover"
          />
        )}
        {user.picture2 && (
          <img
            src={user.picture2}
            alt="School"
            className="w-36 h-36 rounded-lg shadow-md object-cover"
          />
        )}
        {user.picture3 && (
          <img
            src={user.picture3}
            alt="School"
            className="w-36 h-36 rounded-lg shadow-md object-cover"
          />
        )}
        {user.picture4 && (
          <img
            src={user.picture4}
            alt="School"
            className="w-36 h-36 rounded-lg shadow-md object-cover"
          />
        )}
        {user.vcpicture && (
          <img
            src={user.vcpicture}
            alt="VC"
            className="w-36 h-36 rounded-lg shadow-md object-cover"
          />
        )}
        
      </div> */}

    
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Update Your Profile</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {Object.keys(userData).map((key) =>
                  key !== "picture" &&
                  key !== "picture1" &&
                  key !== "picture2" &&
                  key !== "picture3" &&
                  key !== "picture4" &&
                  key !== "vcpicture" &&
                  key !== "schoolPicture" &&
                  key !== "coverPicture" 
                )}
      
                {/* New input fields */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    School Name
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    value={userData.schoolName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
      
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
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
                    discount(Yes/No?)
                  </label>
                  <input
                    type="text"
                    name="discount"
                    value={userData.discount}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    what percentage is the discount if yes
                  </label>
                  <input
                    type="text"
                    name="percent"
                    value={userData.percent}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    discount will be given to what set of people
                  </label>
                  <input
                    type="text"
                    name="discounttext"
                    value={userData.discounttext}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    how many months,weeks,or days will the discount last
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={userData.duration}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    department(yes/No)
                  </label>
                  <input
                    type="text"
                    name="departments"
                    value={userData.departments}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Faculty(yes/No)
                  </label>
                  <input
                    type="text"
                    name="faculty"
                    value={userData.faculty}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    department(yes/No)
                  </label>
                  <input
                    type="text"
                    name="departments"
                    value={userData.departments}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                   when do you start admission process
                  </label>
                  <input
                    type="date"
                    name="admissionStartDate"
                    value={userData.admissionStartDate}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                   when do you does your  admission process end
                  </label>
                  <input
                    type="date"
                    name="admissionEndDate"
                    value={userData.admissionEndDate}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                   what are the admission requirements?
                  </label>
                  <input
                    type="text"
                    name="admissionRequirements"
                    value={userData.admissionRequirements}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                   category(primary, secondary, univeristy or polythecnic)
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={userData.category}
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
                    minimum school fees
                  </label>
                  <input
                    type="text"
                    name="schoolFees"
                    value={userData.schoolFees}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                   Accommodation
                  </label>
                  <input
                    type="text"
                    name="onBoarding"
                    value={userData.onBoarding}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school Bus available(yes/No)?
                  </label>
                  <input
                    type="text"
                    name="schoolbus"
                    value={userData.schoolbus}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>


                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Terms and Conditions
                  </label>
                  <input
                    type="text"
                    name="TC"
                    value={userData.TC}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    History
                  </label>
                  <textarea
                    type="text"
                    name="history"
                    value={userData.history}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school News
                  </label>
                  <textarea
                    type="text"
                    name="schoolNews"
                    value={userData.schoolNews}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                   ownership(private, federal or state)
                  </label>
                  <input
                    type="text"
                    name="ownership"
                    value={userData.ownership}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees1(for a particular class and fill in the class below) ?
                  </label>
                  <input
                    type="text"
                    name="schoolfees1"
                    value={userData.schoolfees1}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees1 for what class ?
                  </label>
                  <input
                    type="text"
                    name="class1"
                    value={userData.class1}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees2(for a particular class and fill in the class below) ?
                  </label>
                  <input
                    type="text"
                    name="schoolfees2"
                    value={userData.schoolfees2}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees2 for what class ?
                  </label>
                  <input
                    type="text"
                    name="class2"
                    value={userData.class2}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees2(for a particular class and fill in the class below) ?
                  </label>
                  <input
                    type="text"
                    name="schoolfees2"
                    value={userData.schoolfees2}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees2 for what class ?
                  </label>
                  <input
                    type="text"
                    name="class2"
                    value={userData.class2}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees3(for a particular class and fill in the class below) ?
                  </label>
                  <input
                    type="text"
                    name="schoolfees3"
                    value={userData.schoolfees3}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees3 for what class ?
                  </label>
                  <input
                    type="text"
                    name="class3"
                    value={userData.class3}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>


                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees4(for a particular class and fill in the class below) ?
                  </label>
                  <input
                    type="text"
                    name="schoolfees4"
                    value={userData.schoolfees4}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees4 for what class ?
                  </label>
                  <input
                    type="text"
                    name="class4"
                    value={userData.class4}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees5(for a particular class and fill in the class below) ?
                  </label>
                  <input
                    type="text"
                    name="schoolfees5"
                    value={userData.schoolfees5}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees5 for what class ?
                  </label>
                  <input
                    type="text"
                    name="class5"
                    value={userData.class5}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>


                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees6(for a particular class and fill in the class below) ?
                  </label>
                  <input
                    type="text"
                    name="schoolfees6"
                    value={userData.schoolfees6}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees6 for what class ?
                  </label>
                  <input
                    type="text"
                    name="class6"
                    value={userData.class6}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>


                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees7(for a particular class and fill in the class below) ?
                  </label>
                  <input
                    type="text"
                    name="schoolfees7"
                    value={userData.schoolfees7}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    school fees7 for what class ?
                  </label>
                  <input
                    type="text"
                    name="class7"
                    value={userData.class7}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>


                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    any job vacancy in your school(yes/No)
                  </label>
                  <input
                    type="text"
                    name="jobVacancy"
                    value={userData.jobVacancy}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    how many positions are vacant if there is any
                  </label>
                  <input
                    type="number"
                    name="NumberOfVacancy"
                    value={userData.NumberOfVacancy}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    vacant position 1?
                  </label>
                  <input
                    type="text"
                    name="position1"
                    value={userData.position1}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    whats the salary for position 1?
                  </label>
                  <input
                    type="text"
                    name="salary1"
                    value={userData.salary1}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                  what qualification are you searching for to fit in position 1?
                  </label>
                  <input
                    type="text"
                    name="qualification1"
                    value={userData.qualification1}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>




                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    vacant position 2?
                  </label>
                  <input
                    type="text"
                    name="position2"
                    value={userData.position2}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    whats the salary for position 2?
                  </label>
                  <input
                    type="text"
                    name="salary2"
                    value={userData.salary2}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                  what qualification are you searching for to fit in position 2?
                  </label>
                  <input
                    type="text"
                    name="qualification2"
                    value={userData.qualification2}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    vacant position 3?
                  </label>
                  <input
                    type="text"
                    name="position3"
                    value={userData.position3}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    whats the salary for position 3?
                  </label>
                  <input
                    type="text"
                    name="salary3"
                    value={userData.salary3}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                  what qualification are you searching for to fit in position 3?
                  </label>
                  <input
                    type="text"
                    name="qualification3"
                    value={userData.qualification3}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>


                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    vacant position 4?
                  </label>
                  <input
                    type="text"
                    name="position4"
                    value={userData.position4}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    whats the salary for position 4?
                  </label>
                  <input
                    type="text"
                    name="salary4"
                    value={userData.salary4}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                  what qualification are you searching for to fit in position 4?
                  </label>
                  <input
                    type="text"
                    name="qualification4"
                    value={userData.qualification4}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>



                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    vacant position 5?
                  </label>
                  <input
                    type="text"
                    name="position5"
                    value={userData.position5}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    whats the salary for position 5?
                  </label>
                  <input
                    type="text"
                    name="salary5"
                    value={userData.salary5}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                  what qualification are you searching for to fit in position 5?
                  </label>
                  <input
                    type="text"
                    name="qualification5"
                    value={userData.qualification5}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>


                
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    vacant position 6?
                  </label>
                  <input
                    type="text"
                    name="position6"
                    value={userData.position6}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    whats the salary for position 6?
                  </label>
                  <input
                    type="text"
                    name="salary6"
                    value={userData.salary6}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                  what qualification are you searching for to fit in position 6?
                  </label>
                  <input
                    type="text"
                    name="qualification6"
                    value={userData.qualification6}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>













                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    VC or principal speech
                  </label>
                  <textarea
                    type="text"
                    name="vcspeech"
                    value={userData.vcspeech}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Aims and Objectives
                  </label>
                  <input
                    type="text"
                    name="AO"
                    value={userData.AO}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
      
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    School Picture
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "schoolPicture")}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                  />
                </div>
      
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Cover Picture
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "coverPicture")}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                  />
                </div>
      
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "Picture")}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Picture
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "picture1")}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Picture
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "picture2")}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Picture
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "picture3")}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Picture
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "picture4")}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Vc/ principal picture
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "vcpicture")}
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
      </div>
      
      )
    
}

export default Dashboard
