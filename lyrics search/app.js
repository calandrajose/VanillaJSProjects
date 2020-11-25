const form = document.getElementById("form");
const searchInput = document.getElementById("search");
const resultsContainer = document.getElementById("results");
const more = document.getElementById("more");
const baseURL = `https://api.lyrics.ovh/`; /* artist/title */

async function searchSongs(term) {
  const resp = await fetch(`${baseURL}/suggest/${term}`);
  const data = await resp.json();
  showData(data);
}

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

async function getLyric(e) {
  if (e.target.className === "btn") {
    const artist = e.target.dataset.artist;
    const title = e.target.dataset.songtitle;
   try{
     const resp = await fetch(
       `${baseURL}/v1/${artist}/${title}`
     );
     const data = await resp.json();
     const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
 
     resultsContainer.innerHTML = `<h2><strong>${artist}</strong> - ${title}</h2>
     <span>${lyrics}</span>
     `
 
     more.innerHTML = `
     <button class="btn" onclick="searchSongs('${artist}')">Back to Artist</button>
     <button class="btn" onclick="searchSongs('${title}')">Back to Title</button>`
   }catch (e){
     alert('Please try again');
   }
  }
}

function showData(data) {
  const lyrics = data.data;
  resultsContainer.innerHTML = `
    <ul class="songs">
    ${lyrics
      .map(
        (song) =>
          `<li>
            <span><strong>${song.artist.name}</strong> - ${song.title}</span>
            <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>`
      )
      .join("")}
    </ul>`;

  checkForMoreResults(data);
}

function checkForMoreResults(data) {
  if (data.prev || data.next) {
    more.innerHTML = ` ${
      data.prev
        ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
        : ""
    }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }`;
  } else {
    more.innerHTML = "";
  }
}

function checkInput(e) {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
    searchInput.value = "";
  }
}

form.addEventListener("submit", checkInput);
resultsContainer.addEventListener("click", getLyric);
//more.addEventListener('click', showMoreResults)
