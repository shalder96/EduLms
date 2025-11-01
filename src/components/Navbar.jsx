import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      // prevents small scroll jitters
      if (Math.abs(window.scrollY - lastScrollY.current) < 5) return;
      
      // always show navbar when near top
      if (window.scrollY > lastScrollY.current) {
        // scrolling down → hide navbar
        setIsVisible(false);
      } else {
        // scrolling up → show navbar
        setIsVisible(true);
      }
      //Update last scroll position at the end
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const menuItems = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Contact", path: "/contact" },
];

  return (
    <nav className={`bg-gradient-to-r from-[#177E89] via-[#3B5B8C] to-[#533A71] text-white shadow-lg fixed top-0 transition-transform duration-300 w-full z-50 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold tracking-wide">
          Edu<span className="text-[#A6E1FA]">LMS</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden space-x-8 text-lg md:flex">
          {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({isActive}) => 
                `transition cursor-pointer ${
                  isActive ? "text-[#A6E1FA] font-semibold" : "hover:text-[#A6E1FA]"
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="white"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="white"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-b from-[#177E89]/95 via-[#3B5B8C]/95 to-[#533A71]/95 backdrop-blur-lg flex flex-col justify-center items-center space-y-10 text-2xl font-semibold"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <ul className="space-y-8 text-center">
              {menuItems.map((item) => (

              <li
                key={item.name}
                className="hover:text-[#A6E1FA] cursor-pointer transition"
                onClick={() => setOpen(false)}
              >
                <NavLink
                  to={item.path}
                  className={({isActive}) => 
                    `transition cursor-pointer ${
                      isActive ? "text-[#A6E1FA] font-semibold" : "hover:text-[#A6E1FA]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
