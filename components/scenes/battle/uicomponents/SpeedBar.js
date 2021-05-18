import React from "react";

export default function SpeedBar({ progress }) {
  return (
    <div className="progress-container">
      <div
        className="progress-data"
        style={{ width: `${progress}%`, maxWidth: "100%" }}
      ></div>
    </div>
  );
}
