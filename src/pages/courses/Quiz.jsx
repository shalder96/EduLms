import React, { useState, useEffect } from "react";
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
    <div className="flex flex-col items-center justify-center p-6 text-white bg-gradient-to-r from-[#177E89] via-[#3D5A80] to-[#533A71] border-none rounded-lg">
      <h1 className="mb-6 text-xl font-bold sm:text-2xl md:text-3xl">{quizTitle}</h1>

      {/* Start Screen */}
      {!started && !finished && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startQuiz}
          className="px-6 py-3 font-semibold text-indigo-600 transition-transform bg-white rounded-full shadow-lg hover:scale-105"
        >
          🚀 Start Quiz
        </motion.button>
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
            className="w-full p-6 shadow-lg bg-white/10 rounded-2xl backdrop-blur-md"
          >
            {/* Top Bar */}
            <div className="flex justify-between mb-3 text-sm text-gray-200">
              <p>
                Question {currentIndex + 1} / {quizQuestions.length}
              </p>
              <p className="font-semibold text-yellow-300">⏱ {timer}s</p>
            </div>

            {/* Timer Progress Bar */}
            <div className="w-full h-2 mb-5 overflow-hidden rounded-full bg-white/20">
              <motion.div
                className="h-2 bg-yellow-400"
                initial={{ width: "100%" }}
                animate={{ width: progressWidth }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </div>

            {/* Question */}
            <h2 className="mb-4 text-lg font-semibold md:text-xl lg:text-2xl">
              {quizQuestions[currentIndex].question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {quizQuestions[currentIndex].options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left px-4 py-2 rounded-lg border border-white/20 transition ${
                    selected
                      ? option === quizQuestions[currentIndex].answer
                        ? "bg-green-500 text-white"
                        : option === selected
                        ? "bg-red-500 text-white"
                        : "bg-white/10"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-lg font-medium text-center"
                >
                  {feedback}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            <div className="mt-6 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleNext}
                className="px-4 py-2 font-semibold text-indigo-800 transition bg-yellow-400 rounded-full hover:scale-105"
              >
                Next ➡️
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Finished Screen */}
      {finished && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col justify-center p-8 text-center shadow-lg bg-white/10 rounded-2xl backdrop-blur-md"
        >
          <h2 className="mb-3 text-2xl font-bold">🎉 Quiz Finished!</h2>
          <p className="mb-4 text-lg">
            Your Score: <span className="font-bold">{score}</span> /{" "}
            {quizQuestions.length}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startQuiz}
            className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-center text-indigo-600 transition-transform bg-white rounded-full shadow-lg hover:scale-105"
          >
             <VscDebugRestart />Restart
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
