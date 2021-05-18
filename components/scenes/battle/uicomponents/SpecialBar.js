import React from "react";

export default function SpeedBar({ special }) {
  return (
    <div className="progress-container">
      <div
        className="progress-data"
        style={{
          width: `${special}%`,
          backgroundColor: "#DC2626",
          maxWidth: "100%",
        }}
      ></div>
    </div>
  );
}
