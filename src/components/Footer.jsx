import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (

    <footer className="bg-gradient-to-r from-[#533A71] via-[#3B5B8C] to-[#177E89] text-white py-10 mt-0">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">
            Edu<span className="text-[#A6E1FA]">LMS</span>
          </h2>
          <p className="text-gray-200 text-sm leading-relaxed">
            Empowering learners through smart, engaging, and personalized education.
            Your journey to knowledge starts here!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li className="hover:text-[#A6E1FA] cursor-pointer transition">Home</li>
            <li className="hover:text-[#A6E1FA] cursor-pointer transition">Courses</li>
            <li className="hover:text-[#A6E1FA] cursor-pointer transition">Dashboard</li>
            <li className="hover:text-[#A6E1FA] cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20 mt-10 pt-4 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} EduLMS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
