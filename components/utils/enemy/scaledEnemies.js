// Imports
import enemyStatFormulas from "../formulas/enemyStatFormulas";
import getEnemies from "./getEnemies";

/** 
  @param playerLevel {number} The current level of the player.
 
  @returns {Array.<object>} Array of objects containing ALL enemies, with their stats scaled to the player.
  **/
function scaledEnemies(playerLevel, bossStage) {
  const mappedEnemies = getEnemies(playerLevel, bossStage).map((enemy) => {
    // this is where stats will differ based off enemy type/name

    return {
      ...enemy,
      expYield: enemyStatFormulas.calcExpYield(enemy.level),
      maxHP: enemyStatFormulas.calcMaxHP(enemy.level),
      curHP: enemyStatFormulas.calcMaxHP(enemy.level),
      armor: enemyStatFormulas.calcArmor(enemy.level),
      spirit: enemyStatFormulas.calcSpirit(enemy.level),
      mana: 50,
      attack: enemyStatFormulas.calcAttack(enemy.level),
      spellpower: enemyStatFormulas.calcSpellpower(enemy.level),
      speed: enemyStatFormulas.calcSpeed(enemy.level),
    };
  });

  return mappedEnemies;
}

export default scaledEnemies;
