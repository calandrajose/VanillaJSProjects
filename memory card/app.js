const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

let currentActiveCard = 0;

const cardsEl = [];
const cardsData = [
    {
        question: "What must a variable begin with?",
        answer: "A letter, $ or _",
    },
    {
        question: "What is a variable?",
        answer: "Container for a piece of data",
    },
    {
        question: "Example of Case Sensitive Variable",
        answer: "thisIsAVariable",
    },
];

// Create all cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

// Create single card in DOM
function createCard(data, index) {
    const card = document.createElement("div");
    card.classList.add("card");

    if (index === 0) {
        card.classList.add("active");
    }

    card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
            <p>${data.answer}</p>
        </div>
    </div>
    `;

    card.addEventListener("click", () => card.classList.toggle("show-answer"));
    //Add to DOM cards
    cardsEl.push(card);
    cardsContainer.appendChild(card);
    updateCurrentNumber();
}

function updateCurrentNumber() {
    currentEl.innerHTML = `${currentActiveCard + 1}/${cardsEl.length}`;
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

createCards();

nextBtn.addEventListener("click", showNextCard);
prevBtn.addEventListener("click", showPrevCard);
