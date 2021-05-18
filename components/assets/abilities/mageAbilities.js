export const mageAbilities = [
  {
    name: "Basic Attack",
    description: "description",
    damage: "damage",
    /**
     *
     * @param {object} player
     * @param {array} enemy
     * @param {number} target
     * @param {function} setEnemies
     *
     * @desc Calculates damage based of player and enemy stats and sets state.
     */
    use: (player, setPlayer, target, setEnemies) => {
      setEnemies((prevState) => {
        return prevState.map((enemy, index) => {
          if (target === index) {
            const damage = Math.round(
              player.spellpower -
                (enemy.armor / 10) * Math.floor(Math.random() * 3 + 1)
            );

            return {
              ...enemy,
              curHP: enemy.curHP - damage,
              damage: damage,
            };
          } else {
            return { ...enemy };
          }
        });
      });

      setPlayer((prevState) => {
        const special = 15;
        const talentOne = prevState.talentArr[2].points * 0.05;
        const talentTwo = prevState.talentArr[5].points * 0.1;
        const talentThree = prevState.talentArr[8].points * 0.2;

        const addedSpecial =
          talentOne * special + talentTwo * special + talentThree * special;

        const finalSpecial = addedSpecial + special;

        return { ...prevState, special: prevState.special + finalSpecial };
      });
    },
  },
  {
    name: "Firestorm",
    description: "description",
    damage: "damage",
    use: (player, setPlayer, target, setEnemies) => {
      setEnemies((prevState) => {
        return prevState.map((enemy, index) => {
          const damage = Math.round(
            player.spellpower * 1.3 -
              (enemy.armor / 10) * Math.floor(Math.random() * 3 + 1)
          );

          return {
            ...enemy,
            curHP: enemy.curHP - damage,
            damage: damage,
          };
        });
      });
      setPlayer((prevState) => {
        return { ...prevState, special: 0 };
      });
    },
  },
];

// player.abilities.fire.use(target, player, enemy)
