import React, { useEffect, useState } from "react";

// Enemy generation logic
import useGenerateEnemyGroup from "../utils/enemy/useGenerateEnemyGroup";
import useGenerateBoss from "../utils/enemy/useGenerateBoss";

// Backgrounds
import background from "../assets/images/mainscene/background.png";
import backgroundBoss from "../assets/images/mainscene/backgroundBoss.png";

// Scene art
import obelisk from "../assets/images/mainscene/obelisk.gif";
import bossImg from "../assets/images/mainscene/bossImg.gif";
import toBoss from "../assets/images/mainscene/to-boss.png";

// Battle scene
import Battle from "./Battle";

// Stat sheet
import StatSheet from "./mainscene/StatSheet";
import TalentTree from "./mainscene/TalentTree";
import CommunityStats from "./mainscene/CommunityStats";

export default function MainScene({ player, setPlayer }) {
  const [enemies, setEnemies] = useState([]);

  const [groupOfEnemies, setGroupOfEnemies] = useState([]);
  const [boss, setBoss] = useState([]);

  const [location, setLocation] = useState("main");

  useGenerateEnemyGroup(
    groupOfEnemies,
    setGroupOfEnemies,
    player.inBattle,
    player.level
  );

  useGenerateBoss(
    groupOfEnemies,
    setBoss,
    player.inBattle,
    player.level,
    player.bossStage
  );

  const startBattle = (e, group) => {
    e.preventDefault();

    setPlayer((prevState) => {
      return { ...prevState, inBattle: true };
    });

    setEnemies(group);
  };

  const renderEventButtons = () => {
    const mappedEnemies = groupOfEnemies.map((group, index, arr) => {
      const added = group.reduce((a, b) => a + b.level, 0);

      return (
        <button
          key={index}
          className="obelisk-button"
          style={{ textAlign: "center" }}
        >
          <img
            className="obelisk"
            key={index}
            src={obelisk}
            alt="obelisk"
            onClick={(e) => startBattle(e, group)}
          />
          {/* <h2>
            Enemies:
            <br /> {group.length}
          </h2> */}
          <h2>
            Difficulty:
            <br />{" "}
            {Math.round(
              (Math.round((added / group.length) * 10) * group.length) /
                player.level
            )}
          </h2>
        </button>
      );
    });

    return mappedEnemies;
  };

  const renderMainScene = () => {
    if (!player.inBattle) {
      if (location === "main") {
        return (
          <div className="map-container">
            <img
              alt="Main Background"
              className="main-room-image"
              style={{
                objectPosition: "50% 60%",
              }}
              src={background}
            ></img>

            <div className="to-boss-container">
              <button
                className="to-boss-btn"
                onClick={(e) => {
                  setLocation("boss");
                }}
              >
                <img
                  className="to-boss-img"
                  src={toBoss}
                  alt="to boss room"
                ></img>
                <h1>Boss Room</h1>
              </button>
            </div>

            <div className="enemy-btn-container">
              <div className="enemy-btns">{renderEventButtons()}</div>
            </div>

            <StatSheet player={player} />
            <CommunityStats player={player} />

            <TalentTree player={player} setPlayer={setPlayer} />
          </div>
        );
      } else if (location === "boss") {
        return (
          <div className="map-container">
            <img
              alt="Main Background"
              className="main-room-image"
              style={{
                objectPosition: "50% 100%",
              }}
              src={backgroundBoss}
            ></img>

            <div className="to-boss-container">
              <button
                style={{ top: "0", left: "5%" }}
                className="to-boss-btn"
                onClick={(e) => {
                  setLocation("main");
                }}
              >
                <img
                  className="to-main-img"
                  src={toBoss}
                  alt="to main room"
                ></img>
                <h1>Main Room</h1>
              </button>
            </div>

            <div className="boss-btn-container">
              <div className="enemy-btns" style={{ width: "auto" }}>
                <button
                  className="obelisk-button"
                  style={{ textAlign: "center" }}
                >
                  <img
                    className="obelisk"
                    src={bossImg}
                    alt="obelisk"
                    onClick={(e) => startBattle(e, boss[0])}
                    style={{ marginBottom: "-50px" }}
                  />
                  <h2>Boss</h2>
                  <h2>Level: {boss[0][0].level}</h2>
                </button>
              </div>
            </div>
          </div>
        );
      }
    } else if (player.inBattle) {
      return (
        <Battle
          player={player}
          setPlayer={setPlayer}
          enemies={enemies}
          setEnemies={setEnemies}
          location={location}
        />
      );
    }
  };

  return renderMainScene();
}
