import enemies from "../../assets/database/enemies";
import bosses from "../../assets/database/bosses";
/**
 *
 * @param {number} playerLevel
 * @returns {[{object}]} An array of enemies with randomly generated level based of player level.
 */

function getEnemies(playerLevel, bossStage) {
  /**
   * @param playerLevel {number} The current level of the player
   * @returns {number} A random number 3-0 below playerLevel or 3-0 above
   */
  function randomLevel(playerLevel) {
    let enemyLevel = playerLevel;
    if (Math.floor(Math.random() * 2) === 0) {
      if (playerLevel <= 3)
        enemyLevel -= Math.floor(Math.random() * playerLevel);
      if (playerLevel >= 4) enemyLevel -= Math.floor(Math.random() * 4);
    } else {
      enemyLevel += Math.floor(Math.random() * 4);
    }
    return enemyLevel;
  }

  const mappedEnemies = enemies.map((enemy) => {
    return { ...enemy, level: randomLevel(playerLevel) };
  });

  const mappedBosses = bosses.map((boss) => {
    return { ...boss, level: bossStage * 10 };
  });

  if (bossStage) {
    return mappedBosses;
  } else {
    return mappedEnemies;
  }
}
export default getEnemies;
