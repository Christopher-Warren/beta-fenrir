import React, { useEffect, useRef, useState } from "react";
import usePrevious from "../../utils/battle/usePrevious";
import HpBar from "./uicomponents/HpBar";
import SpeedBar from "./uicomponents/SpeedBar";

export default function Enemy({
  player,
  setPlayer,
  enemies,
  setEnemies,
  ATB,
  target,
  setTarget,
  spriteSheets,
}) {
  const timerRef = useRef([]);

  const canvasRef = useRef([]);
  const spriteInterval = useRef([]);
  const spriteInterval2 = useRef([]);

  // Animation State
  const [idle, setIdle] = useState(() => {
    return enemies.map(() => true);
  });
  const [damageTaken, setDamageTaken] = useState(() => {
    return enemies.map(() => false);
  });
  const [die, setDie] = useState(() => {
    return enemies.map(() => false);
  });
  const [dead, setDead] = useState(() => {
    return enemies.map(() => false);
  });

  const [attacking, setAttacking] = useState(() => {
    return enemies.map(() => false);
  });

  const prevEnemiesHP = usePrevious(enemies.map((enemy) => enemy.curHP));

  useEffect(() => {
    enemies.forEach((enemy, index) => {
      const canvas = canvasRef.current[index];
      const context = canvas.getContext("2d");

      const sprite = spriteSheets.current[index + 1];

      const width = enemy.spriteWidth;
      const height = enemy.spriteHeight;

      const {
        frames: { dieStart, dieEnd },
      } = enemy;

      function getFrame(frameNum) {
        const rowCount = enemy.sheetWidth / enemy.spriteWidth;
        const y = Math.floor((frameNum - 1) / rowCount);

        const row = (enemy.spriteWidth * (frameNum - 1)) % enemy.sheetWidth;
        const col = (enemy.spriteHeight * y) % enemy.sheetHeight;

        return [row, col, frameNum];
      }

      if (die[index] && !dead[index]) {
        let currentFrame = dieStart;

        spriteInterval2.current[index] = setInterval(() => {
          const frame = getFrame(currentFrame);
          if (frame[2] === dieEnd) {
            setDead((prev) => {
              return prev.map((state, stateIndex) => {
                if (index === stateIndex) {
                  return true;
                } else {
                  return state;
                }
              });
            });
          }
          context.clearRect(0, 0, width, height);
          context.drawImage(
            sprite,
            frame[0],
            frame[1],
            width,
            height,
            0,
            0,
            width,
            height
          );

          currentFrame += 1;
        }, 200);
      }
    });
    function clearAllIntervals() {
      spriteInterval2.current.forEach((interval) => {
        clearInterval(interval);
      });
    }

    return () => clearAllIntervals();
  }, [die, dead]);

  useEffect(() => {
    enemies.forEach((enemy, index) => {
      const canvas = canvasRef.current[index];
      const context = canvas.getContext("2d");

      const sprite = spriteSheets.current[index + 1];

      const width = enemy.spriteWidth;
      const height = enemy.spriteHeight;

      const {
        frames: {
          idleStart,
          idleEnd,
          attackStart,
          attackEnd,
          hurtStart,
          hurtEnd,
        },
      } = enemy;

      //if (dead[index]) return;

      function getFrame(frameNum) {
        const rowCount = enemy.sheetWidth / enemy.spriteWidth;
        const y = Math.floor((frameNum - 1) / rowCount);

        const row = (enemy.spriteWidth * (frameNum - 1)) % enemy.sheetWidth;
        const col = (enemy.spriteHeight * y) % enemy.sheetHeight;

        return [row, col, frameNum];
      }

      if (attacking[index] && !damageTaken[index] && !dead[index]) {
        let currentFrame = attackStart;
        if (player.curHP <= 0) return;

        if (attacking.includes(true, index + 1)) return;

        spriteInterval.current[index] = setInterval(() => {
          const frame = getFrame(currentFrame);

          if (frame[2] === attackEnd) {
            enemies[index].abilities[0].use(
              player,
              enemies[index],
              setPlayer,
              setEnemies
            );
            ATB.endTurn("enemies", index);
            setAttacking((prev) => {
              return prev.map((state, stateIndex) => {
                if (index === stateIndex) {
                  return false;
                } else {
                  return state;
                }
              });
            });

            setIdle((prev) => {
              return prev.map((state, stateIndex) => {
                if (index === stateIndex) {
                  return true;
                } else {
                  return state;
                }
              });
            });
          }

          context.clearRect(0, 0, width, height);
          context.drawImage(
            sprite,
            frame[0],
            frame[1],
            width,
            height,
            0,
            0,
            width,
            height
          );

          currentFrame += 1;
        }, 100);
      } else if (idle[index]) {
        context.clearRect(0, 0, width, height);
        context.drawImage(sprite, 0, 0, width, height, 0, 0, width, height);

        let currentFrame = idleStart;

        spriteInterval.current[index] = setInterval(() => {
          const frame = getFrame(currentFrame);

          if (frame[2] === idleEnd) currentFrame = idleStart - 1;

          context.clearRect(0, 0, width, height);
          context.drawImage(
            sprite,
            frame[0],
            frame[1],
            width,
            height,
            0,
            0,
            width,
            height
          );

          currentFrame += 1;
        }, 170);
      } else if (damageTaken[index] && !die[index]) {
        let currentFrame = hurtStart;

        spriteInterval.current[index] = setInterval(() => {
          let frame = getFrame(currentFrame);
          if (frame[2] === hurtEnd) {
            setIdle((prev) => {
              return prev.map((state, stateIndex) => {
                if (index === stateIndex) {
                  return true;
                } else {
                  return state;
                }
              });
            });
            setDamageTaken((prev) =>
              prev.map((state, stateIndex) => {
                if (index === stateIndex) return false;
                return state;
              })
            );
          }

          context.clearRect(0, 0, width, height);
          context.drawImage(
            sprite,
            frame[0],
            frame[1],
            width,
            height,
            0,
            0,
            width,
            height
          );
          currentFrame += 1;
        }, 100);
      }
    });

    function clearAllIntervals() {
      spriteInterval.current.forEach((interval) => {
        clearInterval(interval);
      });
    }

    return () => clearAllIntervals();
  }, [attacking, damageTaken, dead, die, enemies, idle, spriteSheets]);

  useEffect(() => {
    enemies.forEach((enemy, index) => {
      if (enemy.curHP <= 0 && !die[index]) {
        setDie((prevState) => {
          const mappedDamage = prevState.map((state, stateIndex) => {
            if (stateIndex === index) {
              return true;
            }
            return state;
          });
          return mappedDamage;
        });
        setIdle((prevState) => {
          const mappedDamage = prevState.map((state, stateIndex) => {
            if (stateIndex === index) {
              return false;
            }
            return state;
          });
          return mappedDamage;
        });
        setDamageTaken((prevState) => {
          const mappedDamage = prevState.map((state, stateIndex) => {
            if (stateIndex === index) {
              return false;
            }
            return state;
          });
          return mappedDamage;
        });
      }

      if (enemy.curHP !== prevEnemiesHP[index]) {
        setIdle((prevState) => {
          const mappedDamage = prevState.map((state, stateIndex) => {
            if (stateIndex === index) {
              return false;
            }
            return state;
          });
          return mappedDamage;
        });

        setDamageTaken((prevState) => {
          const mappedDamage = prevState.map((state, stateIndex) => {
            if (stateIndex === index) {
              return true;
            }
            return state;
          });
          return mappedDamage;
        });
      }
    });
  }, [die, enemies, prevEnemiesHP]);

  useEffect(() => {
    const timerArr = timerRef.current;

    if (player.curHP <= 0) return;
    ATB.enemies.forEach((combatant, index) => {
      if (ATB.players[0].active) {
        // console.log("waiting on player to attack...");
        return;
      }

      if (combatant.active && enemies[index].curHP > 0) {
        timerArr[index] = setTimeout(() => {
          // console.log("You took damage");
          if (attacking.includes(true)) {
            return;
          }
          setIdle((prevState) => {
            const mappedDamage = prevState.map((state, stateIndex) => {
              if (stateIndex === index) {
                return false;
              }
              return state;
            });
            return mappedDamage;
          });

          setAttacking((prev) => {
            return prev.map((state, stateIndex) => {
              if (index === stateIndex) {
                return true;
              } else {
                return state;
              }
            });
          });

          // ATB.endTurn("enemies", index);
        }, 1);
      } else if (combatant.active && enemies[index].curHP <= 0) {
        ATB.endTurn("enemies", index);
        // console.log("do not end turn for dead enemy");
      }
    });
    return () => {
      timerArr.forEach((timer) => clearTimeout(timer));
    };
  }, [ATB, attacking, enemies, player, setEnemies, setPlayer]);

  const renderEnemies = () => {
    return enemies.map((enemy, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            if (enemy.curHP > 0) {
              setTarget(index);
            }
          }}
          style={{
            position: "relative",
          }}
        >
          <svg
            className={target === index ? "crosshair" : "hide"}
            width="60px"
            height="60px"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#000"
              d="M247 32v23.21C143.25 59.8 59.798 143.25 55.21 247H32v18h23.21C59.8 368.75 143.25 452.202 247 456.79V480h18v-23.21C368.75 452.2 452.202 368.75 456.79 265H480v-18h-23.21C452.2 143.25 368.75 59.798 265 55.21V32h-18zm0 41.223V128h18V73.223C359 77.76 434.24 153 438.777 247H384v18h54.777C434.24 359 359 434.24 265 438.777V384h-18v54.777C153 434.24 77.76 359 73.223 265H128v-18H73.223C77.76 153 153 77.76 247 73.223zM247 224v23h-23v18h23v23h18v-23h23v-18h-23v-23h-18z"
            />
          </svg>

          <div className="enemy-hp-card">
            <p
              className="player-card"
              style={{
                width: "100%",
                textAlign: "center",
                paddingBottom: "5px",
              }}
            >
              {enemy.name} <br /> Level {enemy.level}
            </p>

            <HpBar curHP={enemy.curHP} maxHP={enemy.maxHP} />
            <SpeedBar
              progress={enemy.curHP > 0 ? ATB.enemies[index].progress : 0}
            />
          </div>

          {damageTaken[index] && !dead[index] && (
            <p className="damage" style={{ position: "absolute" }}>
              {enemy.damage}
            </p>
          )}

          <canvas
            className={enemy.name.toLowerCase().replace(" ", "")}
            style={{ position: "relative", zIndex: "0" }}
            width={enemy.spriteWidth}
            height={enemy.spriteHeight}
            ref={(element) => canvasRef.current.push(element)}
          ></canvas>
        </div>
      );
    });
  };

  return (
    <div
      className="enemy-battle-container"
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap-reverse",
        alignContent: "space-between",
      }}
    >
      {renderEnemies()}
    </div>
  );
}
