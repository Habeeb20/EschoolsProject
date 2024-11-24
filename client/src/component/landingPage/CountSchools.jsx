import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const CountSchools = () => {
  const [counts, setCounts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4); 

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const locations = [
          "Oyo",
          "Lagos",
          "Abuja",
          "Delta",
          "Imo",
          "Ogun",
          "Ondo",
          "Osun",
          "Anambra",
          "Kano",
          "Katsina",
          "Sokoto",
          "Benue",
          "Bauchi",
          "Borno",
        ];
        console.log("Sending locations:", locations);
        const queryString = locations
          .map((location) => `locations[]=${encodeURIComponent(location)}`)
          .join("&");
        const response = await axios.get(
          `${import.meta.env.VITE_API}/schools/countSchools?${queryString}`
        );
        console.log(response);
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching school counts:", error);
        toast.error("An error occurred while fetching the school counts.");
      }
    };

    fetchCounts();
  }, []);

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 4); 
  };

  const handleShowLess = () => {
    setVisibleCount(4);
  };

  return (
    <div>
      <div className="heroSection p-5">
        <h2 className="heading text-center mb-5 text-2xl font-bold">
          Number of Schools in Different Locations
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:grid-cols-4">
          {counts.length > 0 ? (
            counts.slice(0, visibleCount).map(({ location, count }) => (
              <Link
                key={location}
                to={`/data/${location}`}
                className="bg-white text-black p-5 rounded-lg shadow-lg flex flex-col items-center border-t-4 border-green-600 w-full"
              >
                <div className="text-green-600 text-3xl mb-2">
                  <i className="fas fa-school"></i> 
                </div>
                <h3 className="text-lg font-semibold">{`Schools in ${location}`}</h3>
                <CountUp
                  start={0}
                  end={parseInt(count)}
                  duration={3.75}
                  separator=","
                  className="text-2xl font-bold"
                />
                <p className="text-gray-600">{`Number of schools: ${count}`}</p>
              </Link>
            ))
          ) : (
            <p className="text-center">No data available</p>
          )}
        </div>

        <div className="button-container text-center mt-5">
          {visibleCount < counts.length && (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
              onClick={handleSeeMore}
            >
              See More
            </button>
          )}
          {visibleCount >= counts.length && counts.length > 4 && (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
              onClick={handleShowLess}
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountSchools;
