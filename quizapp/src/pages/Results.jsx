import React from "react";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();
  const results = JSON.parse(localStorage.getItem("quizResults"));
console.log(results)
  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-700">No Results Found</h1>
        <p className="text-gray-500 mt-2">Please take the quiz first to view results.</p>
        <button
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Take Quiz
        </button>
      </div>
    );
  }

  const { questions, selectedAnswers, score } = results;

  return (
    <div className=" h-auto text-blue-900 bg-gradient-to-r lg:px-44 md:px-24 from-purple-50 via-pink-50 to-red-50 flex flex-col items-center p-6">
      <div className="w-fit bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Quiz Results</h1>
        <p className="text-center text-lg text-gray-700 mb-6">
          Final Score: <span className="font-semibold text-green-600">{results.score}</span> / {questions.length}
        </p>
        <ul className="space-y-6">
          {questions.map((question, index) => (
            <li key={index} className="border p-4 rounded-md bg-gray-50 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">{question.id+1+".)  "+question.question}</h3>
              <p className="text-sm mt-2">
                <span className="font-medium">Your Answer:</span>{" "}
                <span
                  className={
                    selectedAnswers[index] === question.correctAnswer
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {selectedAnswers[index] || "Not Answered"}
                </span>
              </p>
              <p className="text-sm mt-1">
                <span className="font-medium">Correct Answer:</span>{" "}
                <span className="text-blue-600 font-bold">{question.correctAnswer}</span>
              </p>
              {selectedAnswers[index] === question.correctAnswer ? (
                <span className="text-green-600 text-xl">✅</span>
              ) : (
                <span className="text-red-600 text-xl">❌</span>
              )}
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              localStorage.removeItem("quizResults");
              navigate("/");
            }}
            className="px-8 py-3 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600"
          >
            Reattempt Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
