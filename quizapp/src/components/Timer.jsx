import React, { useEffect } from "react";

export const Timer = ({ timer, onTimeout, onSubmitQuiz }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        onTimeout(timer - 1);
      } else {
        // Auto submit when timer reaches 0
        onSubmitQuiz();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, onTimeout, onSubmitQuiz]);

  // Add warning classes when time is running low
  const getTimerClassName = () => {
    if (timer <= 30) return "text-red-600 animate-pulse";
    if (timer <= 60) return "text-orange-500";
    return "text-black";
  };

  return (
    <div className="fixed text-blue-950 z-[50] text-lg  md:text-2xl font-semibold p-1 px-8 rounded my-2 right-0 top-0">
      <p className="font-normal">
        Time remaining:{" "}
        <span className={`font-bold ${getTimerClassName()}`}>
          {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
          {timer % 60}
        </span>
      </p>
    </div>
  );
};

export default Timer;