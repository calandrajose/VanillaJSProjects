const word = document.getElementById("word");
const textInput = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
let time = 10;
let score = 0;
let difficulty = localStorage.getItem('difficulty') || 'easy';
difficultySelect.value = difficulty;

let timeInterval = setInterval(timer, 1000);

// List of words for game
// Should look for an API to do this
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

function setNewWord() {
  word.innerHTML = getRandomWord();
  textInput.focus();
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function checkInput(e) {
  const guess = e.target.value;
  if (guess === word.innerHTML) {
    score++;
    increaseTimer();
    updateUI();
  }
}


function updateUI() {
  scoreEl.innerHTML = score;
  timeEl.innerHTML = `${time}s`;
  textInput.value = "";
  setNewWord();
}

function increaseTimer() {
  switch (difficulty) {
    case "easy":
      time += 5;
      break;
    case "medium":
      time += 3;
      break;
    case "hard":
      time++;
      break;
  }
}

function setDifficulty(e){
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
}

function showGameOverUI() {
  endgameEl.innerHTML = `<h1>Game Over</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Try Again</button>
  `;
  endgameEl.style.display = "flex";
}

function timer() {
  time--;
  timeEl.innerHTML = `${time}s`;
  if (time <= 0) {
    clearInterval(timeInterval);
    showGameOverUI();
    return;
  }
}

setNewWord();
 //1000 will  run it every 1 second
settingsForm.addEventListener("change", setDifficulty);
textInput.addEventListener("input", checkInput);
settingsBtn.addEventListener("click", ()=> settings.classList.toggle('hide'));
