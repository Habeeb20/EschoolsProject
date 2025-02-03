import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'


const TutorialDashboard = () => {
    const [userData, setUserData] = useState({
      
        tutorialName:'',
        email:'',
        phone:'',
        state:'',
        LGA:'',
        location:'',
        formPrice:'',
        picture1: '',
        picture2:'',
        picture3: '',
        picture4:'',
        exam1:'',
        exam2:'',
        exam3:'',
        exam4:'',
        exam5:'',
        otherclasses:'',
    })
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [username, setUsername] = useState('');
    const [user, setUser] = useState([]);

    useEffect(() => {
   
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${import.meta.env.VITE_APITU}/dashboard`, {
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
            `${import.meta.env.VITE_APITU}/${userId}`,
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
    


  return (
    <div>
        <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen overflow-y-auto">
        <div className="flex flex-col items-center bg-gray-50 p-8 min-h-screen">
  {/* Header Section */}
  <h1 className="text-3xl font-semibold text-blue-800 mb-8 text-center">
    Welcome to the Tutorial Dashboard
  </h1>

  {/* User Information */}
  <div className="space-y-4 w-full max-w-3xl">
    <p className="text-xl text-gray-800">
      Username: <span className="font-semibold text-gray-900">{user.username}</span>
    </p>
    <p className="text-xl text-gray-800">
      Tutorial Name: <span className="font-semibold text-gray-900">{user.tutorialName}</span>
    </p>
    <p className="text-xl text-gray-800">
      Email: <span className="font-semibold text-gray-900">{user.email}</span>
    </p>
    <p className="text-xl text-gray-800">
      Address: <span className="font-semibold text-gray-900">{user.location}</span>
    </p>
    <p className="text-xl text-gray-800">
      Price of Form: <span className="font-semibold text-gray-900">{user.formPrice}</span>
    </p>
    <p className="text-xl text-gray-800">
      State: <span className="font-semibold text-gray-900">{user.state}</span>
    </p>
    <p className="text-xl text-gray-800">
      LGA: <span className="font-semibold text-gray-900">{user.LGA}</span>
    </p>

    <p className="text-xl text-blue-700">
      We prepare students for the following exams:
      <span className="font-semibold text-black">{user.exam1}</span>
      <span className="font-semibold text-black">{user.exam2}</span>
      <span className="font-semibold text-black">{user.exam3}</span>
      <span className="font-semibold text-black">{user.exam4}</span>
      <span className="font-semibold text-black">{user.exam5}</span>
      <span className="font-semibold text-black">{user.otherclasses}</span>
    </p>
  </div>

  {/* Images Section */}
  <div className="flex flex-wrap justify-center gap-6 mt-8">
    {user.picture1 && (
      <img
        src={user.picture1}
        alt="Picture 1"
        className="w-40 h-40 rounded-lg shadow-lg object-cover transition-transform transform hover:scale-105"
      />
    )}
    {user.picture2 && (
      <img
        src={user.picture2}
        alt="Picture 2"
        className="w-40 h-40 rounded-lg shadow-lg object-cover transition-transform transform hover:scale-105"
      />
    )}
    {user.picture3 && (
      <img
        src={user.picture3}
        alt="Picture 3"
        className="w-40 h-40 rounded-lg shadow-lg object-cover transition-transform transform hover:scale-105"
      />
    )}
    {user.picture4 && (
      <img
        src={user.picture4}
        alt="Picture 4"
        className="w-40 h-40 rounded-lg shadow-lg object-cover transition-transform transform hover:scale-105"
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
                key !== "picture4" 
              )}
    
              {/* New input fields */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 Name of tutorial center
                </label>
                <input
                  type="text"
                  name="tutorialName"
                  value={userData.tutorialName}
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
               price of form
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
              What are the exams you prepare your students for?
                </label>
                <input
                  type="text"
                  name="exam1"
                  value={userData.exam1}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
             

              

        
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 other exams are
                </label>
                <input
                  type="text"
                  name="exam2"
                  value={userData.exam2}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 other exams are
                </label>
                <input
                  type="text"
                  name="exam3"
                  value={userData.exam3}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 other exams are
                </label>
                <input
                  type="text"
                  name="exam4"
                  value={userData.exam4}
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
                  Address
                </label>
                <input
                  type="text"
                  name="location"
                  value={userData.location}
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
      
    </div>
  )
}

export default TutorialDashboard
