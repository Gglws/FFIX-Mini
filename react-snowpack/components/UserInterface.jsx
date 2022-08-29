import React, { useState } from "react";
import { useEffect } from "react";
import $ from "jquery";

//{player, attack}
const UserInterface = ({
  player,
  attack,
  newBoss,
  usePotion,
  chooseBoss,
  loadPlayer,
  supportAlive,
  currentBoss,
  setCurrentBoss,
}) => {
  const changeCurrentBoss = () => {
    let readyForNext = true;

    readyForNext = newBoss();

    console.log(readyForNext);
    if (readyForNext) {
      let nextBoss = currentBoss + 1;

      setCurrentBoss(nextBoss);

      chooseBoss(nextBoss);
    }
  };

  let newPlayer = () => {
    let playerName = prompt("Please enter a name for your player");

    let sendData = {
      name: playerName,
      player: player,
      boss: currentBoss,
      support: supportAlive,
    };

    $.ajax({
      type: "post",
      url: `http://localhost:3000/api/new`,
      data: JSON.stringify(sendData),
      contentType: "application/json",
      statusCode: {
        400: function () {
          alert("Player name taken!");
        },
        201: function () {
          alert("Player successfully created!");

          player.name = playerName;
        },
      },
    });
  };

  let savePlayer = () => {
    let playerName = player.name;

    if (player.name === "Steiner") {
      return alert("Please select new player first.");
    }

    let sendData = {
      player: player,
      boss: currentBoss,
      support: supportAlive,
    };

    $.ajax({
      type: "patch",
      url: `http://localhost:3000/api/save/${playerName}`,
      data: JSON.stringify(sendData),
      contentType: "application/json",
      statusCode: {
        400: function () {
          alert("Save failed.");
        },
        200: function () {
          alert("Save successful!");
        },
      },
    });
  };

  let restart = () => {
    location.reload();
  };

  return (
    <div className="userInterface">
      <div className="dataButtonsContainer">
        <button onClick={newPlayer} className="dataButtons">
          New Player
        </button>
        <button onClick={loadPlayer} className="dataButtons">
          Load Player
        </button>
        <button onClick={savePlayer} className="dataButtons">
          Save Player
        </button>
        <button onClick={restart} className="dataButtons">
          Restart
        </button>
      </div>
      <div className="charInfoContainer">
        <div className="charInfo">Name: {player.name}</div>
        <div className="charInfo">Level: {player.level}</div>
        <div className="charInfo">
          Health: {player.hp}/{player.maxHp}
        </div>
        <div className="charInfo">Attack: {player.attack}</div>
        <div className="charInfo">Strength: {player.power}</div>
        <div className="charInfo">Defense: {player.defense}</div>
        <div className="charInfo">Potions: {player.potions}</div>
      </div>
      <div className="battleButtonsContainer">
        <button className="battleButtons" onClick={attack}>
          Attack
        </button>
        <button className="battleButtons" onClick={usePotion}>
          Use Potion
        </button>
        <button className="battleButtons" onClick={changeCurrentBoss}>
          Next Boss
        </button>
      </div>
    </div>
  );
};

export default UserInterface;
