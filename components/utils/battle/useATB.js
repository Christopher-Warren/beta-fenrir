import { useEffect, useRef, useState } from "react";

export default function useATB(combatants) {
  const [combatantProgress, setCombatantProgress] = useState(init);

  const [running, setRunning] = useState(false);
  const interval = useRef(0);

  function init() {
    const combatantArray = combatants.players
      .concat(combatants.enemies)
      .map((player, index) => {
        return {
          id: index,
          progress: 0,
          speed: player.speed,
          active: false,
        };
      });

    return combatantArray;
  }

  function reset() {
    setCombatantProgress((prevState) => {
      const newState = prevState.map((i) => {
        return { ...i, progress: 0, active: false };
      });
      return newState;
    });
  }

  function endTurn(team, combatant, animTime) {
    if (team === "players") {
      setCombatantProgress((prevState) => {
        const newState = prevState.map((data, index) => {
          if (index === combatant) {
            return { ...data, progress: 0, active: false };
          }

          return { ...data };
        });

        return newState;
      });
    }

    if (team === "enemies") {
      setCombatantProgress((prevState) => {
        const newState = prevState.map((data, index) => {
          if (index === combatant + combatants.players.length && data.active) {
            return { ...data, progress: 0, active: false };
          }
          return { ...data };
        });

        return newState;
      });
    }

    setRunning(true);
  }

  // CHANGE SPEED IF SPEED IS THE SAME
  // useEffect(() => {
  //   const speedArr = combatantProgress.map((combatant) => combatant.speed);
  //   // console.log(
  //   //   combatantProgress.every((object, i, arr) => object.speed === arr[0].speed)
  //   // );
  //   console.log("speed changed effect");
  //   if (
  //     combatantProgress.every(
  //       (object, val, arr) => object.speed === arr[0].speed
  //     )
  //   ) {
  //     console.log("SPEED CHANGED");
  //     speedArr.forEach((combatantSpeed, index, arr) => {
  //       if (
  //         arr.includes(
  //           combatantSpeed,
  //           index === arr.length - 1 ? index : index + 1
  //         )
  //       ) {
  //         setCombatantProgress((prevState) => {
  //           const newState = prevState.map((combatant, i) => {
  //             if (index === i) {
  //               return {
  //                 ...combatant,
  //                 speed: combatant.speed + Math.ceil(Math.random() * 10) + i++,
  //               };
  //             } else {
  //               return combatant;
  //             }
  //           });
  //           return newState;
  //         });
  //       } else {
  //       }
  //     });
  //   }
  // }, []);

  useEffect(() => {
    interval.current && clearInterval(interval.current);

    if (running) {
      interval.current = setInterval(() => {
        setCombatantProgress((prevState) => {
          const newState = prevState.map((combatant, index, array) => {
            const calcSpeed = combatant.speed / 10;

            if (combatant.progress >= 100) {
              return { ...combatant, active: true };
            }

            // Stops updating state if any combatant progress is >= 100
            if (array.some((combatant) => combatant.progress >= 100)) {
              setRunning(false);
              return { ...combatant };
            }

            return { ...combatant, progress: combatant.progress + calcSpeed };
          });

          return newState;
        });
      }, 14);
    }
    return () => {
      // console.log(`Interval ${interval.current} cleared ${running}`);
      clearInterval(interval.current);
    };
  }, [running]);

  const players = combatantProgress.slice(0, combatants.players.length);
  const enemies = combatantProgress.slice(combatants.players.length);
  const newShape = {
    enemies: enemies,
    players: players,
    setRunning: setRunning,
    reset,
    endTurn,
    setCombatantProgress,
  };

  return newShape;
}
