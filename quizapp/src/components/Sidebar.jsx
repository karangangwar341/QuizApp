import React, { useEffect, useRef, useState } from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, answeredCount, totalQuestions }) => {
  if (!isOpen) return null;

  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="fixed text-black inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Modal content */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Confirm Quiz Submission</h3>
          <div className="mb-4">
            {unansweredCount > 0 ? (
              <p className="text-amber-600">
                Warning: You have {unansweredCount} unanswered {unansweredCount === 1 ? 'question' : 'questions'}.
              </p>
            ) : (
              <p className="text-green-600">
                You have answered all questions!
              </p>
            )}
            <p className="mt-2 text-gray-600">
              Are you sure you want to submit your quiz?
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export const Sidebar = ({
  questions,
  currentQuestionIndex,
  selectedAnswers,
  onSelectQuestion,
  onSubmitQuiz,
}) => {
  const questionRefs = useRef([]);
  const visitedQuestionsRef = useRef(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    visitedQuestionsRef.current.add(currentQuestionIndex);

    if (questionRefs.current[currentQuestionIndex]) {
      questionRefs.current[currentQuestionIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentQuestionIndex]);

  const handleSubmitClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    setIsModalOpen(false);
    onSubmitQuiz();
  };

  return (
    <>
      <div
        style={{
          overflowY: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
        className="flex-col no-scrollbar w-full md:h-screen border-2 md:w-1/3 lg:w-1/4 bg-white bg-opacity-90 backdrop-blur-sm p-5 overflow-hidden shadow-md rounded-lg animate-slide-in-left"
      >
        <h2 className="flex-1 text-lg font-bold mb-4 text-gray-700">Questions</h2>
        <div className="flex-1 overflow-auto md:h-[82vh]">
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
                    : visitedQuestionsRef.current.has(index)
                    ? "bg-pink-200 text-gray-700"
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
            onClick={handleSubmitClick}
            className="flex-1 mt-3 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit Quiz
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        answeredCount={Object.keys(selectedAnswers).length}
        totalQuestions={questions.length}
      />
    </>
  );
};

export default Sidebar;