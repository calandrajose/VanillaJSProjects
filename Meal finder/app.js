const input = document.getElementById("search");
const randomSearch = document.getElementById("random-search-btn");
const searchBtn = document.getElementById("search-btn");
const resultHeading = document.getElementById("result-heading");
const meals = document.getElementById("meals");
const singleMeal = document.getElementById("single-meal");
let results = [];
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

async function fetchMealDB(e) {
  const term = input.value;
  if (term.trim()) {
    fetch(`${url}${term}`)
      .then((data) => data.json())
      .then((result) => {
        singleMeal.innerHTML = "";
        if (result.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results.Try Again!</p>`;
        } else {
          results = [...result.meals];
          resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
          showResults();
        }
      })
      .catch((error) => console.log(error));
    input.value = "";
  }
  e.preventDefault();
}

async function fetchRandomMealDB() {
  resultHeading.innerHTML = "";
  meals.innerHTML = "";
  fetch(`${randomUrl}`)
    .then((data) => data.json())
    .then((result) => {
      addMealToDOM(result.meals[0]);
    })
    .catch((error) => console.log(error));
}

function showResults() {
  meals.innerHTML = results
    .map(
      (meal) => `
    <div class="meal">
      <img src="${meal.strMealThumb}/preview" alt"${meal.strMeal}"/>
      <div class="meal-info" data-mealId="${meal.idMeal}">
        <h3>${meal.strMeal}</h3>
      </div>
    </div>`
    )
    .join("");
}

function selectMeal(e) {
  const meal = e.target.tagName === "H3" ? e.target.parentElement : e.target;

  if (meal.className === "meal-info") {
    const selectedMeal = results.filter(
      (resultItem) => resultItem.idMeal === meal.dataset.mealid
    );
    addMealToDOM(selectedMeal[0]);
  }
}

function addMealToDOM(selectedMeal) {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (selectedMeal[`strIngredient${i}`]) {
      ingredients.push(
        `${selectedMeal[`strIngredient${i}`]} - ${
          selectedMeal[`strMeasure${i}`]
        }`
      );
    } else {
      break;
    }
  }

  singleMeal.innerHTML = `
    <h1>${selectedMeal.strMeal}</h1>
    <img class="img-container" src="${selectedMeal.strMealThumb}" alt"${selectedMeal.strMeal}"/>
    <div class="meal-category">
    ${selectedMeal.strCategory ? `<h2>${selectedMeal.strCategory}</h2>` : ""}
    ${selectedMeal.strArea ? `<h2>${selectedMeal.strArea}</h2>` : ""}
    </div>
    <p class="instructions">${selectedMeal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul class="ingredients">
     ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
    </ul>
  `;
}

function getIngredients(meal) {
  ingredients.push("hola");
}

searchBtn.addEventListener("click", fetchMealDB);
randomSearch.addEventListener("click", fetchRandomMealDB);
meals.addEventListener("click", selectMeal);
