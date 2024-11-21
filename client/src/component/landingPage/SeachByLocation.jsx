import React from "react";

import { useNavigate } from "react-router-dom";
import { FaCity, FaMapMarkerAlt, FaBuilding, FaLandmark } from "react-icons/fa";
const SearchByLocation = () => {
  const navigate = useNavigate();

  const states = [
    { name: "Lagos", icon: <FaCity />, state:"Lagos" },
    { name: "Abuja", icon: <FaMapMarkerAlt />,  state:"Abuja"  },
    { name: "Oyo", icon: <FaBuilding />,  state:"Oyo"  },
    { name: "Kwara", icon: <FaLandmark />,  state:"Kwara"  },
    { name: "Nasarrawa", icon: <FaCity />,  state:"Nasarrawa"  },
    { name: "Niger", icon: <FaMapMarkerAlt />,  state:"Niger"  },
    { name: "Delta", icon: <FaBuilding />,  state:"Delta"  },
    { name: "Kano", icon: <FaLandmark />,  state:"Kano"  },
    { name: "Ondo", icon: <FaCity />,  state:"Ondo"  },
    { name: "Osun", icon: <FaMapMarkerAlt />, state:"Osun"  },
    { name: "Ekiti", icon: <FaBuilding />,  state:"Ekiti"  },
    { name: "Abia", icon: <FaLandmark />,  state:"Abia"  },
    { name: "Enugu", icon: <FaCity />,  state:"Enugu"  },
    { name: "Imo", icon: <FaMapMarkerAlt />,  state:"Imo"  },
    { name: "Jigawa", icon: <FaBuilding />,  state:"Jigawa"  },
  ];

  const handleCategoryClick = (state) => {
    console.log(`Navigating to state: ${state}`); 
    navigate(`/state/${state}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6 pb-0">
      <h2 className="text-2xl font-bold text-red-600">Browse by Location</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {states.map((state, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(state.state)}
            className="flex flex-col items-center bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="text-4xl text-gray-700 mb-2">{state.icon}</div>
            <p className="text-center text-gray-800 font-semibold">{state.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchByLocation;
