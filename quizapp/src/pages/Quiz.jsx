import React, { useEffect, useState } from "react";
import { fetchData } from "../api/questions";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Timer } from "../components/Timer";
import { Question } from "../components/Question";

const initializeQuestions = (questions) =>
  questions.map((question) => ({
    ...question,
    shuffledOptions: shuffleOptions([
      ...question.incorrectAnswers,
      question.correctAnswer,
    ]),
  }));

const shuffleOptions = (options) => options.sort(() => Math.random() - 0.5);

const calculateScore = (questions, selectedAnswers) =>
  questions.reduce(
    (score, question, index) =>
      selectedAnswers[index] === question.correctAnswer ? score + 1 : score,
    0
  );

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timer, setTimer] = useState(1800); // Default: 30 minutes
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from localStorage or API on mount
  useEffect(() => {
    const loadQuizState = async () => {
      try {
        const storedQuestions = localStorage.getItem("questions");
        const storedAnswers = localStorage.getItem("selectedAnswers");
        const storedCurrentQuestionIndex = localStorage.getItem(
          "currentQuestionIndex"
        );
        const storedTimer = localStorage.getItem("timer");

        let fetchedQuestions = [];
        if (storedQuestions) {
          fetchedQuestions = JSON.parse(storedQuestions);
        } else {
          fetchedQuestions = await fetchData();
          localStorage.setItem("questions", JSON.stringify(fetchedQuestions));
        }

        setQuestions(initializeQuestions(fetchedQuestions));
        setSelectedAnswers(storedAnswers ? JSON.parse(storedAnswers) : {});
        setCurrentQuestionIndex(
          storedCurrentQuestionIndex ? parseInt(storedCurrentQuestionIndex, 10) : 0
        );
        setTimer(storedTimer ? parseInt(storedTimer, 10) : 1800);
      } catch {
        setError("Failed to load questions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizState();
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem("questions", JSON.stringify(questions));
      localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
      localStorage.setItem("currentQuestionIndex", currentQuestionIndex.toString());
      localStorage.setItem("timer", timer.toString());
    }
  }, [questions, selectedAnswers, currentQuestionIndex, timer]);

  const handleSubmitQuiz = () => {
    const score = calculateScore(questions, selectedAnswers);
    localStorage.setItem(
      "quizResults",
      JSON.stringify({ questions, selectedAnswers, score })
    );

    // Clear localStorage for quiz state
    localStorage.removeItem("questions");
    localStorage.removeItem("selectedAnswers");
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("timer");

    navigate("/results");
  };

  if (isLoading) {
    return <div className="w-screen h-screen flex items-center justify-items-center justify-center">Loading questions...</div>;
  }

  if (error) {
    return <div className="w-screen h-screen flex items-center justify-items-center justify-center">{error}</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="md:flex h-screen w-screen gap-4 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50">
      <Sidebar
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        selectedAnswers={selectedAnswers}
        onSelectQuestion={setCurrentQuestionIndex}
        onSubmitQuiz={handleSubmitQuiz}
      />
      <div className="w-full">
        <Timer timer={timer} onTimeout={setTimer} />
        <Question
          question={currentQuestion.question}
          options={currentQuestion.shuffledOptions}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
          onSelectAnswer={(answer) =>
            setSelectedAnswers((prev) => ({
              ...prev,
              [currentQuestionIndex]: answer,
            }))
          }
          isLastQuestion={currentQuestionIndex === questions.length - 1}
          isFirstQuestion={currentQuestionIndex === 0}
          onNext={() => setCurrentQuestionIndex((prev) => prev + 1)}
          onPrevious={() => setCurrentQuestionIndex((prev) => prev - 1)}
        />
      </div>
    </div>
  );
};

export default Quiz;
