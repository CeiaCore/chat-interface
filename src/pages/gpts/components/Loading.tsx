import React, { useState, useEffect } from "react";
import { GooSpinner } from "react-spinners-kit";

const Loading = () => {
  const [progress, setProgress] = useState(345); // Full strokeDashoffset value

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - 34.5 : 0)); // Decrease by 10% each second
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        height: "80vh",
        position: "relative",
      }}
    >
      {/* Progress Circle */}
      <svg
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        }}
        width="200"
        height="200"
        viewBox="0 0 120 120"
      >
        <circle
          cx="60"
          cy="60"
          r="55"
          stroke="#333"
          strokeWidth="2"
          fill="none"
          strokeDasharray="345"
          strokeDashoffset={progress}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
      </svg>
      {/* Goo Spinner */}
      Salvando
      <GooSpinner size={20} color="#333" />
    </div>
  );
};

export default Loading;
