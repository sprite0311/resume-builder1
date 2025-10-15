import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[rgba(11,17,32,0.8)] to-[rgba(15,23,42,0.8)] backdrop-blur-lg border-b border-white/20 px-6 py-4 flex items-center justify-between shadow-lg"
    >
      {/* Logo / Title */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="CV Genie Logo" className="h-10 w-10 rounded-full border border-white/20" />
          <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text ">CV Genie</h1>
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-white">
        <Link
          to="/features"
          className={`hover:text-blue-400 transition-colors duration-200 ${location.pathname === '/features' ? 'text-blue-400' : ''}`}
        >
          Features
        </Link>
        <Link
          to="/about"
          className={`hover:text-blue-400 transition-colors duration-200 ${location.pathname === '/about' ? 'text-blue-400' : ''}`}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={`hover:text-blue-400 transition-colors duration-200 ${location.pathname === '/contact' ? 'text-blue-400' : ''}`}
        >
          Contact
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white focus:outline-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[rgba(11,17,32,0.95)] backdrop-blur-lg border-b border-white/20 md:hidden">
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link
              to="/features"
              className={`text-white hover:text-blue-400 transition-colors duration-200 ${location.pathname === '/features' ? 'text-blue-400' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/about"
              className={`text-white hover:text-blue-400 transition-colors duration-200 ${location.pathname === '/about' ? 'text-blue-400' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-white hover:text-blue-400 transition-colors duration-200 ${location.pathname === '/contact' ? 'text-blue-400' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;