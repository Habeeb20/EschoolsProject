import React, { useState, useEffect } from 'react';
import api from '../../component/bookshop/api';

import axios from 'axios';
import toast from 'react-hot-toast';

const BookDashboard = () => {
  const [userData, setUserData] = useState({
    bookshopName: '',
    email: '',
    BookOrLibrary:'',
    phone: '',
    state: '',
    LGA: '',
    location: '',
    picture1: '',
    picture2:'',
    picture3: '',
    picture4:'',
    picture5:'',
    picture6:'',
    picture7:'',
    picture8:'',
    picture9:'',
    picture10:'',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState([]);


  // Fetch user data (only on mount)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const { data } = await api.get('/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(data);
        console.log(data._id)
        setUserId(data._id); 
        setUser(data);
        toast.success("Welcome!");
      } catch (error) {
        console.error("Error fetching user data:", error); // Added error handling
        setError("Failed to load user data");
      }finally{
        setLoading(false)
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
      await api.put(`/${userId}`,
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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>Book Dashboard</h2>
 

 
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  <h1 className="text-3xl font-bold text-gray-800 text-center">
    Welcome
  </h1>
  
  <div className="text-lg text-gray-700 text-center">
    <p>
      Username: <span className="font-semibold">{user.username}</span>
    </p>
    <p>
      Bookshop Name: <span className="font-semibold">{user.bookshopName}</span>
    </p>
    <p>
      Bookshop or Library: <span className="font-semibold">{user.BookOrLibrary}</span>
    </p>
    <p>
      Email: <span className="font-semibold">{user.email}</span>
    </p>
    <p>
      Phone Number: <span className="font-semibold">{user.phone}</span>
    </p>
    <p>
      Address: <span className="font-semibold">{user.location}</span>
    </p>
    <p>
      LGA: <span className="font-semibold">{user.LGA}</span>
    </p>
    <p>
      State: <span className="font-semibold">{user.state}</span>
    </p>
  </div>

  <div className="flex flex-wrap justify-center gap-6 mt-6">
    {user.picture1 && (
      <img
        src={user.picture1}
        alt="Bookshop Image 1"
        className="w-32 h-32 sm:w-36 sm:h-36 rounded-lg shadow-md object-cover"
      />
    )}
    {user.picture2 && (
      <img
        src={user.picture2}
        alt="Bookshop Image 2"
        className="w-32 h-32 sm:w-36 sm:h-36 rounded-lg shadow-md object-cover"
      />
    )}
    {user.picture3 && (
      <img
        src={user.picture3}
        alt="Bookshop Image 3"
        className="w-32 h-32 sm:w-36 sm:h-36 rounded-lg shadow-md object-cover"
      />
    )}
    {user.picture4 && (
      <img
        src={user.picture4}
        alt="Bookshop Image 4"
        className="w-32 h-32 sm:w-36 sm:h-36 rounded-lg shadow-md object-cover"
      />
    )}
    {user.picture5 && (
      <img
        src={user.picture5}
        alt="Bookshop Image 5"
        className="w-32 h-32 sm:w-36 sm:h-36 rounded-lg shadow-md object-cover"
      />
    )}
    {user.picture6 && (
      <img
        src={user.picture6}
        alt="Bookshop Image 6"
        className="w-32 h-32 sm:w-36 sm:h-36 rounded-lg shadow-md object-cover"
      />
    )}
    {user.picture7 && (
      <img
        src={user.picture7}
        alt="Bookshop Image 7"
        className="w-32 h-32 sm:w-36 sm:h-36 rounded-lg shadow-md object-cover"
      />
    )}
    {user.picture8 && (
      <img
        src={user.picture8}
        alt="Bookshop Image 8"
        className="w-32 h-32 sm:w-36 sm:h-36 rounded-lg shadow-md object-cover"
      />
    )}
    {user.picture9 && (
      <img
        src={user.picture9}
        alt="Bookshop Image 9"
        className="w-32 h-32 sm:w-36 sm:h-36 rounded-lg shadow-md object-cover"
      />
    )}
    {user.picture10 && (
      <img
        src={user.picture10}
        alt="Bookshop Image 10"
        className="w-32 h-32 sm:w-36 sm:h-36 rounded-lg shadow-md object-cover"
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
                key !== "picture4" &&
                key !== "picture5" &&
                key !== "picture6" &&
                key !== "picture7" &&
                key !== "picture8" &&
                key !== "picture9" &&
                key !== "picture10"  ? (
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
                 Name of Bookshop or Library
                </label>
                <input
                  type="text"
                  name="bookshopName"
                  value={userData.bookshopName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
                        <label
                          htmlFor="BookOrLibrary"
                          className="block text-sm font-medium text-gray-600 mb-1"
                        >
                            Bookshop or Library
                        </label>
                        <select
                          name="BookOrLibrary"
                          id="BookOrLibrary"
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="">Select </option>
                          <option value="Bookshop">Bookshop</option>
                          <option value="Library">Library</option>
                    
                        </select>
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
  );
};

export default BookDashboard;












