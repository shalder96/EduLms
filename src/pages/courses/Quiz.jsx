import React, { useState, useEffect } from "react";
import { Box, Typography, Button, LinearProgress, Paper } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { VscDebugRestart } from "react-icons/vsc";

export default function Quiz({ quizTitle, questions }) {
  const [started, setStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [timer, setTimer] = useState(30);
  const [finished, setFinished] = useState(false);

  // Start Quiz
  const startQuiz = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuizQuestions(shuffled);
    setStarted(true);
    setFinished(false);
    setScore(0);
    setCurrentIndex(0);
    setTimer(30);
    setSelected(null);
    setFeedback("");
  };

  // Timer Logic
  useEffect(() => {
    if (started && timer > 0 && !finished) {
      const countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0 && started) {
      handleNext();
    }
  }, [timer, started]);

  const handleOptionClick = (option) => {
    if (selected) return;
    setSelected(option);
    if (option === quizQuestions[currentIndex].answer) {
      setFeedback("✅ Correct!");
      setScore((prev) => prev + 1);
    } else {
      setFeedback(
        `❌ Wrong! Correct answer: ${quizQuestions[currentIndex].answer}`
      );
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
      setFeedback("");
      setTimer(30);
    } else {
      setFinished(true);
      setStarted(false);
    }
  };

  const progressWidth = `${(timer / 30) * 100}%`;

  return (
    <Paper
      elevation={6}
      sx={{
        width: "100%",
        maxWidth: 800,
        mx: "auto",
        overflow: "hidden",
        borderRadius: 3,
        textAlign: "center",
        color: "white",
        p: {xs: 2, md:3},
        background: "linear-gradient(90deg, #177E89, #3D5A80, #533A71)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        sx={{ textShadow: "0 2px 6px rgba(0,0,0,0.4)" }}
      >
        {quizTitle}
      </Typography>

      {/* Start Screen */}
      {!started && !finished && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            onClick={startQuiz}
            sx={{
              bgcolor: "white",
              color: "#3D5A80",
              fontWeight: "600",
              borderRadius: 9999,
              px: 4,
              py: 1.5,
              boxShadow: 3,
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            🚀 Start Quiz
          </Button>
        </motion.div>
      )}

      {/* Quiz Body */}
      <AnimatePresence mode="wait">
        {started && !finished && quizQuestions.length > 0 && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
          >
            {/* Top Bar */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="body2">
                Question {currentIndex + 1} / {quizQuestions.length}
              </Typography>
              <Typography variant="body2" color="warning.main" fontWeight="bold">
                ⏱ {timer}s
              </Typography>
            </Box>

            {/* Timer Progress */}
            <LinearProgress
              variant="determinate"
              value={(timer / 30) * 100}
              sx={{
                height: 8,
                borderRadius: 5,
                mb: 3,
                backgroundColor: "rgba(255,255,255,0.3)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#FFD700",
                },
              }}
            />

            {/* Question */}
            <Typography
              variant="h6"
              fontWeight="600"
              mb={3}
              sx={{ 
                textShadow: "0 1px 4px rgba(0,0,0,0.3)",
                wordBreak: "break-word",
                whiteSpace: "normal",
                overflowWrap: "break-word",
                textAlign: "start",
              }}
            >
              {quizQuestions[currentIndex].question}
            </Typography>

            {/* Options */}
            <Box display="flex" flexDirection="column" gap={1.5}>
              {quizQuestions[currentIndex].options.map((option, idx) => (
                <motion.div key={idx} whileTap={{ scale: 0.98 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleOptionClick(option)}
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      borderColor: "rgba(255,255,255,0.3)",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      lineHeight: 1.4,
                      color: "white",
                      textAlign: "start",
                      bgcolor: selected
                        ? option === quizQuestions[currentIndex].answer
                          ? "success.main"
                          : option === selected
                          ? "error.main"
                          : "rgba(255,255,255,0.1)"
                        : "rgba(255,255,255,0.1)",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.2)",
                      },
                    }}
                  >
                    {option}
                  </Button>
                </motion.div>
              ))}
            </Box>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Typography
                    mt={3}
                    variant="subtitle1"
                    fontWeight="500"
                    textAlign="center"
                  >
                    {feedback}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            <Box mt={4}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  onClick={handleNext}
                  sx={{
                    bgcolor: "#FFD700",
                    color: "#2E294E",
                    fontWeight: "bold",
                    borderRadius: 9999,
                    px: 3,
                    py: 1,
                    "&:hover": { bgcolor: "#FFC107" },
                  }}
                >
                  Next ➡️
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Finished Screen */}
      {finished && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 5,
              borderRadius: 4,
              background: "rgba(0,0,0,0.25)",
              backdropFilter: "blur(10px)",
              color: "white",
              textAlign: "center",
              mt: 3,
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={2}>
              🎉 Quiz Finished!
            </Typography>
            <Typography variant="h6" mb={3}>
              Your Score: <strong>{score}</strong> / {quizQuestions.length}
            </Typography>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                onClick={startQuiz}
                startIcon={<VscDebugRestart />}
                sx={{
                  bgcolor: "white",
                  color: "#3D5A80",
                  borderRadius: 9999,
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  boxShadow: 3,
                }}
              >
                Restart
              </Button>
            </motion.div>
          </Paper>
        </motion.div>
      )}
    </Paper>
  );
}
