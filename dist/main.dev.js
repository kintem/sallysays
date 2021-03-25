"use strict";

var body = document.querySelector("body");
var start = document.querySelector(".start");
var startButtonEasy = document.querySelector("#easy");
var startButtonHard = document.querySelector("#hard");
var game = document.querySelector(".game");
var boxContainer = document.querySelector(".box-container");
var gameOverHeading = document.querySelector(".game-over-heading");
var heading = document.querySelector(".game-header__heading");
var text = document.querySelector(".game-header__text");
var message = document.querySelector(".game-header__message");
var messages = ["", "", "good job!", "nice", "ooh someone's a pro!", "is this distracting?", "damn daniel", "impressive", "getting harder now ain't it?", "ooft", "HOW ARE YOU STILL GOING", "i'm bored now", "bye"];
var array = [1, 2, 3, 4, 5, 6];
var shuffled = [];
var easyArray = array.slice(0, 4);
var sallysInputs = [];
var userInputs = [];
var level = 0;
var mode = ""; //generates a "flash" on the chosen box

var generateFlash = function generateFlash(num) {
  document.getElementById("".concat(num)).classList.add("flash");
  setTimeout(function () {
    document.getElementById("".concat(num)).classList.remove("flash");
  }, 200);
}; //generates new sally input


var sallySays = function sallySays(boxNum) {
  var sallysNewInput = Math.ceil(Math.random() * boxNum);
  sallysInputs.push(sallysNewInput);
  generateFlash(sallysNewInput);
  level++;
  text.innerHTML = "Level: ".concat(level);

  if (level > 2) {
    message.innerHTML = "".concat(messages[level]);
  }
}; //shuffle array 


var shuffleBoxes = function shuffleBoxes() {
  shuffled = array.sort(function () {
    return Math.random() - 0.5;
  });
  boxContainer.innerHTML = "";
  renderBoxes(shuffled);
}; // compares users input with sallys input (at same index?)
// if all correct and array lengths are the same, call sallySays() and reset user array to an empty array, if incorrect - game over


var checkUserInput = function checkUserInput(mode) {
  var index = userInputs.length - 1;

  if (userInputs[index] != sallysInputs[index]) {
    gameOver();
  } else if (userInputs[index] === sallysInputs[index] && userInputs.length === sallysInputs.length) {
    userInputs = [];
    setTimeout(function () {
      if (mode === "easy") {
        sallySays(4);
      } else {
        shuffleBoxes();
        setTimeout(function () {
          sallySays(6);
        }, 800);
      }
    }, 800);
  }
};

var gameOver = function gameOver() {
  level = 0;
  userInputs = [];
  sallysInputs = []; //styling

  gameOverHeading.style.display = "block";
  heading.classList.add("game-over");
  game.classList.add("game-over");
  document.querySelectorAll(".box-container__box").forEach(function (box) {
    box.classList.add("game-over");
  }); //call start screen or restart screen

  setTimeout(function () {
    start.style.display = "flex";
    game.style.display = "none";
    boxContainer.classList.remove("hard", "easy");
  }, 3000);
};

var detectUserInput = function detectUserInput(input, mode) {
  userInputs.push(input);
  generateFlash(input);
  checkUserInput(mode);
};

function renderBoxes(array) {
  boxContainer.innerHTML += array.map(function (num) {
    var color = "";

    switch (num) {
      case 1:
        color = "purple";
        break;

      case 2:
        color = "yellow";
        break;

      case 3:
        color = "blue";
        break;

      case 4:
        color = "pink";
        break;

      case 5:
        color = "lime";
        break;

      case 6:
        color = "orange";
        break;

      default: // code block

    }

    return "<div class=\"box-container__box ".concat(color, "\"  id=\"").concat(num, "\"></div>");
  }).join("\n");
  document.querySelectorAll(".box-container__box").forEach(function (box) {
    box.addEventListener("click", function (event) {
      var userNewInput = Number(event.target.id);

      if (array === easyArray) {
        detectUserInput(userNewInput, "easy");
      } else {
        detectUserInput(userNewInput, "hard");
      }
    });
  });

  if (array === easyArray) {
    boxContainer.classList.add("easy");
  } else if (array === array || array === shuffled) {
    boxContainer.classList.add("hard");
  }
}

var startGame = function startGame(mode) {
  //reset
  message.innerHTML = "";
  boxContainer.innerHTML = "";
  start.style.display = "none";
  game.style.display = "block";
  gameOverHeading.style.display = "none";
  heading.classList.remove("game-over");
  game.classList.remove("game-over");
  document.querySelectorAll(".box-container__box").forEach(function (box) {
    box.classList.remove("game-over");
  }); //dynamically render boxes CHANGE MODES AFTER GAME OVER

  if (!document.querySelector(".box-container__box")) {
    if (mode === "easy") {
      renderBoxes(easyArray);
    } else {
      renderBoxes(array);
    }
  } else if (document.querySelector(".box-container__box")) {
    if (mode === "easy") {
      boxContainer.classList.add("easy");
    }

    if (mode === "easy" && document.getElementById("5")) {
      console.log(document.getElementById("5"));
      document.getElementById("5").style.display = "none";
      document.getElementById("6").style.display = "none";
      boxContainer.classList.add("easy");
    } else if (mode === "hard") {
      boxContainer.classList.add("hard");
    }

    if (mode === "hard" && !document.getElementById("5")) {
      renderBoxes(array.slice(4, 6));
      boxContainer.classList.add("hard");
    }
  }

  setTimeout(function () {
    if (mode === "easy") {
      sallySays(4);
    } else {
      sallySays(6);
    }
  }, 800);
};

startButtonEasy.addEventListener("mouseover", function () {
  document.querySelector(".start__hover-text").innerHTML = "you're better than that";
});
startButtonEasy.addEventListener("mouseout", function () {
  document.querySelector(".start__hover-text").innerHTML = "";
});
startButtonHard.addEventListener("mouseover", function () {
  document.querySelector(".start__hover-text").innerHTML = "ooh feeling confident are we?";
});
startButtonHard.addEventListener("mouseout", function () {
  document.querySelector(".start__hover-text").innerHTML = "";
}); //Easy mode

startButtonEasy.addEventListener("click", function () {
  startGame("easy");
}); //Hard mode

startButtonHard.addEventListener("click", function () {
  startGame("hard");
});