import React from "react";
export const Question = ({
    question,
    options,
    selectedAnswer,
    onSelectAnswer,
    isLastQuestion,
    isFirstQuestion,
    onNext,
    onPrevious,
  }) => (
    <div className="md:px-16 px-8 md:pb-12 pb-4 md:pt-16 pt-4 mt-4 md:mt-16 text-blue-950 lg:px-36 bg-white rounded-[30px] m-6">
      <h2 className="text-xl font-semibold mb-3">{question}</h2>
      <ul className="space-y-3">
        {options.map((option, index) => (
          <li
            key={index}
            className={`p-3 rounded border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedAnswer === option
                ? "bg-green-200 border-green-400"
                : "hover:bg-gray-100"
            }`}
            onClick={() => onSelectAnswer(option)}
          >
            {option}
          </li>
        ))}
      </ul>
      <div className="mt-12 gap-4 flex justify-between">
        <button
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className={`px-4 w-full py-2 rounded ${
            isFirstQuestion
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={isLastQuestion}
          className={`px-4 py-2 rounded w-full ${
            isLastQuestion
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );