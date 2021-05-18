import { useEffect } from "react";

import scaledEnemies from "./scaledEnemies";

import bosses from "../../assets/database/bosses";

export default function useGenerateBoss(
  groupOfEnemies,
  setBoss,
  inBattle,
  playerLevel,
  bossStage
) {
  useEffect(() => {
    if (inBattle) return;

    setBoss((prevState) => {
      const newState = [];
      for (let i = 4; i < 5; i++) {
        let n = Math.floor(Math.random() * 3) + 1;
        let randomGroup = [];

        randomGroup.push(
          scaledEnemies(playerLevel, bossStage)[
            Math.floor(Math.random() * bosses.length)
          ]
        );

        newState.push(randomGroup);
      }

      return newState;
    });

    return () => {};
  }, [inBattle, setBoss, bossStage]);
}
