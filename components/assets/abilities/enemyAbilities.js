export const enemyAbilities = [
  {
    name: "Attack",
    description: "description",
    damage: "damage",
    use: (player, enemy, setPlayer, setEnemy) => {
      setPlayer((prevState) => {
        const damage = Math.round(enemy.attack * Math.random() * 1);

        const special = 25;

        return {
          ...prevState,
          curHP: prevState.curHP - damage,
          special: prevState.special + special,
          damage: damage,
        };
      });
    },
  },
  {
    name: "Heavy Swing",
    description: "description",
    damage: "damage",
    use: (player, enemy, setPlayer, setEnemy) => {
      setPlayer((prevState) => {
        const damage = Math.round(enemy.attack * Math.random() * 2);

        const special = 50;

        return {
          ...prevState,
          curHP: prevState.curHP - damage,
          special: prevState.special + special,
          damage: damage,
        };
      });
    },
  },
];
