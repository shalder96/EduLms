import React from "react";
import { cards } from "../data/data";
import { Link, NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import heroImage from "../assets/animations/heroImage.json";

const Home = () => {
  return (
    <div className="text-white">

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 pt-28 md:pt-40 pb-20 bg-gradient-to-br from-[#177E89] via-[#3B5B8C] to-[#533A71] min-h-screen">
        <div className="max-w-lg">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Learn Smart.  
            <span className="text-[#A6E1FA]"> Grow Fast.</span>
          </h1>
          <p className="mb-8 text-lg text-gray-200">
            Empower your skills with our interactive Learning Management System — 
            where knowledge meets innovation.
          </p>
          <Link to="/courses">
            <button className="bg-[#A6E1FA] text-[#1A1A1A] font-semibold px-8 py-3 rounded-full hover:bg-white transition">
              Get Started
            </button>
          </Link>
        </div>


        <div className="relative w-full max-w-3xl mx-auto">
          <Lottie
            animationData={heroImage}
            loop={true}      // loops infinitely
            autoplay={true}  // plays automatically
            className="w-full h-auto" // responsive width
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#0F1B2A]/90 py-20 text-center">
        <h2 className="mb-12 text-3xl font-bold">
          Why Choose <span className="text-[#A6E1FA]">EduLMS</span>?
        </h2>

        <div className="grid max-w-6xl gap-10 px-8 mx-auto md:grid-cols-3">
         {cards.map((card, i) => (
          <motion.div
            key={i}
            className="p-8 text-center transition rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.2, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <div className=" flex justify-center text-5xl mx-auto mb-4 text-[#A6E1FA]">{card.icon}</div>
            <h3 className="mb-2 text-xl font-semibold">{card.title}</h3>
            <p className="text-gray-300">{card.desc}</p>
            
          </motion.div>
         ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#533A71] via-[#3B5B8C] to-[#177E89] py-20 text-center relative z-10">
        <h2 className="mb-6 text-4xl font-bold">Ready to Start Learning?</h2>
        <p className="mb-8 text-lg text-gray-200">
          Join thousands of students already excelling through EduLMS.
        </p>
        <button className="bg-[#A6E1FA] text-[#1A1A1A] font-semibold px-10 py-3 rounded-full hover:bg-white transition">
          Enroll Now
        </button>

        {/* Separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg
            className="relative block w-[calc(100%+1.3px)] h-16"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M0,0V46.29c47.14,22,103.7,34,161,32,72.71-2.84,142-27.17,214-41,69.37-13,138,0,207,18,59.42,16.41,118.1,38,177,35,59.54-3,113-28,172-45,62.2-17.9,124-23.64,186-10,36.19,7.88,70.48,19.71,106,29V0Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Home;
