import React, { useEffect, useRef } from "react";

export const Sidebar = ({
  questions,
  currentQuestionIndex,
  selectedAnswers,
  onSelectQuestion,
  onSubmitQuiz,
}) => {
  const questionRefs = useRef([]);

  useEffect(() => {
    if (questionRefs.current[currentQuestionIndex]) {
      questionRefs.current[currentQuestionIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentQuestionIndex]);

  return (
    <>
     
      <div style={{ overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex-col  no-scrollbar w-full md:h-screen border-2 md:w-1/3 lg:w-1/4 bg-white bg-opacity-90 backdrop-blur-sm p-5 overflow-hidden shadow-md rounded-lg animate-slide-in-left">
        <h2 className="flex-1 text-lg font-bold mb-4 text-gray-700">Questions</h2>
        <div className=" flex-1 overflow-auto md:h-[82vh]">
          <ul className="space-y-2 space-x-2 w-fit h-fit flex md:flex-wrap items-center">
            {questions.map((_, index) => (
              <li
                key={index}
                ref={(el) => (questionRefs.current[index] = el)}
                className={`p-2 w-12 md:w-12 border border-blue-900 h-12 flex items-center justify-center rounded-full md:rounded-xl cursor-pointer transition-all duration-300 ${
                  index === currentQuestionIndex
                    ? "bg-blue-500 text-white"
                    : selectedAnswers[index] !== undefined
                    ? "bg-green-200 text-gray-700"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => onSelectQuestion(index)}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </div>
       <div className="w-full text-right">
       <button
          onClick={onSubmitQuiz}
          className="flex-1 mt-3 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 "
        >
          Submit Quiz
        </button>
       </div>
      </div>
    </>
  );
};
