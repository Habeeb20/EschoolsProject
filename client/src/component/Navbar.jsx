import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu on mobile view
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-dark-green p-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <Link to="/" className="text-white text-2xl font-bold">
          ESchools
        </Link>

        {/* Hamburger Menu Icon for mobile view */}
        <div className="block lg:hidden" onClick={handleMenuToggle}>
          <div className={`w-6 h-0.5 bg-white mb-1 transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
          <div className={`w-6 h-0.5 bg-white mb-1 transition-all ${isMenuOpen ? "opacity-0" : ""}`}></div>
          <div className={`w-6 h-0.5 bg-white mb-1 transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
        </div>

        {/* Navbar Items */}
        <div className={`lg:flex lg:space-x-8 ${isMenuOpen ? "block" : "hidden"} lg:block`}>
          <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 items-center">
            <li>
              <Link to="/" className="text-white hover:text-yellow-400 transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/schoolshomepage" className="text-white hover:text-yellow-400 transition duration-300">
                schools
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-white hover:text-yellow-400 transition duration-300">
                Services
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="text-white hover:text-yellow-400 transition duration-300">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-white hover:text-yellow-400 transition duration-300">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-yellow-400 transition duration-300">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/examhomepage" className="text-white hover:text-yellow-400 transition duration-300">
                exam
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-white hover:text-yellow-400 transition duration-300">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
