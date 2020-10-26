const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const timestamp = document.getElementById("timestamp");
const progress = document.getElementById("progress");

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  getCurrentTime();
}

function setCurrentTime() {
  video.currentTime = (progress.value * video.duration) / 100;
}

function getCurrentTime() {
  let mins = Math.floor(video.currentTime / 60);
  let secs = Math.floor(video.currentTime % 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  if (secs < 10) {
    secs = "0" + String(secs);
  }
  timestamp.innerText = `${mins}:${secs}`;
}

//changes play to pause and the other way around
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  changeIcon();
}

/*changes play icon status*/
function changeIcon() {
  const icon = play.firstElementChild;
  if (icon.classList.contains("fa-play")) {
    icon.className = "fa fa-pause fa-2x";
  } else {
    icon.className = "fa fa-play fa-2x";
  }
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
  changeIcon();
}

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("ended", stopVideo);
play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setCurrentTime);
