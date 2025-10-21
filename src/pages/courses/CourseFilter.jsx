import React, { useState } from "react";
import { classes, subjects, boards } from "../../data/data";


const CourseFilter = ({ onFilterChange }) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");

 // Call parent onFilterChange whenever any select changes
  const handleFilterChange = (key, value) => {
    if (key === "class") setSelectedClass(value);
    if (key === "subject") setSelectedSubject(value);
    if (key === "board") setSelectedBoard(value);

    onFilterChange({
      selectedClass: key === "class" ? value : selectedClass,
      selectedSubject: key === "subject" ? value : selectedSubject,
      selectedBoard: key === "board" ? value : selectedBoard,
    });
  };

  const resetFilters = () => {
    setSelectedClass("");
    setSelectedSubject("");
    setSelectedBoard("");
    onFilterChange({ selectedClass: "", selectedSubject: "", selectedBoard: "" });
  };

  return (
    
    <div className="bg-none text-white px-6 py-4 rounded-lg flex flex-col md:flex-row gap-4 items-center justify-center">

      {/* Select Board */}
      <select
        value={selectedBoard}
        onChange={(e) => {
          handleFilterChange("board", e.target.value)
        }}
        className="bg-white text-[#1A1A1A] rounded-lg px-4 py-2 w-full md:w-48 focus:outline-none"
      >
        <option value="">Select Board</option>
        {boards.map((board) => (
          <option key={board} value={board}>
            {board}
          </option>
        ))}
      </select>
      
      {/* Select Class */}
      <select
        value={selectedClass}
        onChange={(e) => {
          handleFilterChange("class", e.target.value)
        }}
        className="bg-white text-[#1A1A1A] rounded-lg px-4 py-2 w-full md:w-48 focus:outline-none"
      >
        <option value="">Select Class</option>
        {classes.map((cls) => (
          <option key={cls} value={cls}>
            {cls}
          </option>
        ))}
      </select>

      {/* Select Subject */}
      <select
        value={selectedSubject}
        onChange={(e) => {
          handleFilterChange("subject", e.target.value)
        }}
        className="bg-white text-[#1A1A1A] rounded-lg px-4 py-2 w-full md:w-48 focus:outline-none"
      >
        <option value="">Select Subject</option>
        {subjects.map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>

       {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="bg-[#A6E1FA] text-[#1A1A1A] font-semibold px-6 py-2 rounded-full hover:bg-white transition mt-2 md:mt-0"
      >
        Reset
      </button>

      
      
    </div>
  );
};

export default CourseFilter;
