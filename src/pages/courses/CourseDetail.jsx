import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { coursesData } from "../../data/data";

const CourseDetail = () => {
  const { id } = useParams();
  const course = coursesData.find((c) => c.id === parseInt(id));
  const navigate = useNavigate();

  const handleStartCourse = () => {
    navigate(`/courses/${id}/start`);
  };

  if (!course) return <p className="mt-10 text-center text-white">Course not found!</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1B2A] via-[#1A2C42] to-[#0F1B2A] text-white p-4 pt-20 pb-20 md:p-16">
      
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-300 ">
        <Link to="/courses" className="hover:text-[#A6E1FA]">Courses</Link> &gt; {course.title}
      </div>

      
       {/* Top Section / Hero */}
      <div className="relative max-w-7xl mx-auto mt-12 md:mt-16 text-center bg-gradient-to-r from-[#533A71] to-[#177E89] rounded-3xl p-10 shadow-2xl">
        <h1 className="mb-4 text-3xl font-bold md:text-5xl">
          {course.board ? `${course.board} ` : ""} 
          {course.class ? `${course.class} ` : ""} 
          {course.title}
        </h1>
        <p className="mb-6 text-lg text-gray-200">
          Your Ultimate Study Companion for {course.title} Excellence
        </p>

        <div className="inline-block px-6 py-2 text-sm font-semibold text-white border rounded-full shadow-md bg-white/20 border-white/30 backdrop-blur-md">
          ✨ Updated for 2025–26 Academic Year ✨
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto mt-10 transition-all duration-300 max-w-7xl hover:translate-y-2">
        <div className="p-8 border shadow-xl bg-white/10 backdrop-blur-md rounded-2xl border-white/20">
          <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
            🚀 Welcome to {course.title} Hub
          </h2>
          <p className="mb-6 leading-relaxed text-gray-300">
            Dive into the fascinating world of <span className="font-semibold">{course.title}</span> with our comprehensive,
            up-to-date study materials designed for{" "}
            {course.board ? `${course.board} ` : ""}{" "}
            {course.class ? `${course.class}` : ""} students.  
            Stay ahead of the curve with the latest syllabus, interactive exercises, and concept-based learning modules!
          </p>

          <div className="flex flex-col items-center gap-8 mt-8 md:flex-row">
            <img
              src={course.image}
              alt={course.title}
              className="object-contain p-2 shadow-lg h-60 w-60 bg-white/10 rounded-2xl"
            />
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="font-semibold text-white">Instructor:</span>{" "}
                {course.instructor || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-white">Class:</span>{" "}
                {course.class || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-white">Subject:</span>{" "}
                {course.subject || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-white">Board:</span>{" "}
                {course.board || "N/A"}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-10">
            <button 
              onClick={handleStartCourse}
              className="relative overflow-hidden text-white font-semibold px-10 py-3 rounded-full shadow-lg transition-all duration-300
              bg-gradient-to-r from-[#177E89] via-[#3D5A80] to-[#533A71] hover:scale-105 border border-white/20"
            >
              <span className="relative z-10">🚀 Start Course</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#533A71] via-[#177E89] to-[#3D5A80] opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
