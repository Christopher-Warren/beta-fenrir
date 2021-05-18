// Imports
import enemyStatFormulas from "../formulas/enemyStatFormulas";
import getEnemies from "./getEnemies";

/** 
  @param playerLevel {number} The current level of the player.
 
  @returns {Array.<object>} Array of objects containing ALL enemies, with their stats scaled to the player.
  **/
function scaledEnemies(playerLevel, bossStage, isBoss) {
  const mappedEnemies = getEnemies(playerLevel, bossStage).map((enemy) => {
    // this is where stats will differ based off enemy type/name

    return {
      ...enemy,
      expYield: enemyStatFormulas.calcExpYield(enemy.level, isBoss),
      maxHP: enemyStatFormulas.calcMaxHP(enemy.level, isBoss),
      curHP: enemyStatFormulas.calcMaxHP(enemy.level, isBoss),
      armor: enemyStatFormulas.calcArmor(enemy.level, isBoss),
      spirit: enemyStatFormulas.calcSpirit(enemy.level, isBoss),
      mana: 50,
      attack: enemyStatFormulas.calcAttack(enemy.level, isBoss),
      spellpower: enemyStatFormulas.calcSpellpower(enemy.level, isBoss),
      speed: enemyStatFormulas.calcSpeed(enemy.level, isBoss),
    };
  });

  return mappedEnemies;
}

export default scaledEnemies;
