/**
 *
 * @param {number} level
 * @returns
 */
function expToLevelFormula(level) {
  return Math.round(Math.floor(100 * Math.pow(level, 1.5) * 1.5));
}

function hpFormula(level, base, multiplier, talentMultiplier) {
  const hp = Math.floor(base + Math.pow(level, 2) * multiplier);

  const talentOne = talentMultiplier[0].points * 0.05;
  const talentTwo = talentMultiplier[3].points * 0.1;
  const talentThree = talentMultiplier[6].points * 0.2;

  const addedHP = talentOne * hp + talentTwo * hp + talentThree * hp;

  const finalHP = Math.round(addedHP + hp);

  return finalHP;
}

function mpFormula(level, base, multiplier) {
  return Math.round(Math.floor(base + Math.pow(level, 1.5) * multiplier));
}

function attackFormula(level, base, multiplier, talentMultiplier) {
  const attack = Math.round(
    Math.floor(base + Math.pow(level, 1.5) * multiplier)
  );

  const talentOne = talentMultiplier[1].points * 0.05;
  const talentTwo = talentMultiplier[4].points * 0.1;
  const talentThree = talentMultiplier[7].points * 0.2;

  const addedAttack =
    talentOne * attack + talentTwo * attack + talentThree * attack;

  const finalAttack = Math.round(addedAttack + attack);

  return finalAttack;
}

function speedFormula(level, base, multiplier, talentMultiplier) {
  const speed = level * multiplier + 10;

  const talentOne = talentMultiplier[1].points * 0.05;
  const talentTwo = talentMultiplier[4].points * 0.1;
  const talentThree = talentMultiplier[7].points * 0.2;

  const addedSpeed =
    talentOne * speed + talentTwo * speed + talentThree * speed;

  const finalSpeed = Math.ceil(addedSpeed + speed);

  return finalSpeed;
}

function spellpowerFormula(level, base, multiplier, talentMultiplier) {
  const spellpower = Math.round(
    Math.floor(base + Math.pow(level, 1.5) * multiplier)
  );

  const talentOne = talentMultiplier[1].points * 0.05;
  const talentTwo = talentMultiplier[4].points * 0.1;
  const talentThree = talentMultiplier[7].points * 0.2;

  const addedSpellpower =
    talentOne * spellpower + talentTwo * spellpower + talentThree * spellpower;

  const finalSpellpower = Math.round(addedSpellpower + spellpower);

  return finalSpellpower;
}

function armorFormula(level, base, multiplier) {
  return Math.round(Math.floor(base + Math.pow(level, 1.5) * multiplier * 0.5));
}

function spiritFormula(level, base, multiplier) {
  return Math.round(Math.floor(base + Math.pow(level, 1.5) * multiplier * 0.5));
}

const statFormulas = {
  calcExpToLevel(level) {
    return expToLevelFormula(level);
  },

  calcMaxHP(level, playerClass, talentMultiplier) {
    if (talentMultiplier === undefined) {
      return;
    }

    switch (playerClass) {
      case "warrior":
        return hpFormula(level, 150, 1.5, talentMultiplier);

      case "rogue":
        return hpFormula(level, 100, 1, talentMultiplier);

      default:
        return hpFormula(level, 100, 1, talentMultiplier);
    }
  },

  calcMaxMP(level, playerClass) {
    switch (playerClass) {
      case "warrior":
        return mpFormula(level, 50, 1);

      case "rogue":
        return mpFormula(level, 100, 1);

      default:
        return mpFormula(level, 100, 1.5);
    }
  },
  calcCurMP(level, playerClass) {
    switch (playerClass) {
      case "warrior":
        return mpFormula(level, 50, 1);

      case "rogue":
        return mpFormula(level, 100, 1);

      default:
        return mpFormula(level, 100, 1.5);
    }
  },

  calcAttack(level, playerClass, talentMultiplier) {
    if (talentMultiplier === undefined) {
      return;
    }
    switch (playerClass) {
      case "warrior":
        return attackFormula(level, 20, 1.5, talentMultiplier);

      case "rogue":
        return attackFormula(level, 10, 1.25, talentMultiplier);

      default:
        return attackFormula(level, 10, 1, talentMultiplier);
    }
  },
  calcSpeed(level, playerClass, talentMultiplier) {
    if (talentMultiplier === undefined) {
      return;
    }
    switch (playerClass) {
      case "warrior":
        return speedFormula(level, 10, 1.5, talentMultiplier);

      case "rogue":
        return speedFormula(level, 10, 1.7, talentMultiplier);

      default:
        return speedFormula(level, 10, 1.5, talentMultiplier);
    }
  },

  calcSpellpower(level, playerClass, talentMultiplier) {
    if (talentMultiplier === undefined) {
      return;
    }
    switch (playerClass) {
      case "mage":
        return spellpowerFormula(level, 20, 1.5, talentMultiplier);

      default:
        return spellpowerFormula(level, 10, 1, talentMultiplier);
    }
  },

  calcArmor(level, playerClass) {
    switch (playerClass) {
      case "warrior":
        return armorFormula(level, 20, 1.5);

      case "rogue":
        return armorFormula(level, 10, 1.25);

      default:
        return armorFormula(level, 10, 1);
    }
  },

  calcSpirit(level, playerClass) {
    switch (playerClass) {
      case "warrior":
        return spiritFormula(level, 20, 1.5);

      case "rogue":
        return spiritFormula(level, 10, 1.25);

      default:
        return spiritFormula(level, 10, 1);
    }
  },
};

export default statFormulas;
