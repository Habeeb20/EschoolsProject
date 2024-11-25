import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Admission = () => {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [editCommentImage, setEditCommentImage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [newReplyImage, setNewReplyImage] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [currentSchoolLocation, setCurrentSchoolLocation] = useState("");
  const [userLocation, setUserLocation] = useState("");

  const fetchSchools = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/schools`);
      const data = await response.json();
      setSchools(data);
      setFilteredSchools(data);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setUserEmail(data.email);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchSchools();
    fetchUserProfile();
  }, []);

  const openMapModal = (location) => {
    setCurrentSchoolLocation(location);
    setIsMapModalOpen(true);
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
    setUserLocation("");
  };

  const handleMapNavigation = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation}&destination=${currentSchoolLocation}`;
    window.open(googleMapsUrl, "_blank");
    closeMapModal();
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: newComment,
          image: selectedImage,
          replies: [],
        },
      ]);
      setNewComment("");
      setSelectedImage(null);
    }
  };

  const handleDateRangeChange = () => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const filtered = schools.filter((school) => {
      const admissionStartDate = new Date(school.admissionStartDate);
      const admissionEndDate = new Date(school.admissionEndDate);

      return (
        admissionStartDate <= endDateObj && admissionEndDate >= startDateObj
      );
    });

    setFilteredSchools(filtered.length > 0 ? filtered : []);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-700 text-center">
          Registered Schools
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Discover schools currently doing admission. Use the date range below
          to filter admissions open within your preferred dates.
        </p>
      </div>

      {/* Date Range Filter */}
      <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full sm:w-auto p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full sm:w-auto p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleDateRangeChange}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
      </div>

      {/* Schools List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
        {filteredSchools.length > 0 ? (
          filteredSchools.map((school) => (
            <div
              key={school._id}
              className="bg-white shadow-md rounded-md p-6 flex flex-col items-start"
            >
            <img 
                src={school.coverPicture || school.schoolPicture || school.picture || school.picture1 ||school.picture2 || "https://via.placeholder.com/600x200" }
            />
              <h2 className="text-xl font-bold text-gray-800">{school.schoolName}</h2>
              <p className="text-gray-600 mt-1">email: {school.email}</p>
              <p className="text-gray-600 mt-1">phone: {school.phone}</p>
              <p className="text-gray-600 mt-1">state: {school.state}</p>
              <p className="text-gray-600 mt-1">LGA: {school.LGA}</p>
              <p className="text-gray-600">Address: {school.location}</p>
              <div className="flex mt-4 space-x-4">
                <Link
                  to={`/schooldetail/${school._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View More
                </Link>
                <button
                  onClick={() => openMapModal(school.name)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Map
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-3">
            No schools are currently doing admission within the selected date
            range.
          </p>
        )}
      </div>

      {/* Comments Section */}
      <div className="max-w-4xl mx-auto mt-12 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800">Drop a Comment</h2>
        <textarea
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-3 border rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(URL.createObjectURL(e.target.files[0]))}
          className="mt-4"
        />
        <button
          onClick={handleAddComment}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </div>

      {/* Map Modal */}
      {isMapModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Enter Your Location</h3>
            <input
              type="text"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              placeholder="Your current location"
              className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={closeMapModal}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleMapNavigation}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
              >
                Go to Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admission;
