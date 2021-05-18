import { useEffect } from "react";

import scaledEnemies from "./scaledEnemies";

export default function useGenerateEnemyGroup(
  groupOfEnemies,
  setGroupOfEnemies,
  inBattle,
  playerLevel
) {
  useEffect(() => {
    if (inBattle) return;

    setGroupOfEnemies((prevState) => {
      const newState = [];
      for (let i = 0; i < 5; i++) {
        let n = Math.floor(Math.random() * 3) + 1;
        let randomGroup = [];
        for (let i = 0; i < n; i++) {
          randomGroup.push(
            scaledEnemies(playerLevel)[
              Math.floor(Math.random() * scaledEnemies().length)
            ]
          );
        }

        newState.push(randomGroup);
      }

      return newState;
    });

    return () => {};
    // if rerenders become an issue look here
  }, [inBattle, setGroupOfEnemies]);
}
