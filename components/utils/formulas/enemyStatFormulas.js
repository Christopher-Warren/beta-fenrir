/**
 *
 * @param {number} level
 * @returns
 */

function expYieldFormula(level) {
  //                           V change
  return Math.round(Math.floor(10 * Math.pow(level, 1.5) * 4));
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
  calcExpYield(level, boss) {
    let multiplier;
    if (boss) {
      multiplier = 4;
    } else {
      multiplier = 1;
    }

    return expYieldFormula(level * multiplier);
  },
  calcMaxHP(level, boss) {
    let multiplier;
    if (boss) {
      multiplier = 4;
    } else {
      multiplier = 1;
    }
    return hpFormula(level, 50, multiplier);
  },
  calcAttack(level, boss) {
    let multiplier;
    if (boss) {
      multiplier = 4;
    } else {
      multiplier = 1;
    }
    return attackFormula(level, 20, multiplier);
  },
  calcSpellpower(level, boss) {
    let multiplier;
    if (boss) {
      multiplier = 4;
    } else {
      multiplier = 1;
    }
    return attackFormula(level, 20, multiplier);
  },
  calcArmor(level, boss) {
    let multiplier;
    if (boss) {
      multiplier = 4;
    } else {
      multiplier = 1;
    }
    return armorFormula(level, 10, multiplier);
  },
  calcSpirit(level, boss) {
    let multiplier;
    if (boss) {
      multiplier = 4;
    } else {
      multiplier = 1;
    }
    return spiritFormula(level, 10, multiplier);
  },
  calcSpeed(level, boss) {
    let multiplier;
    if (boss) {
      multiplier = 4;
    } else {
      multiplier = 1;
    }
    return speedFormula(level, 1.5);
  },
};

export default statFormulas;
