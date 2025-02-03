import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'

  
const TeacherDashboard = () => {

    const [userData, setUserData] = useState({
       
        fname:'',
        lname:'',
        email:'',
        phone:'',
        state:'',
        LGA:'',
        location:'',
        qualification:'',
        school:'',
        grade:'',
        course:'',
        specialization:'',
        unqueNumber:'',
        YOE:'',
        PS:'',
        haveajob:'',
        whatcategory:'',
        lookingforateachingjob:'',
        fitinothercategory:'',
        CV:'',
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
            const { data } = await axios.get(`${import.meta.env.VITE_APIT}/dashboard`, {
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
            `${import.meta.env.VITE_APIT}/${userId}`,
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
  <div className="flex flex-col items-center bg-gray-50 p-8 min-h-screen">
  {/* Header Section */}
  <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    Welcome, {user.fname} {user.lname}
  </h1>
  
  {/* User Information Section */}
  <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-xl">
    <p className="text-lg text-gray-700 mb-2">
      <span className="font-semibold">Username:</span> {user.username}
    </p>
    <p className="text-lg text-gray-700 mb-2">
      <span className="font-semibold">Full Name:</span> {user.fname} {user.lname}
    </p>
    <p className="text-lg text-gray-700 mb-2">
      <span className="font-semibold">Email:</span> {user.email}
    </p>
    <p className="text-lg text-gray-700 mb-2">
      <span className="font-semibold">Phone Number:</span> {user.phone}
    </p>
    <p className="text-lg text-gray-700 mb-2">
      <span className="font-semibold">Address:</span> {user.location}
    </p>
    <p className="text-lg text-gray-700 mb-2">
      <span className="font-semibold">Qualification:</span> {user.qualification}
    </p>
    <p className="text-lg text-gray-700 mb-2">
      <span className="font-semibold">LGA:</span> {user.LGA}
    </p>
    <p className="text-lg text-gray-700 mb-2">
      <span className="font-semibold">State:</span> {user.state}
    </p>

    {/* Educational Details */}
    <p className="text-lg text-blue-700 mb-2">
      <span className="font-semibold">School Graduated From:</span> {user.school}
    </p>
    <p className="text-lg text-blue-700 mb-2">
      <span className="font-semibold">Grade:</span> {user.grade}
    </p>
    <p className="text-lg text-blue-700 mb-2">
      <span className="font-semibold">Specialization:</span> {user.specialization}
    </p>

    {/* Work Experience */}
    <p className="text-lg text-blue-700 mb-2">
      <span className="font-semibold">Work Experience:</span> {user.YOE} years
    </p>

    {/* Professional Summary */}
    <p className="text-lg text-blue-700 mb-2">
      <span className="font-semibold">Professional Summary:</span> {user.PS}
    </p>

    {/* Job Status */}
    <p className="text-lg text-blue-700 mb-2">
      <span className="font-semibold">Have a Job:</span> {user.haveajob}
    </p>
    <p className="text-lg text-blue-700 mb-2">
      <span className="font-semibold">Current Job Category:</span> {user.whatcategory}
    </p>
    <p className="text-lg text-blue-700 mb-2">
      <span className="font-semibold">Looking for Another Job:</span> {user.lookingforateachingjob}
    </p>
    <p className="text-lg text-blue-700 mb-2">
      <span className="font-semibold">Fit in Another Category:</span> {user.fitinothercategory}
    </p>
  </div>

  {/* Images Section */}
  <div className="flex flex-wrap justify-center gap-6 mt-8 w-full max-w-xl">
    {user.picture1 && (
      <img
        src={user.picture1}
        alt="User Picture"
        className="w-36 h-36 rounded-lg shadow-md object-cover"
      />
    )}
    {user.CV && (
      <img
        src={user.CV}
        alt="User CV"
        className="w-36 h-36 rounded-lg shadow-md object-cover"
      />
    )}
    {user.picture2 && (
      <img
        src={user.picture2}
        alt="User Picture"
        className="w-36 h-36 rounded-lg shadow-md object-cover"
      />
    )}
    {user.picture3 && (
      <img
        src={user.picture3}
        alt="User Picture"
        className="w-36 h-36 rounded-lg shadow-md object-cover"
      />
    )}
    {user.picture4 && (
      <img
        src={user.picture4}
        alt="User Picture"
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
                key !== "CV" &&
                key !== "picture4"  
              )}
    
              {/* New input fields */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 first name
                </label>
                <input
                  type="text"
                  name="fname"
                  value={userData.fname}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 last name
                </label>
                <input
                  type="text"
                  name="lname"
                  value={userData.lname}
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
              qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={userData.qualification}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
          

         

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
            school attended
                </label>
                <input
                  type="text"
                  name="school"
                  value={userData.school}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                grade
                </label>
                <input
                  type="text"
                  name="grade"
                  value={userData.grade}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                course
                </label>
                <input
                  type="text"
                  name="course"
                  value={userData.course}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
              specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={userData.specialization}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
              work experience and duties handled
                </label>
                <textarea
                  type="text"
                  name="YOE"
                  value={userData.YOE}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
            professional summary
                </label>
                <textarea
                  type="text"
                  name="PS"
                  value={userData.PS}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>


              

        
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 currently have a job(yes/No)?
                </label>
                <input
                  type="text"
                  name="haveajob"
                  value={userData.haveajob}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 what category is your current job if you have one(Nur&Pri, secondary or higher institution)
                </label>
                <input
                  type="text"
                  name="whatcategory"
                  value={userData.whatcategory}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 are you looking for a new teaching job?(yes/No)?
                </label>
                <input
                  type="text"
                  name="lookingforateachingjob"
                  value={userData.lookingforateachingjob}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
               if yes, do you fit in another category except your current teaching category
                </label>
                <input
                  type="text"
                  name="fitinothercategory"
                  value={userData.fitinothercategory}
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
                     CV
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "CV")}
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

export default TeacherDashboard
