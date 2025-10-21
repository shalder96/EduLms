import React from "react";
import "./Loading.css"; // We'll define the keyframes here

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-[#177E89] via-[#3B5B8C] to-[#533A71] text-white z-50 overflow-hidden">
      {/* Rotating Book */}
      <div className="book">
        <div className="book__page"></div>
        <div className="book__page"></div>
        <div className="book__page"></div>
      </div>

      <h2 className="mt-10 text-2xl font-semibold tracking-wide animate-pulse">
        Loading <span className="text-[#A6E1FA]">EduLMS...</span>
      </h2>
    </div>
  );
};

export default Loading;
