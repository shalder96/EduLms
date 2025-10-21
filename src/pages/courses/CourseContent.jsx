import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { coursesData } from "../../data/data";
import Quiz from "./Quiz";
import { class10AIQuizData } from "../../data/aiqna";


const CourseContent = () => {
  const { id } = useParams();
  const course = coursesData.find((c) => c.id === parseInt(id));
  const lessons = course.lessons;
  const allLessons = [...(lessons.partA || []), ...(lessons.partB || [])];


  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${id}`);
    if (savedProgress) {
      const { index, progress } = JSON.parse(savedProgress);
      setCurrentLessonIndex(index);
      setProgress(progress);
    }
  }, [id]);

  // Save progress to localStorage
  useEffect(() => {
    const percentage = ((currentLessonIndex + 1) / allLessons.length) * 100;
    setProgress(percentage);
    localStorage.setItem(
      `progress-${id}`,
      JSON.stringify({ index: currentLessonIndex, progress: percentage })
    );
  }, [currentLessonIndex, id, allLessons.length]);

  if (!course || !lessons || (!lessons.partA && !lessons.partB)) {

    return <p className="mt-10 text-center text-white">Course not found!</p>;
  }

  const currentLesson = allLessons[currentLessonIndex];

  const handleNext = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0F1B2A] via-[#1A2C42] to-[#0F1B2A] text-white pt-16 pb-10">
      <div className="w-full max-w-6xl gap-6 px-4 mx-auto space-y-6 lg:flex-grow sm:px-6">
         {/* Breadcrumb */}
        <div className="mb-4 text-sm text-gray-400">
          <Link to="/courses" className="hover:text-[#A6E1FA]">
            Courses
          </Link>{" "}
          &gt;{" "}
          <Link to={`/courses/${course.id}`} className="hover:text-[#A6E1FA]">
            {course.title}
          </Link>{" "}
          &gt; <span className="text-[#A6E1FA]">{currentLesson.title}</span>
        </div>


        {/* Header */}
        <div className="p-6 mx-auto shadow-lg bg-white/10 backdrop-blur-md rounded-2xl">
          <h1 className="mb-2 text-3xl font-bold">{course.title}</h1>
          <p className="mb-6 text-gray-300">
            Instructor: {course.instructor || "N/A"}
          </p>

          {/* Progress Bar */}
          <div className="w-full h-4 mb-4 rounded-full bg-white/20">
            <div
              className="bg-gradient-to-r from-[#177E89] via-[#3D5A80] to-[#533A71] h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-300">{Math.round(progress)}% Completed</p>
        </div>

        {/* Main Content */}
        <div className="min-h-screen bg-gradient-to-b from-[#0F1B2A] via-[#142C42] to-[#0F1B2A] text-white">
          <div className="flex flex-col-reverse w-full gap-6 mx-auto max-w-7xl lg:flex-row">
            
            {/* Left: Video + Notes + Quiz */}
            <div className="flex-1 p-6 shadow-lg bg-white/10 rounded-2xl backdrop-blur-md">
              <h2 className="mb-4 text-2xl font-semibold">
                {currentLesson.title}
              </h2>

              {/* Video Box */}
              <div className="flex items-center justify-center mb-6 text-3xl rounded-lg sm:2xl aspect-video bg-black/40">
                {currentLesson.video}
              </div>

              {/* Notes */}
              <h3 className="text-lg font-semibold mb-2 text-[#A6E1FA]">
                📒 Lesson Notes
              </h3>
              <p className="mb-6 text-gray-300">{currentLesson.notes}</p>

              {/* Quiz */}
              <div className="overflow-hidden rounded-lg">
                <h4 className="font-semibold text-[#A6E1FA] mb-2 text-lg ">🧠 Quick Quiz</h4>
                <Quiz
                  quizTitle={`Quiz on ${currentLesson.title}`}
                  questions={class10AIQuizData}
                />
              </div>
            </div>

            {/* Right: Lesson List */}
            <div className="w-full p-6 shadow-lg lg:w-1/3 bg-white/10 rounded-2xl backdrop-blur-md">
              <h3 className="mb-4 text-xl font-semibold">📚 Course Lessons</h3>

              <h3 className="mb-2 font-semibold text-gray-300">Part A</h3>
              <ul className="space-y-3">
                {lessons.partA.map((lesson, index) => (
                  <li
                    key={index}
                    onClick={() => setCurrentLessonIndex(index)}
                    className={`cursor-pointer px-4 py-2 rounded-lg transition ${
                      index === currentLessonIndex
                        ? "bg-gradient-to-r from-[#177E89] to-[#533A71] text-white font-semibold"
                        : "hover:bg-white/20 text-gray-300"
                    }`}
                  >
                    {index + 1}. {lesson.title}
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 mb-2 font-semibold text-gray-300">Part B</h3>
              <ul className="space-y-3">
                {lessons.partB.map((lesson, index) => (
                  <li
                    key={index + lessons.partA.length}
                    onClick={() => setCurrentLessonIndex(index + lessons.partA.length)}
                    className={`cursor-pointer px-4 py-2 rounded-lg transition ${
                      index + lessons.partA.length === currentLessonIndex
                        ? "bg-gradient-to-r from-[#177E89] to-[#533A71] text-white font-semibold"
                        : "hover:bg-white/20 text-gray-300"
                    }`}
                  >
                    {index + 1 + lessons.partA.length}. {lesson.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseContent;
