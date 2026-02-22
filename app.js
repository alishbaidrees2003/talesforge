let selectedGenre = null;
let videoFile = null;

const screens = document.querySelectorAll(".screen");
const videoInput = document.getElementById("videoInput");
const videoPreview = document.getElementById("videoPreview");
const loadingText = document.getElementById("loadingText");
const dropArea = document.getElementById("dropArea");

const timelineTrack = document.getElementById("timelineTrack");
const timelineProgress = document.getElementById("timelineProgress");
const playhead = document.getElementById("playhead");

/* SCREEN SWITCH */
function showScreen(id) {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goToPrompt() {
  if (!videoFile) {
    alert("Please upload a video first!");
    return;
  }
  showScreen("screen-prompt");
}

/* GENRE */
function selectGenre(genre) {
  selectedGenre = genre;
  alert("Selected: " + genre);
}

/* LOADING */
function startProcessing() {
  showScreen("screen-processing");

  const messages = [
    "Loading Video...",
    "AI Generating Story...",
    "Applying Cinematic Effects...",
    "Rendering Final Cut..."
  ];

  let i = 0;

  const interval = setInterval(() => {
    loadingText.innerText = messages[i];
    i++;

    if (i >= messages.length) {
      clearInterval(interval);
      setTimeout(() => {
        showScreen("screen-editor");
        loadVideo();
      }, 800);
    }
  }, 1800);
}

/* LOAD VIDEO */
function loadVideo() {
  if (videoFile) {
    videoPreview.src = URL.createObjectURL(videoFile);
  }

  videoPreview.className = "";
  if (selectedGenre) {
    videoPreview.classList.add(selectedGenre);
  }
}

/* DRAG & DROP */
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("dragover");

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    videoFile = files[0];
    alert("Video Selected: " + videoFile.name);
  }
});

videoInput.addEventListener("change", (e) => {
  videoFile = e.target.files[0];
});

/* 🎬 PRO TIMELINE */
videoPreview.addEventListener("timeupdate", () => {
  if (!videoPreview.duration) return;

  const percent = (videoPreview.currentTime / videoPreview.duration) * 100;

  timelineProgress.style.width = percent + "%";
  playhead.style.left = percent + "%";
});

timelineTrack.addEventListener("click", (e) => {
  const rect = timelineTrack.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;

  if (videoPreview.duration) {
    videoPreview.currentTime = percent * videoPreview.duration;
  }
});
