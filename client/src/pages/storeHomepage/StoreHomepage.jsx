import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const StoreHomepage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [cardDetails, setCardDetails] = useState([]);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
              const response = await fetch(`${import.meta.env.VITE_APIS}`);
              const data = await response.json();
              setCardDetails(data);
            } catch (error) {
              console.error("Error fetching schools:", error);
            }
          };
      
          fetchSchools();
    }, [])

    const filteredCards = cardDetails.filter((card) => {
   

        const matchesSearchTerm = card.storeName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return  matchesSearchTerm;
      });
    
      const ratingStars = (rating) => {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
      };
  return (
    <div>
         <header
        className="bg-cover bg-center text-center text-white text-3xl font-semibold py-3"
        style={{ backgroundImage: "url(/path-to-header-background-image)" }}
      >
        Store Name
      </header>
      <div className="">
        <Link to="/storelogin">
        <h6 className="text-2xl font-semibold text-green-600 text-right ">Login</h6>
        </Link>
      
      </div>

      <div className="flex justify-center w-full py-8 bg-white">
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

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-8 px-4">
        {filteredCards.map((card, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md overflow-hidden bg-white"
          >
            <img
              src={
                card.picture1 ||
                card.picture2 ||
           
                card.picture3 ||
                card.picture4 ||
                card.picture5 ||
                card.picture6 ||
                card.picture7
      
              }
              alt={card.schoolName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{card.storeName}</h3>
              <p className="text-gray-600 mb-4">{card.email}</p>
              <p className="text-gray-600 mb-4">Address: {card.location}</p>
              <p className="text-gray-600 mb-4">Phone: {card.phone}</p>
              <Link to={`/store/${card._id}`}>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  onClick={async () => {
                    try {
                      await axios.post(
                        `${import.meta.env.VITE_APIS}/${card._id}/click`
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
              <div className="mt-4 text-yellow-500">{ratingStars(3)}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default StoreHomepage
