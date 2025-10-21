import React, {useState} from 'react'
import CourseFilter from './CourseFilter'
import { coursesData } from '../../data/data'
import { useNavigate } from "react-router-dom";


const Courses = () => {

  const navigate = useNavigate();
  
  const [filter, setFilter] = useState({
    selectedClass: "",
    selectedSubject: "",
    selectedBoard: "",
  });

    // Filter courses dynamically
  const filteredCourses = coursesData.filter((course) => {
    return (
      (filter.selectedClass === "" || course.class === filter.selectedClass) &&
      (filter.selectedSubject === "" || course.subject === filter.selectedSubject) &&
      (filter.selectedBoard === "" || course.board === filter.selectedBoard)
    );
  });


  return (
    <div className='bg-[#0F1B2A]/90 min-h-screen text-white py-20 px-6 md:px-16'>
      {/* Filter Bar  */}
      <CourseFilter onFilterChange={setFilter}/>

      {/* Course Grid  */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {filteredCourses.length > 0 ? 
        (
          filteredCourses.map((course) => (
          <div
            key={course.id}
            className="overflow-hidden transition transform border shadow-lg bg-white/10 backdrop-blur-md rounded-2xl hover:scale-105 border-white/20"
          >
            <img 
              src={course.image} 
              alt={course.title}
              className="object-contain w-full h-40 p-2 bg-white/5"
            />

            <div className='p-6'>
              <h2 className='mb-2 text-xl font-semibold'>{course.title || "N/A"}</h2>
              <p className="mb-4 text-gray-300">{course.description || "N/A"}</p>
              <p className="text-sm text-gray-400">Instructor: {course.instructor || "N/A"}</p>
              <button 
                onClick={() => navigate(`/courses/${course.id}`)}
                className="mt-4 w-full bg-[#A6E1FA] text-[#1A1A1A] font-semibold py-2 rounded-full hover:bg-white transition">
                Go to the Course Page
              </button>
            </div>

          </div>
        ))
        )
        : (
          <p className="text-center text-gray-400 col-span-full">
            No courses found for selected filters.
          </p>
        )
      }

      </div>
    </div>
  )
}

export default Courses