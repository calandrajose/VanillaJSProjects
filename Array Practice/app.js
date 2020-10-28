const addUserBtn = document.getElementById("new-user");
const doubleMoneyBtn = document.getElementById("double-money");
const millonairesBtn = document.getElementById("millonaires");
const sortBtn = document.getElementById("sort");
const totalBtn = document.getElementById("calculate");
const resetBtn = document.getElementById("reset");
const main = document.querySelector(".display");

let data = [];
let dataOriginal = [];

async function getUser() {

  const result = await fetch("https://randomuser.me/api/");
  const resp = await result.json();
  const person = resp.results[0];

  const newPerson = {
    name: `${person.name.first} ${person.name.last}`,
    wealth: Math.floor(Math.random() * 1500000),
  };

  addData(newPerson);

  updateDOM();
}

function addData(newData) {
  data.push(newData);
  dataOriginal.push(newData);
}

function clearMain() {
  main.innerHTML = '<h2 id="personHeader"><strong>Person</strong>Wealth </h2>';
}

function updateDOM(providedData = data) {
  clearMain();
  providedData.forEach((item) => {
    const newEl = document.createElement("div");
    newEl.classList.add("person");
    newEl.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.wealth
    )}`;
    main.appendChild(newEl);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function doubleMoney() {
  data = data.map((item) => {
    return {
      ...item,
      wealth: item.wealth * 2,
    };
  });
  updateDOM();
}

function getMillonaires() {
  data = data.filter((item) => item.wealth > 1000000);
  updateDOM();
}

function sortDescending() {
  data = data.sort((a, b) => b.wealth - a.wealth);
  updateDOM();
}

function getTotal() {
  const total = data.reduce((total, item) => (total += item.wealth), 0);
  showTotal(total);
}

function resetData() {
  data = [...dataOriginal];
  updateDOM();
}

function showTotal(total) {
  updateDOM();
  const totalEl = document.createElement("div");
  totalEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(totalEl);
}

addUserBtn.addEventListener("click", getUser);
doubleMoneyBtn.addEventListener("click", doubleMoney);
millonairesBtn.addEventListener("click", getMillonaires);
sortBtn.addEventListener("click", sortDescending);
totalBtn.addEventListener("click", getTotal);
resetBtn.addEventListener("click", resetData);
