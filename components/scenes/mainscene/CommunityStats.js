import React, { useEffect, useState } from "react";
import axios from "axios";

import backIcon from "../../assets/images/mainscene/to-boss.png";

const StatSheet = ({ player, ATB }) => {
  const [showStatSheet, setShowStatSheet] = useState(false);

  const [stats, setStats] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      const { data } = await axios.get("/api/stats");

      setStats(data.data);
      return data;
    };

    getStats();
  }, []);

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
          <h1>Community Stats</h1>
          <p>
            Below is a list of stats collected from users that have played this
            game.
          </p>
          <h2 className="stat-item">
            Total Characters Created: {stats.charactersCreated}
          </h2>
          <h2 className="stat-item">Total Battles Won: {stats.battlesWon}</h2>
          <h2 className="stat-item">
            Total Bosses Killed: {stats.bossesKilled}
          </h2>
          <h2 className="stat-item">Total Deaths: {stats.deaths}</h2>
        </div>
      </div>
    );
  };

  return (
    <div>
      {showStatSheet && renderStatSheet()}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="stats-btn"
          onClick={(e) => setShowStatSheet(!showStatSheet)}
        >
          <p className="talent-tree-text">
            Community
            <br /> Stats
          </p>
          <img
            src="ui/communitystats.png"
            className="ability-icon"
            alt="basic attack"
          ></img>
        </button>
        {showStatSheet && renderStatSheet()}
      </div>
    </div>
  );
};

export default StatSheet;
