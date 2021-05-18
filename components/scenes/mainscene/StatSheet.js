import React, { useState } from "react";

import ExpBar from "../battle/uicomponents/ExpBar";
import backIcon from "../../assets/images/mainscene/to-boss.png";

import Player from "../battle/Player";

const StatSheet = ({ player, ATB }) => {
  const [showStatSheet, setShowStatSheet] = useState(false);

  const renderStatSheet = () => {
    return (
      <div className="stat-sheet">
        <button
          className="back-btn"
          onClick={(e) => setShowStatSheet(!showStatSheet)}
        >
          <img src={backIcon} className="back-icon" alt="back"></img>
          <p className="back-text">Back</p>
        </button>

        <div className="text-center">
          <h1>Character</h1>
          <div className="img-wrapper">
            <h2 className="stat-item">Name: {player.name}</h2>
            <h2 className="stat-item">Level: {player.level}</h2>
            <h2 className="stat-item">
              Class:{" "}
              {player.playerClass.charAt(0).toUpperCase() +
                player.playerClass.slice(1)}
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                src={player.classImg}
                className="select-class-img"
                alt="Choose Class"
              ></img>
            </div>
          </div>

          <h2 className="stat-item">HP: {player.maxHP}</h2>
          <h2 className="stat-item">Armor: {player.armor}</h2>
          <h2 className="stat-item">Spirit: {player.spirit}</h2>
          <h2 className="stat-item">Physical Attack: {player.attack}</h2>
          <h2 className="stat-item">Spellpower: {player.spellpower}</h2>
          <h2 className="stat-item">Speed: {player.speed}</h2>
          <h2 className="stat-item">Experience: {player.experience}</h2>
          <h2 className="stat-item">
            Experience till level: {player.experienceToLevel}
          </h2>
        </div>
      </div>
    );
  };

  return (
    <div>
      {showStatSheet && renderStatSheet()}

      <button
        className="stat-sheet-btn"
        onClick={(e) => setShowStatSheet(!showStatSheet)}
      >
        <p className="talent-tree-text">Character</p>
        <img
          src="ui/character.png"
          className="ability-icon"
          alt="basic attack"
        ></img>
      </button>
      {showStatSheet && renderStatSheet()}
    </div>
  );
};

export default StatSheet;
