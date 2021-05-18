/**
 *
 * @param {number} level
 * @returns
 */

function expYieldFormula(level) {
  //                           V change
  return Math.round(Math.floor(10 * Math.pow(level, 1.5) * 1.5));
}

function hpFormula(level, base, multiplier) {
  return Math.round(Math.floor(base + Math.pow(level, 2) * multiplier));
}

function mpFormula(level, base, multiplier) {
  return Math.round(Math.floor(base + Math.pow(level, 1.5) * multiplier));
}

function attackFormula(level, base, multiplier) {
  return Math.round(Math.floor(base + Math.pow(level, 1.5) * multiplier));
}

function speedFormula(level, multiplier) {
  return level * multiplier + 9;
}

function armorFormula(level, base, multiplier) {
  return Math.round(Math.floor(base + Math.pow(level, 1.5) * multiplier * 0.5));
}

function spiritFormula(level, base, multiplier) {
  return Math.round(Math.floor(base + Math.pow(level, 1.5) * multiplier * 0.5));
}

const statFormulas = {
  calcExpYield(level) {
    return expYieldFormula(level);
  },
  calcMaxHP(level) {
    return hpFormula(level, 50, 1);
  },
  calcAttack(level) {
    return attackFormula(level, 20, 1);
  },
  calcSpellpower(level) {
    return attackFormula(level, 20, 1);
  },
  calcArmor(level) {
    return armorFormula(level, 10, 1);
  },
  calcSpirit(level) {
    return spiritFormula(level, 10, 1);
  },
  calcSpeed(level) {
    return speedFormula(level, 1.5);
  },
};

export default statFormulas;
