const addBtn = document.querySelector(".btn");
const amount = document.getElementById("amount");
const balance = document.getElementById("balance");
const incomesDisplay = document.getElementById("money-plus");
const expensesDisplay = document.getElementById("money-minus");
const list = document.getElementById("list");
const text = document.getElementById("text");
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransaction(e) {
  if (text.value.trim() === "" && amount.value.trim() === "") {
    alert("Please add detail and amount");
  } else {
    const transaction = {
      id: getRandomId(),
      detail: text.value,
      amount: +amount.value,
    };
    console.log(transaction.detail)
    transactions.push(transaction);
    updateLocalStorage();
    addTransactionToDOM(transaction);
    updateDOMValues();
  }
  e.preventDefault();
}

function addTransactionToDOM(transaction) {
  const newLi = document.createElement("li");
  newLi.classList.add(transaction.amount < 0 ? "minus" : "plus");
  newLi.innerHTML = `${transaction.detail}<span>${getSign(
    transaction.amount
  )}$${moneyFormatter(
    Math.abs(transaction.amount)
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>`;
  list.appendChild(newLi);
}

// Updates balance, incomes and expenses
function updateDOMValues() {
  let amounts = transactions.map((transaction) => transaction.amount);

  const incomes = amounts
    .filter((item) => item > 0) //only positive nums
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expenses = (
    amounts
      .filter((item) => item < 0) //only negative nums
      .reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  balance.innerText = `$${moneyFormatter(incomes - expenses)}`;
  incomesDisplay.innerText = `+$${moneyFormatter(incomes)}`;
  expensesDisplay.innerText = `-$${moneyFormatter(expenses)}`;
}

function getRandomId() {
  return Math.floor(Math.random() * 1000000);
}

function getSign(value) {
  return value < 0 ? "-" : "+";
}

function moneyFormatter(amountVal) {
  return parseInt(amountVal)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function removeTransaction(id) {
  transactions = transactions.filter((trans) => trans.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function init() {
    list.innerHTML = ''
  transactions.forEach((transaction) => addTransactionToDOM(transaction));
  updateDOMValues();
}

init();

addBtn.addEventListener("click", addTransaction);
