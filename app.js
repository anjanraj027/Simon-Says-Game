let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "blue", "yellow"];

let started = false;
let level = 0;

let highestScore = 0;
let hScore = document.querySelector("h3");

let h2 = document.querySelector("h2");

//playable in pc only
document.addEventListener("keypress", function (event) {
  if (started == false) {
    console.log("game is started");
    started = true;

    lvlUp();
  }
});

//playable in android because of touchstart
document.addEventListener("touchstart", function (event) {
  if (started == false) {
    console.log("game is started");
    started = true;

    lvlUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}

function userFlash(btn) {
  btn.classList.add("userPress");
  setTimeout(function () {
    btn.classList.remove("userPress");
  }, 300);
}

function lvlUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  if (level > highestScore) {
    highestScore = level;
    hScore.innerText = `Highest Score: ${highestScore}`; // Update the displayed highest score
  }

  let randIndx = Math.floor(Math.random() * 4);
  let randColor = btns[randIndx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

//OlD CODE FOR LIGHT THEME
// function checkAns(idx) {
//   if (userSeq[idx] === gameSeq[idx]) {
//     if (userSeq.length == gameSeq.length) {
//       setTimeout(lvlUp, 1000);
//     }
//   } else {
//     h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start`;
//     document.querySelector("body").style.backgroundColor = "#F42D2D";
//     setTimeout(function () {
//       document.querySelector("body").style.backgroundColor = "white";
//     }, 200);
//     reset();
//   }
// }

//UPGRADED THEME ACCORDING TO LIGHT OR DARK
//WITH THE HELP OF CHATGPT
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(lvlUp, 1000);
    }
  } else {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (isDarkMode) {
      document.querySelector("body").style.backgroundColor = "#F42D2D";
    } else {
      document.querySelector("body").style.backgroundColor = "#FFBABA";
    }

    h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start`;

    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = isDarkMode
        ? "#000000"
        : "white";
    }, 300);

    reset();
  }
}

function btnPress() {
  //   console.log(this);
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".box");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
