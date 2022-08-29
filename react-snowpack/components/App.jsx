import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Battlefield from "./Battlefield.jsx";
import UserInterface from "./UserInterface.jsx";
import $ from "jquery";

const App = () => {
  let [player, setPlayer] = useState([]);
  let [boss, setBoss] = useState([]);
  let [chatBox, setChat] = useState([]);
  let [supportAlive, setSupportAlive] = useState(true);
  let [currentBoss, setCurrentBoss] = useState([]);

  //initializes player and boss.
  useEffect(() => {
    let player = {
      name: "Steiner",
      level: 1,
      maxHp: 10,
      hp: 10,
      attack: 10,
      power: 1,
      defense: 10,
      potions: 10,
    };

    setPlayer(player);

    let boss = {
      hp: 30,
      attack: 12,
      power: 2,
      defense: 10,
    };

    setBoss(boss);

    currentBoss = 1;
    setCurrentBoss(currentBoss);
  }, []);

  //runs once attack button is clicked
  //rolls information for attack/defense/damage
  //support action - > player attacks -> boss attacks.
  let attack = () => {
    let bossAtt = Math.floor(Math.random() * boss.attack);
    let bossDef = Math.floor(Math.random() * boss.defense);
    let bossPow = Math.floor(Math.random() * boss.power + 1);
    let playerAtt = Math.floor(Math.random() * player.attack);
    let playerDef = Math.floor(Math.random() * player.defense);
    let playerPow = Math.floor(Math.random() * player.power + 1);

    if (player.hp <= 0 || boss.hp <= 0) {
      let newChat = [...chatBox];
      newChat.push("Battle already over.");
      return setChat(newChat);
    }

    supportAction();
    playerAttack(playerAtt, bossDef, playerPow);

    if (boss.hp <= 0) {
      let imageUrl = "./assets/grave.png";
      $(".boss").css("background-image", "url(" + imageUrl + ")");
      chatBox.push("Boss died.");

      return playerLevelUp();
    }

    bossAttack(bossAtt, playerDef, bossPow);

    if (player.hp <= 0) {
      let imageUrl = "./assets/grave.png";
      let backgroundUrl = "./assets/gameover.jpg";

      $(".player").css("background-image", "url(" + imageUrl + ")");
      $(".main").css("background-image", "url(" + backgroundUrl + ")");
      return chatBox.push("Player died");
    }

    let newChat = [...chatBox];
    setChat(newChat);
  };

  //function for player attacking boss
  let playerAttack = (playerAtt, bossDef, playerPow) => {
    if (playerAtt > bossDef) {
      chatBox.push(`Player did ${playerPow} damage.`);

      boss.hp -= playerPow;
      let newBoss = { ...boss };

      setBoss(newBoss);

      $(".boss").css("content", "url(" + "../assets/playerAttack.gif" + ")");
      setTimeout(() => {
        $(".boss").css("content", "url(" + "" + ")");
      }, 500);
    } else {
      chatBox.push("Player missed.");
    }
  };

  //function for boss attacking player
  let bossAttack = (bossAtt, playerDef, bossPow) => {
    if (bossAtt > playerDef) {
      chatBox.push(`Boss did ${bossPow} damage.`);

      player.hp -= bossPow;
      if (player.hp < 0) {
        player.hp = 0;
      }
      let newPlayer = { ...player };

      setPlayer(newPlayer);
      $(".player").css("content", "url(" + "../assets/bossAttack.gif" + ")");
      setTimeout(() => {
        $(".player").css("content", "url(" + "" + ")");
      }, 500);
    } else {
      chatBox.push("Boss missed.");
    }

    let newChat = [...chatBox];
    setChat(newChat);
  };

  //increases player level by one
  let playerLevelUp = () => {
    let newPlayer = {
      name: player.name,
      level: player.level + 1,
      maxHp: player.maxHp + 5,
      hp: player.maxHp + 5,
      attack: player.attack + 2,
      power: player.power + 1,
      defense: player.defense + 2,
      potions: player.potions + 2,
    };
    chatBox.push("Player leveled up!");
    let newChat = [...chatBox];
    setChat(newChat);
    setPlayer(newPlayer);
  };

  //checks if player is ready for next boss (current one is dead)
  let newBoss = () => {
    if (boss.hp > 0) {
      chatBox.push("Please defeat the current boss first!");
      let newChat = [...chatBox];
      setChat(newChat);
      return false;
    } else {
      return true;
    }
  };

  //loads the next boss.
  let chooseBoss = (currentBoss) => {
    let newBoss = {};
    switch (currentBoss) {
      case 1:
        newBoss = {
          hp: 30,
          attack: 12,
          power: 2,
          defense: 10,
        };

        $(".boss")
          .css("background-image", "url(" + "./assets/boss1.png" + ")")
          .css("width", "150px")
          .css("height", "150px")
          .css("margin-top", "17%");
        $(".main").css(
          "background-image",
          "url(" + "./assets/background1.jpg" + ")"
        );

        setBoss(newBoss);

        break;

      case 2:
        newBoss = {
          hp: 35,
          attack: 15,
          power: 2,
          defense: 12,
        };

        $(".boss")
          .css("background-image", "url(" + "./assets/boss2.png" + ")")
          .css("width", "150px")
          .css("height", "150px")
          .css("margin-top", "17%");
        $(".main").css(
          "background-image",
          "url(" + "./assets/background2.jpg" + ")"
        );

        setBoss(newBoss);

        break;
      case 3:
        newBoss = {
          hp: 50,
          attack: 18,
          power: 3,
          defense: 12,
        };

        $(".boss")
          .css("background-image", "url(" + "./assets/boss3.png" + ")")
          .css("width", "150px")
          .css("height", "150px")
          .css("margin-top", "17%");

        $(".main").css(
          "background-image",
          "url(" + "./assets/background3.jpg" + ")"
        );

        setBoss(newBoss);

        break;
      case 4:
        newBoss = {
          hp: 50,
          attack: 20,
          power: 5,
          defense: 15,
        };

        $(".boss")
          .css("background-image", "url(" + "./assets/boss4.png" + ")")
          .css("width", "500px")
          .css("height", "500px")
          .css("margin-top", "10%");
        $(".main").css(
          "background-image",
          "url(" + "./assets/background4.jpg" + ")"
        );

        setBoss(newBoss);

        break;
      case 5:
        newBoss = {
          hp: 55,
          attack: 22,
          power: 6,
          defense: 16,
        };

        $(".boss")
          .css("background-image", "url(" + "./assets/boss5.png" + ")")
          .css("width", "150px")
          .css("height", "150px")
          .css("margin-top", "17%");
        $(".main").css(
          "background-image",
          "url(" + "./assets/background5.jpg" + ")"
        );

        setBoss(newBoss);

        break;
      case 6:
        newBoss = {
          hp: 60,
          attack: 23,
          power: 8,
          defense: 18,
        };

        $(".boss")
          .css("background-image", "url(" + "./assets/boss6.png" + ")")
          .css("width", "500px")
          .css("height", "500px")
          .css("margin-top", "10%");
        $(".main").css(
          "background-image",
          "url(" + "./assets/background6.jpg" + ")"
        );

        setBoss(newBoss);

        break;
      case 7:
        newBoss = {
          hp: 70,
          attack: 25,
          power: 8,
          defense: 20,
        };

        $(".boss")
          .css("background-image", "url(" + "./assets/boss7.png" + ")")
          .css("width", "150px")
          .css("height", "150px")
          .css("margin-top", "17%");
        $(".main").css(
          "background-image",
          "url(" + "./assets/background7.jpg" + ")"
        );

        setBoss(newBoss);

        break;
      case 8:
        newBoss = {
          hp: 75,
          attack: 25,
          power: 9,
          defense: 20,
        };

        $(".boss")
          .css("background-image", "url(" + "./assets/boss8.png" + ")")
          .css("width", "500px")
          .css("height", "500px")
          .css("margin-top", "10%");
        $(".main").css(
          "background-image",
          "url(" + "./assets/background8.jpg" + ")"
        );

        setBoss(newBoss);

        break;
      case 9:
        newBoss = {
          hp: 90,
          attack: 30,
          power: 10,
          defense: 20,
        };

        $(".boss")
          .css("background-image", "url(" + "./assets/boss9.png" + ")")
          .css("width", "150px")
          .css("height", "150px")
          .css("margin-top", "17%");
        $(".main").css(
          "background-image",
          "url(" + "./assets/background9.jpg" + ")"
        );

        setBoss(newBoss);

        break;
      case 10:
        newBoss = newBoss = {
          hp: 100,
          attack: 35,
          power: 15,
          defense: 30,
        };

        $(".boss")
          .css("background-image", "url(" + "./assets/boss10.png" + ")")
          .css("width", "500px")
          .css("height", "500px")
          .css("margin-top", "10%");
        $(".main").css(
          "background-image",
          "url(" + "./assets/background10.jpg" + ")"
        );

        setBoss(newBoss);

        break;

      default:
        chatBox.push("You already beat the game!");
        let newChat = [...chatBox];
        return setChat(newChat);
    }
  };

  //uses potion to heal player
  let usePotion = () => {
    if (player.potions > 0) {
      player.potions -= 1;
      player.hp = player.maxHp;
      let newPlayer = { ...player };
      setPlayer(newPlayer);

      let bossAtt = Math.floor(Math.random() * boss.attack);
      let playerDef = Math.floor(Math.random() * player.defense);
      let bossPow = Math.floor(Math.random() * boss.power + 1);

      chatBox.push("You used a potion.");
      let newChat = [...chatBox];
      setChat(newChat);

      supportAction();
      bossAttack(bossAtt, playerDef, bossPow);
    } else {
      chatBox.push("You don't have any potions.");
      let newChat = [...chatBox];
      setChat(newChat);
    }
  };

  //loads gif for support buff
  let supportbuff = () => {
    $(".support").css("content", "url(" + "../assets/supportBuff.gif" + ")");
    setTimeout(() => {
      $(".support").css("content", "url(" + "" + ")");
    }, 1000);
  };

  //determines if support does any action, if they're still alive.
  let supportAction = () => {
    if (supportAlive === true) {
      let sAction = Math.floor(Math.random() * 100);

      if (sAction < 1) {
        $(".support").css("content", "url(" + "../assets/bossAttack.gif" + ")");
        setTimeout(() => {
          $(".support").css("content", "url(" + "" + ")");
        }, 500);
        setSupportAlive(false);
        $(".support").css(
          "background-image",
          "url(" + "./assets/grave.png" + ")"
        );
        chatBox.push("Your support character died :( .");
      } else if (sAction < 4) {
        player.power += 1;
        supportbuff();
        chatBox.push("Your support character made you stronger!");
      } else if (sAction < 8) {
        player.attack += 1;
        supportbuff();
        chatBox.push("Your support character made you more accurate!");
      } else if (sAction < 13) {
        player.defense += 1;
        supportbuff();
        chatBox.push("Your support character increased your defense!");
      } else if (sAction < 17) {
        player.hp = player.maxHp;
        supportbuff();
        chatBox.push("Your support character healed you!");
      } else if (sAction < 20) {
        player.potions += 1;
        chatBox.push("Your support character gave you a potion!");
      }
    } else {
      $(".support").css(
        "background-image",
        "url(" + "./assets/grave.png" + ")"
      );
    }

    let newChat = [...chatBox];
    setChat(newChat);
  };

  //loads player from database.
  let loadPlayer = () => {
    let playerToLoad = prompt("Please enter the name to load");

    $.get(`http://localhost:3000/api/load/${playerToLoad}`, (data) => {
      if (data.length === 0) {
        alert("No player found!");
      } else {
        let reloadPlayer = JSON.parse(data[0].player);
        reloadPlayer.name = data[0].name;
        let reloadBoss = Number(data[0].boss);
        let reloadSupport = data[0].support;

        setPlayer(reloadPlayer);
        setSupportAlive(reloadSupport);
        chooseBoss(reloadBoss);
        setCurrentBoss(reloadBoss);
        $(".player").css(
          "background-image",
          "url(" + "./assets/player.png" + ")"
        );
      }
    });
  };

  return (
    <>
      <Header />

      <UserInterface
        player={player}
        attack={attack}
        newBoss={newBoss}
        chooseBoss={chooseBoss}
        usePotion={usePotion}
        loadPlayer={loadPlayer}
        supportAlive={supportAlive}
        currentBoss={currentBoss}
        setCurrentBoss={setCurrentBoss}
      />

      <Battlefield />

      <Footer chatBox={chatBox} />
    </>
  );
};

export default App;
