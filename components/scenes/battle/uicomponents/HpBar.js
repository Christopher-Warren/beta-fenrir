import React from "react";

export default function HpBar({ maxHP, curHP }) {
  const hpPercent = (curHP / maxHP) * 100;

  return (
    <div className="progress-container">
      <p
        style={{
          margin: "0",
          marginTop: "-1px",
          paddingTop: "0px",
          width: "100%",
          textAlign: "center",
          position: "absolute",
          zIndex: "10",
          color: "black",
        }}
      >
        HP: {curHP >= 0 ? curHP : 0}/{maxHP}
      </p>
      <div
        className="progress-data"
        style={{
          width: `${hpPercent > 0 ? hpPercent : 0}%`,
          minWidth: "0px",
          backgroundColor: "#059669",
          position: "relative",
        }}
      ></div>
    </div>
  );
}
