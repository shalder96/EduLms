import React from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { coursesData } from "../../data/data";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Link,
  Divider,
  Breadcrumbs,
} from "@mui/material";

const CourseDetail = () => {
  const { id } = useParams();
  const course = coursesData.find((c) => c.id === id);
  const navigate = useNavigate();

  if (!course)
    return (
      <Typography
        sx={{ mt: 10, textAlign: "center", color: "white" }}
        variant="h6"
      >
        Course not found!
      </Typography>
    );
  const handleStartCourse = () => {
    navigate(`/courses/${id}/start`);
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #177E89, #3B5B8C, #533A71)",
        color: "white",
        py: { xs: 8, md: 12 },
        px: { xs: 0, md: 8 },
        position: "relative",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.4)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
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
        </Breadcrumbs>

        {/* Hero Section */}
        <Paper
          elevation={8}
          sx={{
            textAlign: "center",
            p: { xs: 4, md: 8 },
            borderRadius: 4,
            background: "linear-gradient(to right, #533A71, #177E89)",
            color: "white",
            mb: 8,
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}
          >
            {course.board ? `${course.board} ` : ""}
            {course.class ? `${course.class} ` : ""}
            {course.title}
          </Typography>

          <Typography variant="h6" sx={{ mb: 3, color: "gray.200" }}>
            Your Ultimate Study Companion for {course.title} Excellence
          </Typography>

          <Typography
            sx={{
              display: "inline-block",
              px: 3,
              py: 1,
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "9999px",
              backdropFilter: "blur(10px)",
              fontWeight: 600,
              bgcolor: "rgba(255,255,255,0.15)",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
            }}
          >
            ✨ Updated for 2025–26 Academic Year ✨
          </Typography>
        </Paper>

        {/* Content Section */}
        <Paper
          elevation={10}
          sx={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)", // for Safari
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            color: "white",
            p: { xs: 2, sm: 4 }, 
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 4, fontWeight: 600 }}
          >
            🚀 Welcome to {course.title} Hub
          </Typography>

          <Grid container spacing={4} alignItems="flex-start">
            {/* Top - Image + Info */}
            <Grid item xs={12} md={4} size={{xs: "grow", md: "auto"}} >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", md: "flex-start"},
                  gap: 3,
                }}
              >
                <Box
                  component="img"
                  src={course.image}
                  alt={course.title}
                  sx={{
                    height: 200,
                    width: 200,
                    objectFit: "cover",
                    bgcolor: "rgba(255,255,255,0.1)",
                    p: 1,
                    borderRadius: 3,
                    boxShadow: 4,
                  }}
                />

                <Box sx={{ color: "gray.300", fontSize: "0.95rem" }}>
                  <Typography>
                    <strong>Instructor:</strong> {course.instructor || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Class:</strong> {course.class || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Subject:</strong> {course.subject || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Board:</strong> {course.board || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Bottom - Course Info */}
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  bgcolor: "rgba(0,0,0,0.3)",
                  p: { xs: 2, md: 4 },
                  borderRadius: 3,
                  maxHeight: 400,
                  overflowY: "auto",
                }}
              >
                <Typography variant="body1" sx={{ mb: 2, color: "gray.200" }}>
                  🚀 Dive into the fascinating world of{" "}
                  <Box component="span" sx={{ color: "#A6E1FA", fontWeight: 600 }}>
                    {course.title}
                  </Box>{" "}
                  with our comprehensive study materials designed for{" "}
                  {course.board && (
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      {course.board}
                    </Box>
                  )}{" "}
                  {course.class && (
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      {course.class}
                    </Box>
                  )}{" "}
                  students.
                </Typography>

                <ul style={{ paddingLeft: "1rem", listStyle: "circle", marginBottom: "1rem" }}>
                  <li>📘 Latest syllabus aligned with board guidelines</li>
                  <li>🖋️ Concept-based learning modules for easy understanding</li>
                  <li>💡 Interactive exercises to practice and test knowledge</li>
                  <li>🎯 Tips and shortcuts to stay ahead of the curve</li>
                  <li>📝 Quick summaries and notes for revision</li>
                </ul>

                <Typography variant="body2" sx={{ color: "gray.300" }}>
                  {course.introduction}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* CTA Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Button
              onClick={handleStartCourse}
              variant="contained"
              sx={{
                background:
                  "linear-gradient(to right, #177E89, #3D5A80, #533A71)",
                borderRadius: "9999px",
                px: 6,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "none",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  background:
                    "linear-gradient(to right, #533A71, #177E89, #3D5A80)",
                },
              }}
            >
              🚀 Start Course
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CourseDetail;
