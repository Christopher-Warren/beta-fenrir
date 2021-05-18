import React, { useEffect, useRef, useState } from "react";
import statFormulas from "../formulas/playerStatFormulas";
import usePrevious from "../battle/usePrevious";

export default function useCreatePlayer() {
  const [createPlayer, setCreatePlayer] = useState({});
  const firstUpdate = useRef(true);
  const firstUpdateTalent = useRef(true);
  // @TODO: Add modifiers for player class.

  const prevLevel = usePrevious(createPlayer.level);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;

      return;
    }

    setCreatePlayer((prevState) => {
      return {
        ...prevState,
        experienceToLevel: statFormulas.calcExpToLevel(prevState.level),
        experience: 0,
        maxHP: statFormulas.calcMaxHP(
          prevState.level,
          prevState.playerClass,
          prevState.talentArr
        ),
        curHP: statFormulas.calcMaxHP(
          prevState.level,
          prevState.playerClass,
          prevState.talentArr
        ),
        maxMP: statFormulas.calcMaxMP(prevState.level, prevState.playerClass),
        curMP: statFormulas.calcCurMP(prevState.level, prevState.playerClass),
        armor: statFormulas.calcArmor(prevState.level, prevState.playerClass),
        spirit: statFormulas.calcSpirit(prevState.level, prevState.playerClass),
        attack: statFormulas.calcAttack(
          prevState.level,
          prevState.playerClass,
          prevState.talentArr
        ),
        spellpower: statFormulas.calcSpellpower(
          prevState.level,
          prevState.playerClass,
          prevState.talentArr
        ),
        speed: statFormulas.calcSpeed(
          prevState.level,
          prevState.playerClass,
          prevState.talentArr
        ),
      };
    });
  }, [createPlayer.level, createPlayer.talentArr]);

  useEffect(() => {
    if (firstUpdateTalent.current) {
      firstUpdateTalent.current = false;

      return;
    }

    if (createPlayer.level > prevLevel) {
      setCreatePlayer((prevState) => {
        return {
          ...prevState,
          talentPoints: prevState.talentPoints + 1,
        };
      });
    } else if (createPlayer.level < prevLevel) {
      console.log("less");
      setCreatePlayer((prevState) => {
        return {
          ...prevState,
          talentPoints: prevState.level,
        };
      });
    } else {
      setCreatePlayer((prevState) => {
        return {
          ...prevState,
          talentPoints: prevState.level,
        };
      });
    }
  }, [createPlayer.level]);

  return [createPlayer, setCreatePlayer];
}
