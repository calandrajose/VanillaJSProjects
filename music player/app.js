const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const musicContainer = document.getElementById("music-container");
const nextBtn = document.getElementById("next");
const playAndPausBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const songs = ["Blood & Wine", "For Toussaint", "Wine Wars"];
const tittle = document.getElementById("title");
let songsIndex = 0;

function autoNext() {
    nextSong();
    setData();
    toggleAudioStatus();
}

function togglePlayStatus(e) {
  toggleAudioStatus();
  updateUI(e);
}

function toggleAudioStatus() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

/**shows title and progress line */
function updateUI(e) {
  const iconClassName = e.currentTarget.firstElementChild.className;
  musicContainer.classList.toggle("play");
  playAndPausBtn.firstElementChild.className = iconClassName.includes("fa-play")
    ? "fas fa-pause"
    : "fas fa-play";
}

function updateProgress() {
  const currentPercentage = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${currentPercentage}%`;
}

function setCurrentTime(e) {
  const width = this.clientWidth;
  const target = e.offsetX;
  audio.currentTime = (target / width) * audio.duration;
}

//Sets cover, audio track and title
function setData() {
  tittle.innerText = songs[songsIndex];
  audio.src = `./audio/${songs[songsIndex]}.mp3`;
  cover.src = `./imgs/${songs[songsIndex]}.jpg`;
}

function changeSong(e) {
  if (musicContainer.className.includes("play")) {
    setIndex(e);
    setData();
    toggleAudioStatus();
  }
}

//defines if is next or prev
function setIndex(e) {
  if (e.currentTarget.id === "next") {
    nextSong();
  } else if (e.currentTarget.id === "prev") {
    previousSong();
  }
}

function nextSong() {
  if (songsIndex === songs.length - 1) {
    songsIndex = 0;
  } else {
    songsIndex++;
  }
}

function previousSong() {
  if (songsIndex === 0) {
    songsIndex = songs.length - 1;
  } else {
    songsIndex--;
  }
}

setData();
playAndPausBtn.addEventListener("click", togglePlayStatus);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", autoNext);
progressContainer.addEventListener("click", setCurrentTime);
nextBtn.addEventListener("click", changeSong);
prevBtn.addEventListener("click", changeSong);
