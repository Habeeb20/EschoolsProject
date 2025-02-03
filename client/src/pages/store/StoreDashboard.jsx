import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'


const StoreDashboard = () => {
    const [userData, setUserData] = useState({
        username:'',
        password:'',
        storeName:'',
        email:'',
        phone:'',
        state:'',
        LGA:'',
        location:'',
        category:'',
        picture1: '',
        picture2:'',
        picture3: '',
        picture4:'',
        picture5:'',
        picture6:'',
        picture7:'',
     
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
            const { data } = await axios.get(`${import.meta.env.VITE_APIS}/dashboard`, {
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
            `${import.meta.env.VITE_APIS}/${userId}`,
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
<div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto min-h-screen">
  {/* Header Section */}
  <h1 className="text-3xl font-extrabold text-blue-600 mb-4 text-center">
    Welcome
  </h1>
  <div className="bg-gray-100 rounded-lg shadow-md p-4 mb-6 w-full text-center">
    <p className="text-lg text-gray-800 mb-2">
      <span className="font-bold">Username:</span> {user.username}
    </p>
    <p className="text-lg text-gray-800 mb-2">
      <span className="font-bold">Store Name:</span> {user.storeName}
    </p>
    <p className="text-lg text-gray-800 mb-2">
      <span className="font-bold">Email:</span> {user.email}
    </p>
    <p className="text-lg text-gray-800 mb-2">
      <span className="font-bold">Phone:</span> {user.phone}
    </p>
    <p className="text-lg text-gray-800 mb-2">
      <span className="font-bold">Address:</span> {user.location}
    </p>
    <p className="text-lg text-gray-800 mb-2">
      <span className="font-bold">LGA:</span> {user.LGA}
    </p>
    <p className="text-lg text-gray-800">
      <span className="font-bold">State:</span> {user.state}
    </p>
  </div>

  {/* Picture Section */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
    {user.picture1 && (
      <img
        src={user.picture1}
        alt="Picture 1"
        className="w-full h-40 rounded-lg shadow-lg object-cover"
      />
    )}
    {user.picture2 && (
      <img
        src={user.picture2}
        alt="Picture 2"
        className="w-full h-40 rounded-lg shadow-lg object-cover"
      />
    )}
    {user.picture3 && (
      <img
        src={user.picture3}
        alt="Picture 3"
        className="w-full h-40 rounded-lg shadow-lg object-cover"
      />
    )}
    {user.picture4 && (
      <img
        src={user.picture4}
        alt="Picture 4"
        className="w-full h-40 rounded-lg shadow-lg object-cover"
      />
    )}
    {user.picture5 && (
      <img
        src={user.picture5}
        alt="Picture 5"
        className="w-full h-40 rounded-lg shadow-lg object-cover"
      />
    )}
    {user.picture6 && (
      <img
        src={user.picture6}
        alt="Picture 6"
        className="w-full h-40 rounded-lg shadow-lg object-cover"
      />
    )}
    {user.picture7 && (
      <img
        src={user.picture7}
        alt="Picture 7"
        className="w-full h-40 rounded-lg shadow-lg object-cover"
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
                key !== "picture5" &&
                key !== "picture6" &&
                key !== "picture7" &&
                key !== "picture4" 
              )}
    
              {/* New input fields */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 Name of store
                </label>
                <input
                  type="text"
                  name="storeName"
                  value={userData.storeName}
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
                 category(market or store)
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
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picture5")}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picture6")}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picture7")}
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

export default StoreDashboard
