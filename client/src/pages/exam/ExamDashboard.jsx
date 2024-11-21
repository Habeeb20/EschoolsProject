import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'



const ExamDashboard = () => {
    const [userData, setUserData] = useState({
        examBody: '',
        email: '',
        phone: '',
        category: '',
        headOffice:'',
        startDate: '',
        endDate: '',
        category: '',
        state: '',
        LGA: '',
        location: '',
        formPrice: '',
        Deadline: '',
        createdAt:'',
        picture1: '',
        picture2:'',
        picture3: '',
        picture4:'',
     
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
            const { data } = await axios.get(`${import.meta.env.VITE_APIE}/dashboard`, {
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
            `${import.meta.env.VITE_APIE}/${userId}`,
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
    <div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
    {/* Header Section */}
    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      Welcome
    </h1>
    <p className="text-lg text-gray-700 text-center">
      Username: <span className="font-semibold">{user.username}</span>
    </p>
    <p className="text-lg text-gray-700 text-center">
      Exam Body : <span className="font-semibold">{user.examBody}</span>
    </p>
    <p className="text-lg text-gray-700 text-center">
      Email: <span className="font-semibold">{user.email}</span>
    </p>
    <p className="text-lg text-gray-700 text-center">
      Address: <span className="font-semibold">{user.location}</span>
    </p>
    <p className="text-lg text-gray-700 text-center">
      head Office Address: <span className="font-semibold">{user.headOffice}</span>
    </p>
    <p className="text-lg text-gray-700 text-center">
      LGA: <span className="font-semibold">{user.LGA}</span>
    </p>
    <p className="text-lg text-gray-700 text-center">
      State: <span className="font-semibold">{user.state}</span>
    </p>
 
 
    <p className="text-lg text-blue-700 text-center">
    Amount of form for the exam: <span className="font-semibold text-black">{user.formPrice}</span>
    </p>
    <p className="text-lg text-blue-700 text-center">
      Deadline for obtaining of Form: <span className="font-semibold text-black">{new Date(user.Deadline).toLocaleDateString()}</span>
    </p>
    <p className="text-lg text-blue-700 text-center">
      commencement date: <span className="font-semibold text-black">{new Date(user.startDate).toLocaleDateString()}</span>
    </p>
    <p className="text-lg text-blue-700 text-center">
      examination ends: <span className="font-semibold text-black">{new Date(user.endDate).toLocaleDateString()}</span>
    </p>
 

    {/* Images Section */}
    <div className="flex flex-wrap justify-center gap-4 mt-6">
     
   
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
   
    </div>
  </div>
    
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Update Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.keys(userData).map((key) =>
             
                key !== "picture1" &&
                key !== "picture2" &&
                key !== "picture3" &&
                key !== "picture4"  ? (
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
                 Name of examination body
                </label>
                <input
                  type="text"
                  name="examBody"
                  value={userData.exambody}
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
               headOffice
                </label>
                <input
                  type="text"
                  name="headOffice"
                  value={userData.headOffice}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
          

         

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  commencement date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={userData.startDate}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 examination ends
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={userData.endDate}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
               amount for obtaining exam form
                </label>
                <input
                  type="text"
                  name="formPrice"
                  value={userData.formPrice}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 when is the deadline for obtaining a form
                </label>
                <input
                  type="date"
                  name="Deadline"
                  value={userData.Deadline}
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

export default ExamDashboard
