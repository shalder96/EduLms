import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink} from "react-router-dom";
import { coursesData } from "../../data/data";
import Quiz from "./Quiz";
import { class10AIQuizData } from "../../data/aiqna";
import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  Paper,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const CourseContent = () => {
  const { id } = useParams();
  const course = coursesData.find((c) => c.id === id);
  const lessons = course.lessons;
  const allLessons = [];

  // Loop over all parts dynamically
  if (lessons && typeof lessons === "object") {
    Object.keys(lessons).forEach((partKey) => {
      const partLessons = lessons[partKey];
      if (Array.isArray(partLessons)) {
        allLessons.push(...partLessons);
      }
    });
}
  
  if (!course || allLessons.length === 0) {

    return (<p className="mt-10 text-center text-white">Course not found!</p>);
  }


  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeQuiz, setActiveQuiz] = useState([]);     //state that hold current quiz data


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

 

  const currentLesson = allLessons[currentLessonIndex];

  const handleLessonClick = (lesson, index) => {
    setCurrentLessonIndex(index);
  }

  useEffect(() => {
    if (!allLessons || allLessons.length === 0) return;

    const selectedLesson = allLessons[currentLessonIndex];
    if (selectedLesson) {
      // ✅ make sure quizData exists for this lesson ID
      const quizData = class10AIQuizData[selectedLesson.id] || [];
      setActiveQuiz([...quizData]); // clone to ensure re-render
    }
  }, [currentLessonIndex]);



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

  const formatTitle = (text) => {
  // Insert space before capital letters (e.g., numberSystem → number System)
  const spaced = text.replace(/([a-z])([A-Z])/g, "$1 $2");
  // Capitalize each word
  return spaced
    .split(" ")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
};

  
  return (
    <Box 
      sx={{
        minHeight: "100vh",
        position: "relative",
        color: "white",
        py: 10,
        background: "linear-gradient(to bottom right, #177E89, #3B5B8C, #533A71)",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.4)",
          zIndex: 0,
        }}
      />
      
      {/* Main Content Start From Here  */}
      <Box 
        sx={{
          maxWidth: "1200px", 
          mx: "auto", 
          px: { xs: 2, sm: 4 }, 
          position: "relative",
          zIndex: 1,
        }}
      >
          
         {/* Breadcrumb */}
        <Breadcrumbs 
          sx={{color: "gray", mb: 2, fontSize: "0.9rem" }}
          separator=">"
        >
          <Link href="/courses" color="inherit" underline="hover">
            Courses
          </Link>
          
          <Link 
            href={`/courses/${course.id}`}
            underline="hover"
            sx={{ color: "#A6E1FA"}}
          >
            {course.title}
          </Link>
          <Typography color="#A6E1FA">{currentLesson.title}</Typography>
        </Breadcrumbs>


        {/* Header */}
        <Paper 
          elevation={6}
          sx={{
            minWidth: 0,
            maxWidth: "100%",
            background: "black",
            backgroundImage: `url(${course.headImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            WebkitBackdropFilter: "blur(20px) saturate(180%)", // for Safari
            borderRadius: "20px",
            p: { xs: 2, sm: 4 }, 
            mb: 6,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "white",
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            {course.title}
          </Typography>
          
          <Typography variant="body1" sx={{ color: "gray.300", mb: 3 }}>
            Instructor: {course.instructor || "N/A"}
          </Typography>

          {/* Progress Bar */}
          <Box sx={{ mb: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "rgba(255,255,255,0.2)",
                "& .MuiLinearProgress-bar": {
                  background:
                    "linear-gradient(to right, #177E89, #3D5A80, #533A71)",
                },
              }}
            />
          </Box>
          
          <Typography variant="body2" sx={{ color: "gray.300" }}>
            {Math.round(progress)}% Completed
          </Typography>
        </Paper>

        {/* Main Content */}
        <Grid container spacing={3} >
            {/* Left: Video + Notes + Quiz */}
            <Grid item xs={12} sm={12} md={8} lg={8} sx={{ flexGrow: 1 }}>
              <Paper
                elevation={6}
                sx={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)", // for Safari
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1, md: 4 },
                  p: { xs: 2, md: 4 },
                  minWidth: 0,
                  width: "100%",
                  maxWidth: "100%",
                }}
              >
                {/* LESSON TITLE  */}
                <Typography variant="h5" fontWeight={600}>
                  {currentLesson.title}
                </Typography>
              

                {/* Video or PDF Box */}
                <Box
                  sx={{
                    aspectRatio: currentLesson.video ? "16/9" : "auto",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    minWidth: 0,
                    width: "100%",
                    maxWidth: "100%",
                  }}
                >
                  {currentLesson.video && (
                    <video 
                      src={currentLesson.video} 
                      controls 
                      style={{ width: "100%", borderRadius: 8 }} 
                    />
                  )}
                  {currentLesson.pdf && (
                    <iframe
                      src={currentLesson.pdf}
                      title="Lesson PDF"
                      width="100%"
                      height="480"
                      allow="autoplay"
                      style={{ border: "none", borderRadius: 8 }}
                    />
                  )}
                </Box>

                {/* Notes */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ 
                      color: "#A6E1FA", 
                      fontWeight: 600, 
                      mb: 1, 
                      display: "flex", 
                      alignItems: "center", 
                      gap: { xs: 1, md: 4 }, 
                      minWidth: 0,
                      width: "100%",
                      maxWidth: "100%",
                    }}
                  >
                    📒 Lesson Notes <IoPlayCircleOutline />
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray.300"}}>
                    {currentLesson.notes}
                  </Typography>
                </Box>

                {/* Quiz */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ 
                      color: "#A6E1FA", 
                      fontWeight: 600, 
                      mb: 1, 
                      display: "flex", 
                      alignItems: "center", 
                      gap: { xs: 1, md: 4 },
                      minWidth: 0,
                      width: "100%",
                      maxWidth: "100%",
                    }}
                  >
                    🧠 Quick Quiz <IoPlayCircleOutline />
                  </Typography>

                  {activeQuiz && activeQuiz.length > 0 ? (
                    <Quiz
                      quizTitle={`Quiz on ${currentLesson.title}`}
                      questions={activeQuiz}
                      key={currentLesson.id}   //force re-render when lesson changes
                    />
                  ) : (
                    <div className="py-6 italic text-center text-gray-400">
                      🔒 Select a lesson to start its quiz.
                    </div>
                  )}
                </Box>

                  {/* Navigation Buttons  */}
                <Box 
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    minWidth: 0,
                    width: "100%",
                    maxWidth: "100%",
                  }}
                >
                  {/* Previous Button */}
                  <Button
                    variant="contained"
                    onClick={handlePrevious}
                    disabled={currentLessonIndex === 0}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.3)",
                      },
                    }}
                  >
                    ⬅ Previous
                  </Button>

                  {/* Next Button */}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={currentLessonIndex === allLessons.length - 1}
                    sx={{
                      background: "linear-gradient(to right, #177E89, #3D5A80, #533A71)",
                      color: "white",
                      "&:hover": {
                        opacity: 0.9,
                      },
                    }}
                  >
                    Next ➡
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            {/* Right: Lesson List */}
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Paper
                elevation={6}
                sx={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)", // Safari
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                  display: "flex",
                  flexDirection: "column",
                  p: { xs: 2, md: 4 },
                  minWidth: 0,
                  width: "100%",
                  maxWidth: "100%",
                }}
              >
                <Typography 
                  variant="h6" 
                  fontWeight={600} 
                  mb={2} 
                  sx={{ color: "#A6E1FA" }}
                >
                  📚 Course Lessons
                </Typography>

                {/* Loop over parts dynamically */}
                {lessons &&
                  Object.keys(lessons).map((partKey) => {
                    const partLessons = lessons[partKey];
                    if (!partLessons || !partLessons.length) return null;

                    return (
                      <Box key={partKey} sx={{ mb: 2 }}>
                        {/* Part Title */}
                        <Typography
                          variant="subtitle1"
                          sx={{ 
                            color: "gray.100", 
                            fontWeight: 500, 
                            mb: 1,
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            gap: 3, 
                          }}
                        >
                          {!partKey.toLowerCase().includes("chapter")
                          ? `Chapter: ${formatTitle(partKey)}`
                          : partKey.replace(/part/i, "Part ")}<IoPlayCircleOutline />
                        </Typography>

                        {/* Lessons inside the part */}
                        {partLessons.map((lesson) => {
                          const lessonIndex = allLessons.findIndex((l) => l.id === lesson.id);
                          return (
                            <Accordion
                              key={lesson.id}
                              expanded={lessonIndex === currentLessonIndex}
                              onClick={() => handleLessonClick(lesson, lessonIndex)}
                              sx={{
                                backgroundColor:
                                  lessonIndex === currentLessonIndex
                                    ? "rgba(255,255,255,0.15)"
                                    : "transparent",
                                color: "white",
                                borderRadius: 2,
                                mb: 1,
                                "&:before": { display: "none" },
                                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                              }}
                            >
                              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
                                <Typography>
                                  {lessonIndex + 1}. {lesson.title}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "gray.300", lineHeight: 1.6 }}
                                >
                                  {lesson.description || "Click to view lesson content."}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          );
                        })}
                      </Box>
                    );
                  })}
              </Paper>
            </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CourseContent;
