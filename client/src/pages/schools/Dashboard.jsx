import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'


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
            const { data } = await axios.get('http://localhost:9000/schools/dashboard', {
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
            `http://localhost:9000/schools/${userId}`,
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

      {/* Images Section */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
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
      </div>
    </div>
      
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
                  key !== "coverPicture" ? (
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
                    school Bus available?
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
