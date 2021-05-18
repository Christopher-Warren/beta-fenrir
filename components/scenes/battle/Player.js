import React, { useEffect, useState, useRef } from "react";

import usePrevious from "../../utils/battle/usePrevious";

import HpBar from "./uicomponents/HpBar";
import SpeedBar from "./uicomponents/SpeedBar";

import SpecialBar from "./uicomponents/SpecialBar";

export default function Player({
  player,
  setPlayer,
  enemies,
  setEnemies,
  target,
  ATB,
  spriteSheets,
}) {
  const canvasRef = useRef(null);

  const [idle, setIdle] = useState(true);
  const [damageTaken, setDamageTaken] = useState(false);
  const [dead, setDead] = useState(false);
  const [attacking, setAttacking] = useState(false);

  const spriteInterval = useRef();

  const prevHP = usePrevious(player.curHP);

  const currentAttack = useRef();

  //
  //  Attack System
  //

  function handleAttack(e, ability) {
    e.preventDefault();
    setPlayer((prevState) => {
      return { ...prevState, active: false };
    });
    currentAttack.current = ability;
    setAttacking(true);

    //ATB.endTurn("players", 0);
    //ability.use(player, enemies, target, setEnemies);
  }

  const mappedAbilities = player.abilities.map((ability, index) => {
    if (index === 1) {
      const isActive = () => {
        if (player.special > 100 && ATB.players[0].active && !damageTaken) {
          return false;
        } else {
          return true;
        }
      };

      return (
        <button
          disabled={isActive()}
          onClick={(e) => handleAttack(e, ability)}
          key={index}
          className="ability"
          style={
            isActive() ? { filter: "grayscale(1)" } : { filter: "grayscale(0)" }
          }
        >
          <img
            src={player.specialIcon}
            className="ability-icon"
            alt="basic attack"
          ></img>
        </button>
      );
    }

    return (
      <button
        disabled={!ATB.players[0].active || damageTaken}
        onClick={(e) => handleAttack(e, ability)}
        key={index}
        className="ability"
        style={
          !ATB.players[0].active
            ? { filter: "grayscale(1)" }
            : { filter: "grayscale(0)" }
        }
      >
        <img
          src={player.basicIcon}
          className="ability-icon"
          alt="basic attack"
        ></img>
      </button>
    );
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const sprite = spriteSheets.current[0];

    function getFrame(frameNum) {
      const rowCount = player.sheetWidth / player.spriteWidth;
      const y = Math.floor((frameNum - 1) / rowCount);

      const row = (player.spriteWidth * (frameNum - 1)) % player.sheetWidth;
      const col = (player.spriteHeight * y) % player.sheetHeight;

      return [row, col, frameNum];
    }

    const {
      frames: {
        idleStart,
        idleEnd,
        attackStart,
        attackEnd,
        hurtStart,
        hurtEnd,
        dieStart,
        dieEnd,
      },
    } = player;

    const width = player.spriteWidth;
    const height = player.spriteHeight;

    if (attacking) {
      let currentFrame = attackStart;
      context.clearRect(0, 0, width, height);
      context.drawImage(sprite, 0, 0, width, height, 0, 0, width, height);
      spriteInterval.current = setInterval(() => {
        const frame = getFrame(currentFrame);
        if (frame[2] === attackEnd) {
          setAttacking(false);
          currentAttack.current.use(player, setPlayer, target, setEnemies);
          ATB.endTurn("players", 0);
        }

        context.clearRect(0, 0, width, height);
        context.drawImage(
          sprite,
          frame[0],
          frame[1],
          width,
          height,
          0,
          0,
          width,
          height
        );

        currentFrame += 1;
      }, 80);
    }

    if (idle && !attacking) {
      let currentFrame = idleStart;
      context.clearRect(0, 0, width, height);
      context.drawImage(sprite, 0, 0, width, height, 0, 0, width, height);

      spriteInterval.current = setInterval(() => {
        const frame = getFrame(currentFrame);
        if (frame[2] === idleEnd) currentFrame = idleStart;

        context.clearRect(0, 0, width, height);
        context.drawImage(
          sprite,
          frame[0],
          frame[1],
          width,
          height,
          0,
          0,
          width,
          height
        );

        currentFrame += 1;
      }, 80);
    } else if (damageTaken && !dead) {
      let currentFrame = hurtStart;
      context.clearRect(0, 0, width, height);
      context.drawImage(sprite, 0, 0, width, height, 0, 0, width, height);
      spriteInterval.current = setInterval(() => {
        const frame = getFrame(currentFrame);
        if (frame[2] === hurtEnd) {
          setDamageTaken(false);
          setIdle(true);
        }

        context.clearRect(0, 0, width, height);
        context.drawImage(
          sprite,
          frame[0],
          frame[1],
          width,
          height,
          0,
          0,
          width,
          height
        );

        currentFrame += 1;
      }, 150);
    } else if (dead) {
      let currentFrame = dieStart;
      context.clearRect(0, 0, width, height);
      context.drawImage(sprite, 0, 0, width, height, 0, 0, width, height);
      spriteInterval.current = setInterval(() => {
        const frame = getFrame(currentFrame);
        if (frame[2] === dieEnd) return;

        context.clearRect(0, 0, width, height);
        context.drawImage(
          sprite,
          frame[0],
          frame[1],
          width,
          height,
          0,
          0,
          width,
          height
        );

        currentFrame += 1;
      }, 80);
    }

    return () => clearInterval(spriteInterval.current);
  }, [idle, spriteSheets, damageTaken, dead, attacking, setAttacking]);

  useEffect(() => {
    if (player.curHP <= 0) {
      setDead(true);
      setIdle(false);
      setDamageTaken(false);
    }
    if (player.curHP < prevHP) {
      setIdle(false);
      setDamageTaken(true);
    }
  }, [player.curHP, player.maxHP, prevHP]);

  return (
    <div className="player-container">
      <div className="player-wrapper">
        <div className="player-card">
          <p style={{ margin: "0", width: "100%", textAlign: "center" }}>
            {player.name}
          </p>

          <p
            style={{
              margin: "1px 0px",
              width: "100%",
              textAlign: "center",
              paddingBottom: "5px",
            }}
          >
            Level {player.level}
          </p>
          <HpBar curHP={player.curHP} maxHP={player.maxHP} />
          <SpecialBar special={player.special} />
          <SpeedBar progress={ATB.players[0].progress} />
          {damageTaken && !dead && (
            <p className="damage" style={{ position: "absolute", right: "0" }}>
              {player.damage}
            </p>
          )}
        </div>
      </div>
      <canvas
        width={player.spriteWidth}
        height={player.spriteHeight}
        className={`player-${player.playerClass}`}
        ref={canvasRef}
      ></canvas>
      {/* Player Ability Bar */}
      <div className="ability-container">{mappedAbilities}</div>
    </div>
  );
}
