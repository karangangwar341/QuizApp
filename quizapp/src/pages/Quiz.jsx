import React, { useEffect, useState } from "react";
import { fetchData } from "../api/questions";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(1800); // 30 minutes in seconds
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const storedQuestions = localStorage.getItem("questions");

        if (storedQuestions) {
          setQuestions(initializeQuestions(JSON.parse(storedQuestions)));
        } else {
          const fetchedQuestions = await fetchData();
          setQuestions(initializeQuestions(fetchedQuestions));
        }

        setIsLoading(false);
      } catch (err) {
        setError("Failed to load questions. Please try again.");
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const initializeQuestions = (questions) => {
    return questions.map((question) => ({
      ...question,
      shuffledOptions: shuffleOptions([
        ...question.incorrectAnswers,
        question.correctAnswer,
      ]),
    }));
  };

  const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timer === 0) {
      handleSubmitQuiz();
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        totalScore += 1;
      }
    });
    setScore(totalScore);
  };

  const handleSubmitQuiz = () => {
    const score = calculateScore();
    const results = {
      questions,
      selectedAnswers,
      score,
    };
    console.log(results);
    localStorage.setItem("quizResults", JSON.stringify(results));
    navigate("/results");
  };
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-5 text-lg font-medium animate-pulse">
        Loading questions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-5">
        {error}
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const options = currentQuestion.shuffledOptions;

  return (
    <div className="flex h-screen w-screen gap-4 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50">
      
      {/* Sidebar */}
      <div className="w-1/4 bg-white bg-opacity-90 backdrop-blur-sm p-5 shadow-md rounded-lg animate-slide-in-left">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Questions</h2>
        <ul className="space-y-2">
          {questions.map((question, index) => (
            <li
              key={index}
              className={`p-2 rounded cursor-pointer transition-all duration-300 ${
                index === currentQuestionIndex
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              Question {index + 1}
            </li>
          ))}
        </ul>
        <button
          onClick={handleSubmitQuiz}
          className="mt-5 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 animate-pulse"
        >
          Submit Quiz
        </button>
      </div>

      {/* Main Quiz Area */}
      <div className="w-full h-screen">
      <div className=" flex justify-between m-3 text-right gap-2 bg-white border p-1 px-2 rounded-[10px] text-xl font-medium text-gray-500 mb-4">
         <p>
         {localStorage.getItem("name")}
         </p>
         <p className="font-normal"> 
            Time remaining:{" "}
            <span className={`timer ${timer <= 60 ? 'low-time' : ''}`}>
              {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}
            </span>
          </p> 
          </div>
      <div className="md:px-16  px-8  pb-12 md:pt-16 pt-12 mt-12 text-blue-950 lg:px-36 bg-white rounded-[30px] m-6">
       
        <div
          className="mb-5 transition-all duration-500 ease-in-out transform opacity-0 scale-95 animate-fade-in-up"
          style={{ opacity: 1, transform: 'scale(1)' }}
        >
          <h2 className="text-xl font-semibold mb-3">{currentQuestion.question}</h2>
          
        </div>
        <ul className="space-y-3">
          {options.map((option, index) => (
            <li
              key={index}
              className={`p-3 rounded border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedAnswers[currentQuestionIndex] === option
                  ? option === currentQuestion.correctAnswer
                    ? "bg-green-200 border-green-400"
                    :  "bg-green-200 border-green-400"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleAnswerSelection(option)}
            >
              {option}
            </li>
          ))}
        </ul>
        <div className="mt-12  gap-4 flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-4 w-full py-2 rounded ${
              currentQuestionIndex === 0
                ? "bg-gray-300 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className={`px-4 py-2 rounded w-full ${
              currentQuestionIndex === questions.length - 1
                ? "bg-gray-300 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
      </div>

    </div>
  );
};

export default Quiz;
