import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Player from "./battle/Player";
import Enemies from "./battle/Enemies";
import useATB from "../utils/battle/useATB";

import usePrevious from "../utils/battle/usePrevious";

import toBoss from "../assets/images/mainscene/to-boss.png";

import ExpBar from "../scenes/battle/uicomponents/ExpBar";

export default function Battle({
  player,
  setPlayer,
  enemies,
  setEnemies,
  location,
}) {
  // Player logic

  const ATB = useATB({ players: [player], enemies: enemies });
  // need to send enemy and players to useATB
  // so most current state is accessable.
  const [target, setTarget] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const [battleStarted, setBattleStarted] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const prevLevel = usePrevious(player.level);

  const currentLevel = useRef(player.level);

  const experienceRef = useRef(null);

  const spriteSheetRefArr = useRef(null);
  const loadedSpriteSheetRefArr = useRef([]);

  if (spriteSheetRefArr.current === null) {
    let arr = [];
    arr.push(player.spriteSheet);

    enemies.forEach((enemy) => {
      arr.push(enemy.spriteSheet);
    });
    spriteSheetRefArr.current = arr;
  }
  console.log(player);
  const handleWin = async () => {
    if (location === "boss") {
      await axios.post("/api/stats/bossesKilled");
      // bug
      setPlayer((prevState) => {
        return {
          ...prevState,
          bossStage: (prevState.bossStage += 1),
        };
      });
    }
    await axios.post("/api/stats/battlesWon");

    setPlayer((player) => {
      return {
        ...player,
        inBattle: false,
        curHP: player.maxHP,
      };
    });
  };

  const handleLoss = async () => {
    await axios.post("/api/stats/deaths");

    const resetPoints = player.talentArr.map((talent) => {
      return { ...talent, points: 0 };
    });

    setPlayer((player) => {
      return {
        ...player,
        inBattle: false,
        level: player.level === 1 ? 1 : player.level - 1,
        talentArr: resetPoints,
      };
    });
  };

  useEffect(() => {
    if (loadedSpriteSheetRefArr.current.length === 0) {
      const mappedSprites = spriteSheetRefArr.current.map((sheet) => {
        const spriteSheet = new Image();
        spriteSheet.src = sheet;
        return spriteSheet;
      });
      //
      loadedSpriteSheetRefArr.current = mappedSprites;
      setLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (player.curHP <= 0) {
      ATB.setRunning(false);
      setShowResults(true);
    }

    if (enemies.every((enemy) => enemy.curHP <= 0)) {
      ATB.setRunning(false);
    }

    if (enemies.every(({ curHP }) => curHP <= 0)) {
      setShowResults(true);
    }

    //return () => console.log("unmounted");
  }, [ATB, enemies, player.curHP, player.inBattle, setPlayer]);

  // Handles adding experience to the
  // player after battle
  // bug
  useEffect(() => {
    if (showResults && player.curHP > 0) {
      if (location === "boss") {
        setPlayer((prevState) => {
          return {
            ...prevState,
            stage: (prevState.bossStage += 1),
          };
        });
      }
      experienceRef.current = 0;

      enemies.forEach((enemy) => {
        experienceRef.current += enemy.expYield;
      });

      setPlayer((prevState) => {
        return {
          ...prevState,
          experience: (prevState.experience += experienceRef.current),
        };
      });
    }

    if (showResults && player.curHP > 0) {
      if (location === "boss") {
        setPlayer((prevState) => {
          return {
            ...prevState,
            stage: (prevState.bossStage += 1),
          };
        });
      }
      experienceRef.current = 0;

      enemies.forEach((enemy) => {
        experienceRef.current += enemy.expYield;
      });

      setPlayer((prevState) => {
        return {
          ...prevState,
        };
      });
    }
  }, [enemies, location, player.curHP, setPlayer, showResults]);

  // Handles player leveling up
  useEffect(() => {
    if (player.experience >= player.experienceToLevel) {
      setPlayer((prevState) => {
        return { ...prevState, level: prevState.level + 1, experience: 0 };
      });
    }
  }, [player, setPlayer]);

  function startBattle() {
    ATB.setRunning(true);

    setBattleStarted(true);
  }

  function pauseBattle() {}

  function resetBattle() {
    ATB.reset();
  }

  const renderWin = () => {
    return (
      <div
        style={{
          position: "absolute",
          borderRadius: "5px",
          zIndex: "50",
          width: "90%",
          top: "5%",
          left: "5%",
          paddingBottom: "20px",
          paddingTop: "10px",
          backgroundColor: "#18191A",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1>Battle Won!</h1>

        {renderExperience()}
        <button
          className="to-boss-btn"
          onClick={() => handleWin()}
          style={{ position: "initial" }}
        >
          <img
            className="to-boss-img"
            style={{
              transform: "rotate(-90deg)",
              marginBottom: "-20px",
              position: "inherit",
              width: "auto",
            }}
            src={toBoss}
            alt="to main room"
          ></img>
          <h2>Main Room</h2>
        </button>
      </div>
    );
  };
  //
  const renderExperience = () => {
    // experience problem bug, player gaining experience after leveling
    if (player.level > currentLevel.current) {
      return (
        <div>
          <p>You leveled up!!</p>
          <p>You have earned a talent point.</p>
        </div>
      );
    }

    return (
      <div>
        <p>You earned {experienceRef.current} experience!</p>
        <p>
          {player.experienceToLevel - player.experience} experience needed to
          level.
        </p>
        <ExpBar player={player}></ExpBar>
      </div>
    );
  };

  const renderLoss = () => {
    return (
      <div
        style={{
          position: "absolute",
          borderRadius: "5px",
          zIndex: "50",
          width: "90%",
          top: "5%",
          left: "5%",
          paddingBottom: "20px",
          paddingTop: "10px",
          backgroundColor: "#18191A",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1>Defeated</h1>

        <p>
          A mysterous force has revived you, however, you feel weaker... and
          your talents have been reset
        </p>

        <button
          className="to-boss-btn"
          onClick={() => handleLoss()}
          style={{ position: "initial" }}
        >
          <img
            className="to-boss-img"
            style={{
              transform: "rotate(-90deg)",
              marginBottom: "-20px",
              position: "inherit",
              width: "auto",
            }}
            src={toBoss}
            alt="to main room"
          ></img>
          <h2>Main Room</h2>
        </button>
      </div>
    );
  };

  const renderBattle = () => {
    if (loaded) {
      return (
        <div
          style={{
            height: "100vh",
            position: "relative",
          }}
        >
          <div
            className="forest"
            style={{
              position: "absolute",
              width: "100%",
              height: "100vh",
            }}
          ></div>
          <div className="fade-in"></div>
          <div
            style={{
              display: "flex",

              justifyContent: "center",
            }}
          >
            <button
              className="start-game-btn"
              style={{
                bottom: "40%",
                display: battleStarted ? "none" : "false",
              }}
              onClick={() => startBattle()}
            >
              <h2>Start Battle</h2>
            </button>
          </div>
          {/* 
          
          DEV BUTTONS
          <button
            style={{ position: "relative" }}
            onClick={(e) => pauseBattle()}
          >
            Pause
          </button>
          <button
            style={{ position: "relative" }}
            onClick={() => resetBattle()}
          >
            Reset
          </button>
          <button
            style={{ position: "relative" }}
            onClick={() =>
              setPlayer((player) => {
                return { ...player, inBattle: false };
              })
            }
          >
            Escape Battle
          </button> */}
          {showResults && player.curHP > 0 && renderWin()}
          {showResults && player.curHP <= 0 && renderLoss()}

          <div
            className="battle-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Player
              player={player}
              setPlayer={setPlayer}
              enemies={enemies}
              setEnemies={setEnemies}
              target={target}
              ATB={ATB}
              spriteSheets={loadedSpriteSheetRefArr}
            />
            <Enemies
              player={player}
              setPlayer={setPlayer}
              enemies={enemies}
              setEnemies={setEnemies}
              ATB={ATB}
              target={target}
              setTarget={setTarget}
              spriteSheets={loadedSpriteSheetRefArr}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ backgroundColor: "black", height: "100vh" }}>Loading</div>
      );
    }
  };

  return renderBattle();
}
