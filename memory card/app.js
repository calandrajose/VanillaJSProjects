const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const deleteBtn = document.getElementById("delete");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

let currentActiveCard = 0;
const cardsData = getCardsData();
const cardsEl = [];
// const cardsData = [
//     {
//         question: "What must a variable begin with?",
//         answer: "A letter, $ or _",
//     },
//     {
//         question: "What is a variable?",
//         answer: "Container for a piece of data",
//     },
//     {
//         question: "Example of Case Sensitive Variable",
//         answer: "thisIsAVariable",
//     },
// ];

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create single card in DOM
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.index = index;

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = newCardHTML(data);
  card.addEventListener("click", showAnswerOrDelete.bind(card));

  //Add to DOM cards
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentNumber();
}

function newCardHTML(data) {
  return `
     <div  class="inner-card">
         <div class="inner-card-front">
             <p>${data.question}</p>
         </div>
         <div class="inner-card-back">
             <p>${data.answer}</p>
         </div>
         </div>
         
       <i id="delete" class="btn fas fa-trash"></i>
     `;
}

function showAnswerOrDelete(e, index) {
    if (e.target.id === "delete") {
      deleteCard(index);
    } else {
      this.classList.toggle("show-answer");
    }
  }

function updateCurrentNumber() {
  currentEl.innerHTML = `${currentActiveCard + 1}/${cardsEl.length}`;
}

function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

function showNextCard() {
  cardsEl[currentActiveCard].className = "card left";

  if (currentActiveCard !== cardsEl.length - 1) {
    currentActiveCard++;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentNumber();
}

function showPrevCard() {
  cardsEl[currentActiveCard].className = "card right";

  if (currentActiveCard !== 0) {
    currentActiveCard--;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentNumber();
}

function toggleAddContainer() {
  addContainer.classList.toggle("show");
}

function addCard() {
  const question = questionEl.value;
  const answer = answerEl.value;
  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);
    clearFields();
    toggleAddContainer();
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
}

function deleteCard(index) {
  cardsData.splice(index, 1);
  console.log(cardsData);
  setCardsData(cardsData);
}

function wipeData() {
    localStorage.clear();
    cardsContainer.innerHTML = "";
    window.location.reload();
  }

function clearFields() {
  questionEl.value = "";
  answerEl.value = "";
}

createCards();

nextBtn.addEventListener("click", showNextCard);
prevBtn.addEventListener("click", showPrevCard);
showBtn.addEventListener("click", toggleAddContainer);
hideBtn.addEventListener("click", toggleAddContainer);
addCardBtn.addEventListener("click", addCard);
clearBtn.addEventListener("click", wipeData);
