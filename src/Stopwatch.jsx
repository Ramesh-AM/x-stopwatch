import { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0); // total seconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const minutes = Math.floor(time / 60);
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div className="stopwatch-container">
      <h1>Stopwatch</h1>
      <h2>
        Time: {minutes}:{seconds}
      </h2>

      <div>
        <button onClick={handleStartStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}