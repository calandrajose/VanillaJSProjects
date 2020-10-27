//const apidKey = d4b8bf10f436fa7fb40beb2a;
const baseUrl =
  "https://v6.exchangerate-api.com/v6/d4b8bf10f436fa7fb40beb2a/latest/";
const currencyFromEl = document.getElementById("currency-one");
const currencyToEl = document.getElementById("currency-two");
const rate = document.getElementById("rate");
const swapBtn = document.getElementById("swap");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
let currencyOne = "";
let currencyTwo = "";
let chosenRate = 0;

function getRate() {
  currencyOne = currencyFromEl.value;
  currencyTwo = currencyToEl.value;
  fetch(`${baseUrl}${currencyOne}`)
    .then((resp) => resp.json())
    .then((data) => {
      chosenRate = data.conversion_rates[currencyTwo];
      setRateEl(currencyOne, currencyTwo, chosenRate);
      calculate();
    })
    .catch((err) => console.log(err));
}

function calculate() {
  if (currencyOne === "" || currencyTwo === "") {
    getRate();
  }
  amountTwo.value = (amountOne.value * chosenRate).toFixed(2);
}

function setRateEl(currencyOne, currencyTwo, chosenRate) {
  rate.innerText = `1 ${currencyOne} = ${chosenRate} ${currencyTwo}`;
}

function swapRates() {
  let aux = currencyFromEl.value;
  currencyFromEl.value = currencyToEl.value;
  currencyToEl.value = aux;
  getRate();
}

currencyFromEl.addEventListener("change", getRate);
currencyToEl.addEventListener("change", getRate);
amountOne.addEventListener("input", calculate);
swapBtn.addEventListener("click", swapRates);
