import React, { useState } from 'react'
import MainScene from './MainScene'
import useCreatePlayer from '../utils/player/useCreatePlayer'

import axios from 'axios'

import background from '../assets/images/mainscene/background.png'

import warriorImg from '../assets/images/select/warrior_select.png'
import rogueImg from '../assets/images/select/rogue_select.png'
import mageImg from '../assets/images/select/mage_select.png'

import {
  CreateWarrior,
  CreateRogue,
  CreateMage,
} from '../utils/player/playerClassOptions'

export default function CharacterSelect() {
  const [player, setPlayer] = useCreatePlayer({})
  const [name, setName] = useState('')
  const [disabled, setDisabled] = useState(false)

  const [modal, setModal] = useState(true)

  async function handleClassSelection(classSelection) {
    if (name === '') {
      setDisabled(true)
      return
    }

    await axios.post('/api/stats/charactersCreated')

    if (classSelection === 'warrior') {
      setPlayer(CreateWarrior)
      setPlayer((prev) => {
        return { ...prev, name: name }
      })
    } else if (classSelection === 'rogue') {
      setPlayer(CreateRogue)
      setPlayer((prev) => {
        return { ...prev, name: name }
      })
    } else if (classSelection === 'mage') {
      setPlayer(CreateMage)
      setPlayer((prev) => {
        return { ...prev, name: name }
      })
    }
  }

  function renderCharacterSelect() {
    if (modal) {
      return (
        <div className="map-container">
          {/* <button
              onClick={() => {
                setPlayer({
                  ...player,
                  level: player.level + 1,
                });
              }}
            >
              Level Up!
            </button> */}

          <div className="creation-container">
            <h1 className="select-class-h1">Info</h1>
            <p className="select-class-p">
              You start by selecting one of three classes. Warrior, Rogue, or a
              Mage. Each class has their own unique special attack.
            </p>
            <p className="select-class-p">
              Groups of enemies are randomly generated, scaled to the player.
              You can fight these enemies by clicking, or tapping, on one of the
              blue obelisks.
            </p>
            <p className="select-class-p">
              Once you get enough experience, you can fight the boss, located in
              the "Boss Room." Bosses start at level 10. Each time they are
              defeated, a new boss is generated 10 levels higher.
            </p>

            <p className="select-class-p">
              You are given a talent point for each level, which can be used via
              "Talent Tree." Be sure to use these talent points!
            </p>

            <div className="start-container">
              <div
                style={{
                  display: 'flex',

                  justifyContent: 'center',
                }}
              >
                <button
                  className="start-game-btn"
                  style={{ bottom: '100px' }}
                  onClick={() => setModal(false)}
                >
                  <h2>Create Class</h2>
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="map-container">
        <img
          alt="Main Background"
          className="main-room-image"
          style={{ objectPosition: '50% 60%' }}
          src={background.src}
        />

        <div className="creation-container">
          <h1 className="select-class-h1">Select Class</h1>
          {/* <p className="select-class-p">
            Tips: Groups of enemies are randomly generated, scaled to the
            player.
            <br /> Fight groups of enemies via the "Main Room", then test your
            mettle by fighting the boss which resides in the "Boss Room"
          </p> */}
          <div className="button-container">
            <div className="img-wrapper">
              <img
                src={warriorImg.src}
                className="select-class-img"
                alt="Choose Class"
              ></img>
              <button
                className="creation-btn"
                disabled={disabled}
                onClick={() => handleClassSelection('warrior')}
              >
                <h1>Warrior</h1>
              </button>
            </div>
            <div className="img-wrapper">
              <img
                src={rogueImg.src}
                disabled={disabled}
                className="select-class-img"
                alt="Choose Class"
              ></img>
              <button
                className="creation-btn"
                disabled={disabled}
                onClick={() => handleClassSelection('rogue')}
              >
                <h1>Rogue</h1>
              </button>
            </div>

            <div className="img-wrapper">
              <img
                src={mageImg.src}
                className="select-class-img"
                alt="Choose Class"
              ></img>
              <button
                className="creation-btn"
                disabled={disabled}
                onClick={() => handleClassSelection('mage')}
              >
                <h1>Mage</h1>
              </button>
            </div>
            <div
              style={{
                position: 'absolute',
                zIndex: '30',
                top: '-80px',
              }}
            >
              <label
                className="name-label"
                htmlFor="name"
                style={{ display: 'block' }}
              >
                Character Name
              </label>
              <input
                id="name"
                className="name-input"
                value={name}
                style={{ display: 'block' }}
                onChange={(e) => {
                  setDisabled(false)
                  setName(e.target.value)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
  //loadMain()
  const playerLoaded = Object.keys(player).length > 0

  function loadMain() {
    return <MainScene player={player} setPlayer={setPlayer}></MainScene>
  }
  return <div>{playerLoaded ? loadMain() : renderCharacterSelect()}</div>
}
