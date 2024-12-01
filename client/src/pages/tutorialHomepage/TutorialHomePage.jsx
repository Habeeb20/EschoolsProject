import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
const TutorialHomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cardDetails, setCardDetails] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
 
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APITU}`);
        const data = await response.json();
        console.log("Fetched Data:", data); 
        if (Array.isArray(data)) {
          setCardDetails(data);
          toast.success("Data fetched successfully!");
        } else {
          toast.error("Unexpected API response format.");
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
        toast.error("Failed to fetch data.");
      }
    };

    fetchSchools();
  }, []);

  const filteredCards = cardDetails.filter((card) => {
    const matchesCategory =
      activeCategory === "All" || card.category === activeCategory;
    const matchesSearchTerm = card.tutorialName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });
  // Generate star ratings
  const ratingStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="flex justify-center w-full py-8 bg-white mt-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "400px" }}
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-green-500"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600">
          Search
        </button>
      </div>
      <div className="">
        <Link to="/tutoriallogin">
        <h6 className="text-2xl font-semibold text-green-600 text-right ">Login</h6>
        </Link>
      
      </div>

      {/* Cards Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-8 px-4">
        {filteredCards.length > 0 ? (
          filteredCards.map((card, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md overflow-hidden bg-white"
            >
              {/* Image */}
              <img
                src={
                  card.picture1 ||
                  card.picture2 ||
                  card.picture3 ||
                  card.picture4 ||
                  card.picture5 ||
                  card.picture6 ||
                  card.picture7 ||
                  "https://via.placeholder.com/150" 
                }
                alt={card.tutorialName || "Tutorial"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                {/* Card Details */}
                <h3 className="text-lg font-semibold mb-2">
                  {card.tutorialName || "No Name Provided"}
                </h3>
                <p className="text-gray-600 mb-4">{card.email || "No Email"}</p>
                <p className="text-gray-600 mb-4">
                  Address: {card.location || "No Location"}
                </p>
                <p className="text-gray-600 mb-4">
                  Phone: {card.phone || "No Phone"}
                </p>
                <p className="text-gray-600 mb-4">
                    Review:{card.comments.length}
                    <div style={{display:"flex", gap:'2px'}}>

                    {[...Array(5)].map((_,index) => (
                        <FaStar key={index} color="gold" size={12} />
                    ))}

                    </div>
                </p>
                <Link to={`/tutorial/${card._id}`}>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={async () => {
                      try {
                        await axios.post(
                          `${import.meta.env.VITE_APITU}/${card._id}/click`
                        );
                        console.log("Click count incremented");
                      } catch (error) {
                        console.error("Error incrementing click count:", error);
                      }
                    }}
                  >
                    Read More
                  </button>
                </Link>
                {/* Rating Stars */}
                <div className="mt-4 text-yellow-500">{ratingStars(3)}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No tutorials found. Try searching for something else.
          </p>
        )}
      </section>
    </div>
  );
};

export default TutorialHomePage;
