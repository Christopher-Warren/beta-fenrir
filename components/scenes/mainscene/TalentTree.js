import React, { useState } from "react";
import backIcon from "../../assets/images/mainscene/to-boss.png";

const TalentTree = ({ player, setPlayer }) => {
  const [showTalentTree, setShowTalentTree] = useState(false);

  function getTalentButtons(start, end) {
    const mappedTalentButtons = player.talentArr.map(
      (talent, buttonIndex, arr) => {
        if (buttonIndex >= start && buttonIndex <= end) {
          const firstRowPoints = arr[0].points + arr[1].points + arr[2].points;
          const secondRowPoints = arr[3].points + arr[4].points + arr[5].points;

          const isAvailible = () => {
            if (start === 3 && firstRowPoints >= 5) {
              return false;
            } else if (start === 6 && secondRowPoints >= 5) {
              return false;
            } else if (start === 0) {
              return false;
            } else {
              return true;
            }
          };

          return (
            <div key={buttonIndex}>
              <button
                className="talent-tree-item-btn"
                key={buttonIndex}
                disabled={isAvailible()}
                style={
                  isAvailible()
                    ? {
                        filter:
                          "brightness(0.1) sepia(1) saturate(10000%) contrast(.85)",
                      }
                    : {}
                }
                onClick={(e) => {
                  if (player.talentPoints > 0 && talent.points < talent.max) {
                    const mappedTalent = player.talentArr.map((prev, index) => {
                      if (index === buttonIndex && prev.points < prev.max) {
                        return { ...prev, points: prev.points + 1 };
                      } else {
                        return { ...prev };
                      }
                    });

                    setPlayer((prevState) => {
                      return {
                        ...prevState,
                        talentPoints: prevState.talentPoints - 1,
                        talentArr: mappedTalent,
                      };
                    });
                  }
                }}
              >
                <img
                  src={talent.icon}
                  alt={talent.name}
                  className="talent-icon"
                ></img>
                <p
                  style={{
                    width: "120px",
                    marginLeft: "-33px",
                  }}
                >
                  {player.talentArr[buttonIndex].name}
                  <br />
                  {talent.points}/{talent.max}
                </p>
              </button>
            </div>
          );
        } else {
          return null;
        }
      }
    );
    return mappedTalentButtons;
  }

  const renderTalentTree = () => {
    return (
      <div className="talent-tree">
        <button
          className="back-btn"
          onClick={(e) => setShowTalentTree(!showTalentTree)}
        >
          <img src={backIcon} className="back-icon" alt="back"></img>
          <p className="back-text">Back</p>
        </button>
        {/* Talent Tree */}
        <h1>Talent Points: {player.talentPoints}</h1>
        <button
          onClick={(e) => {
            const mappedTalent = player.talentArr.map((prev, index) => {
              return { ...prev, points: 0 };
            });

            setPlayer((prev) => {
              return {
                ...prev,
                talentPoints: prev.level,
                talentArr: mappedTalent,
              };
            });
          }}
        >
          Reset
        </button>

        <div className="talent-tree-container">
          <div className="talent-tree-row">{getTalentButtons(0, 2)}</div>

          <div className="talent-tree-row">{getTalentButtons(3, 5)}</div>

          <div className="talent-tree-row">{getTalentButtons(6, 8)}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <button
        className="talent-tree-btn"
        onClick={(e) => setShowTalentTree(!showTalentTree)}
      >
        <p className="talent-tree-text">Talent Tree</p>
        <img
          src="ui/talenttree.png"
          className="ability-icon"
          alt="basic attack"
        ></img>
      </button>
      {showTalentTree && renderTalentTree()}
    </div>
  );
};

export default TalentTree;
