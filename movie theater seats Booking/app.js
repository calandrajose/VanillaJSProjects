const selectedMovie = document.getElementById("movie");
const movieContainer = document.querySelector(".container");
const availableSeats = document.querySelectorAll(".row .seat:not(occupied");
const count = document.getElementById("count");
const total = document.getElementById("total");
let numberOftickets = 0;
let ticketPrice = parseInt(selectedMovie.value);

function getPrice(e) {
  ticketPrice = e.target.value;
  saveMovieInLocal(e.target.selectedIndex, ticketPrice);
  setUIdata();
}

function getNumberOfTickets() {
  const selectedSeats = document.querySelectorAll(".container .selected");

  const selectedIndex = [...selectedSeats].map((seat) =>
    [...availableSeats].indexOf(seat)
  );
  numberOftickets = selectedSeats.length;

  saveInLocal(selectedIndex);

}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    availableSeats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = JSON.parse(localStorage.getItem("movieIndex"));
  const price = parseInt(JSON.parse(localStorage.getItem("price")));

  if (selectedMovieIndex !== null && price !== null) {
    selectedMovie.selectedIndex = selectedMovieIndex;
    ticketPrice = price;
  }

  setUIdata();
}

function setUI(e) {
  const seat = e.target;
  if (seat.className.includes("seat") && !seat.className.includes("occupied")) {
    seat.classList.toggle("selected");
  }
  setUIdata();
}

function setUIdata() {
  getNumberOfTickets();
  count.innerText = numberOftickets;
  total.innerText = math();
}

function math() {
  console.log(numberOftickets, ticketPrice)
  return numberOftickets * ticketPrice;
}

function saveInLocal(selectedIndex) {
  localStorage.setItem("selectedSeats", JSON.stringify(selectedIndex));
}

function saveMovieInLocal(movieIndex, price) {
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("price", +price);
}

selectedMovie.addEventListener("change", getPrice);
movieContainer.addEventListener("click", setUI);
window.addEventListener("load", populateUI);
