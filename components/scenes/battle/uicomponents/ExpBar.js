import React from "react";

export default function ExpBar({ player }) {
  const expPercent = player.experience / player.experienceToLevel;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="progress-container" style={{ width: "50%" }}>
        <p
          style={{
            margin: "0",
            paddingTop: "0px",
            width: "100%",
            textAlign: "center",
            position: "absolute",
            zIndex: "10",
            color: "black",
          }}
        >
          Experience: {player.experience}/{player.experienceToLevel}
        </p>
        <div
          className="progress-data"
          style={{
            width: `${expPercent === Infinity ? 0 : expPercent * 100}%`,
            maxWidth: "100%",

            backgroundColor: "#2563EB",
            position: "relative",
          }}
        ></div>
      </div>
    </div>
  );
}
