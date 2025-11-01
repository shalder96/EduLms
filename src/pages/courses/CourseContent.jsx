// CourseContent.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { coursesData } from "../../data/data";
import Quiz from "./Quiz";
import { class10AIQuizData } from "../../data/aiqna";
import ErrorBoundary from "../../components/ErrorBoundary";
import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloseIcon from "@mui/icons-material/Close";
import { IoPlayCircleOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PDF_WORKER_URL = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;


const clamp = (v, min, max) => Math.max(min, Math.min(max, v || 0));

const CourseContent = () => {
  const { id } = useParams();
  const course = useMemo(() => coursesData.find((c) => c.id === id), [id]);
  if (!course)
    return <p className="mt-10 text-center text-white">Course not found!</p>;

  const lessonsObj = course.lessons || {};
  const allLessons = useMemo(() => {
    const arr = [];
    if (lessonsObj && typeof lessonsObj === "object") {
      Object.keys(lessonsObj).forEach((partKey) => {
        const partLessons = lessonsObj[partKey];
        if (Array.isArray(partLessons)) arr.push(...partLessons);
      });
    }
    return arr;
  }, [lessonsObj]);

  if (!allLessons.length)
    return <p className="mt-10 text-center text-white">No lessons found!</p>;

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeQuiz, setActiveQuiz] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(`progress-${id}`);
    if (saved) {
      try {
        const { index = 0 } = JSON.parse(saved);
        setCurrentLessonIndex(clamp(index, 0, allLessons.length - 1));
      } catch {}
    }
  }, [id]);

  // Update progress
  useEffect(() => {
    const percentage = ((currentLessonIndex + 1) / allLessons.length) * 100;
    setProgress(percentage);
    localStorage.setItem(
      `progress-${id}`,
      JSON.stringify({ index: currentLessonIndex, progress: percentage })
    );
  }, [currentLessonIndex, id, allLessons.length]);

  const currentLesson = allLessons[currentLessonIndex] || {};

  // Quiz load
  useEffect(() => {
    const quizData = class10AIQuizData[currentLesson.id] || [];
    setActiveQuiz(Array.isArray(quizData) ? quizData : []);
  }, [currentLesson]);

  const handleLessonClick = (_, index) => setCurrentLessonIndex(index);
  const handleNext = () =>
    setCurrentLessonIndex((prev) => clamp(prev + 1, 0, allLessons.length - 1));
  const handlePrevious = () =>
    setCurrentLessonIndex((prev) => clamp(prev - 1, 0, allLessons.length - 1));

  const formatTitle = (t = "") =>
    t.replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "white",
        py: 10,
        background: "linear-gradient(to bottom right, #177E89, #3B5B8C, #533A71)",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 4 },
          position: "relative",
        }}
      >
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ color: "gray", mb: 2, fontSize: "0.9rem" }} separator=">">
          <Link component={RouterLink} to="/courses" color="inherit" underline="hover">
            Courses
          </Link>
          <Link
            component={RouterLink}
            to={`/courses/${course.id}`}
            underline="hover"
            sx={{ color: "#A6E1FA" }}
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
            WebkitBackdropFilter: "blur(20px) saturate(180%)", 
            borderRadius: "20px", 
            p: { xs: 2, sm: 4 }, 
            mb: 6, 
            border: "1px solid rgba(255, 255, 255, 0.2)", 
            color: "white", }}
        >
          <Typography variant="h4" fontWeight={700}>
            {course.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "gray.300", mb: 3 }}>
            Instructor: {course.instructor || "N/A"}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 5,
              mb: 1,
              backgroundColor: "rgba(255,255,255,0.2)",
              "& .MuiLinearProgress-bar": {
                background:
                  "linear-gradient(to right, #177E89, #3D5A80, #533A71)",
              },
            }}
          />
          <Typography variant="body2" sx={{ color: "gray.300" }}>
            {Math.round(progress)}% Completed
          </Typography>
        </Paper>

        {/* Main layout */}
        <Box 
          sx={{ 
            display: "flex", 
            position: "relative", 
            gap: 3 
          }}
        >
          {/* Left Section */}
          <Box 
            sx={{ 
              flex: 1, 
              position: "relative" 
            }}
          >
            <IconButton
              onClick={() => setShowSidebar((prev) => !prev)}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 5,
                color: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
              }}
            >
              {showSidebar ? <CloseIcon /> : <MenuBookIcon />}
            </IconButton>

            <Paper
              elevation={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)", // for Safari
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                p: { xs: 2, sm: 4 },
              }}
            >
              <Typography variant="h5" fontWeight={600}>
                {currentLesson.title}
              </Typography>

              {/* PDF or Video */}
              {currentLesson.video ? (
                <video
                  key={currentLesson.video}
                  src={currentLesson.video}
                  controls
                  style={{ width: "100%", borderRadius: 8 }}
                />
              ) : currentLesson.pdf ? (
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  sx={{
                    width: "100%",
                    height: "80vh",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                    position: "relative",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  <ErrorBoundary>
                    <iframe
                      key={currentLesson.pdf}
                      src={currentLesson.pdf}
                      title="PDF Viewer"
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        borderRadius: "inherit",
                      }}
                      allow="fullscreen"
                    />
                  </ErrorBoundary>
                </Box>
              ) : (
                <Typography sx={{ color: "gray.300", textAlign: "center" }}>
                  No content available for this lesson.
                </Typography>
              )}

              {/* Notes */}
              <Box>
                <Typography variant="h6" sx={{ color: "#A6E1FA", mb: 1 }}>
                  📒 Lesson Notes
                </Typography>
                <Typography variant="body2" sx={{ color: "gray.300" }}>
                  {currentLesson.notes || "No notes for this lesson."}
                </Typography>
              </Box>

              {/* Quiz */}
              <Box>
                <Typography variant="h6" sx={{ color: "#A6E1FA", mb: 1 }}>
                  🧠 Quick Quiz
                </Typography>
                {activeQuiz.length ? (
                  <Quiz
                    quizTitle={`Quiz on ${currentLesson.title}`}
                    questions={activeQuiz}
                  />
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ color: "gray.400", textAlign: "center", py: 2 }}
                  >
                    🔒 Select a lesson to start its quiz.
                  </Typography>
                )}
              </Box>

              {/* Navigation */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  onClick={handlePrevious}
                  disabled={currentLessonIndex === 0}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                  }}
                >
                  ⬅ Previous
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={currentLessonIndex === allLessons.length - 1}
                  sx={{
                    background:
                      "linear-gradient(to right, #177E89, #3D5A80, #533A71)",
                    color: "white",
                    "&:hover": { opacity: 0.9 },
                  }}
                >
                  Next ➡
                </Button>
              </Box>
            </Paper>
          </Box>

          {/* Right Sidebar */}
          <AnimatePresence>
            {showSidebar && (
              <motion.div
                key="sidebar"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "350px",
                  zIndex: 4,
                }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    height: "100%",
                    background: "linear-gradient(to bottom, rgba(23,126,137,0.85), rgba(61,90,128,0.75), rgba(83,58,113,0.85))",
                    backdropFilter: "blur(20px)",
                    borderRadius: "20px 0 0 20px",
                    p: 3,
                    overflowY: "auto",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#A6E1FA", mb: 2 }}>
                    📚 Course Lessons
                  </Typography>
                  {Object.keys(lessonsObj).map((partKey) => {
                    const partLessons = lessonsObj[partKey];
                    if (!Array.isArray(partLessons) || !partLessons.length)
                      return null;
                    return (
                      <Box key={partKey} sx={{ mb: 2 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "gray.100",
                            mb: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          {!partKey.toLowerCase().includes("chapter")
                            ? `Chapter: ${formatTitle(partKey)}`
                            : partKey.replace(/part/i, "Part ")}
                          <IoPlayCircleOutline />
                        </Typography>

                        {partLessons.map((lesson) => {
                          const lessonIndex = allLessons.findIndex(
                            (l) => l.id === lesson.id
                          );
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
                                "&:hover": {
                                  backgroundColor: "rgba(255,255,255,0.08)",
                                },
                              }}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                              >
                                <Typography>
                                  {lessonIndex + 1}. {lesson.title}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "gray.300", lineHeight: 1.6 }}
                                >
                                  {lesson.description ||
                                    "Click to view lesson content."}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          );
                        })}
                      </Box>
                    );
                  })}
                </Paper>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseContent;
