const wordEl = document.getElementById("word");
const wrong = document.querySelector(".wrong-letters");
const notif = document.getElementById("notification-container");
const popupContainer = document.getElementById("popup-container");
const playAgainBtn = document.getElementById("play-button");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");
const re = /^[a-zA-Z]{1}$/;
const correctLetters = [];
const wrongLetters = [];

const words = [
  "application",
  "programming",
  "interface",
  "wizard",
]; /*should fetch some database/api */

let selectedWord = words[Math.floor(Math.random() * words.length)];

function displayWord() {
  let output = "";
  for (let letter of selectedWord) {
    output += `<span class="letter">${
      correctLetters.includes(letter) ? letter.toUpperCase() : ""
    }</span>`;
  }
  wordEl.innerHTML = output;
  const innerWord = wordEl.innerText.replace(
    /\n/g,
    ""
  ); /*replace line jump for empty string, otherwise it would have \n */

  if (innerWord === selectedWord.toUpperCase()) {
    showPopUp("Congrats, You Won!");
  }
}

function showPopUp(message) {
  finalMessage.innerText = message;
  popupContainer.classList.toggle("hide");
}

function showWrong() {
  if (wrongLetters.length > 0) {
    wrong.innerHTML = `<p>Wrong</p>
            ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

    figureParts.forEach((part, index) => {
      if (index < wrongLetters.length) {
        part.style.display = "block";
      }
    });
  }
  if (wrongLetters.length === figureParts.length) {
    showPopUp("Game Over...");
    document.body.removeEventListener("keyup", checkInput);

  }
}

function showNotif() {
  notif.classList.toggle("show");
  setTimeout(() => notif.classList.toggle("show"), 2000);
}

function isNotChosen(letter) {
  if (
    !correctLetters.includes(inputLetter) &&
    !wrongLetters.includes(inputLetter)
  ) {
    return true;
  } else {
    return false;
  }
}

function checkInput(e) {
  inputLetter = e.key;
  if (re.test(inputLetter)) {
    if (isNotChosen(inputLetter)) {
      if (selectedWord.includes(inputLetter)) {
        correctLetters.push(inputLetter);
        displayWord();
      } else {
        wrongLetters.push(inputLetter);
        showWrong();
      }
    } else {
      showNotif();
    }
  }
}

function resetArrays() {
  wrongLetters.splice(0);
  correctLetters.splice(0);
}

function resetUI() {
  wrong.innerHTML = "";
  figureParts.forEach((part) => (part.style.display = "none"));
  popupContainer.classList.toggle("hide");
}

function playAgain(e) {
  resetArrays();
  resetUI();
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
}

function init() {
  displayWord();
  document.body.addEventListener("keyup", checkInput);
}

init();
playAgainBtn.addEventListener("click", playAgain);
