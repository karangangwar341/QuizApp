import React, { useEffect } from "react";

export const Timer = ({ timer, onTimeout }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        onTimeout(timer - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, onTimeout]);

  return (
    <div className="fixed z-[50] text-xl md:text-2xl text-black font-semibold p-1 px-8 rounded my-2 right-0 top-0">
      <p className="font-normal">
        Time remaining:{" "}
        <span className={`timer ${timer <= 60 ? "low-time" : ""}`}>
          {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
          {timer % 60}
        </span>
      </p>
    </div>
  );
};
