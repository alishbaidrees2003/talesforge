const generateBtn = document.getElementById("generateBtn");
const startScreen = document.getElementById("startScreen");
const loadingScreen = document.getElementById("loadingScreen");
const videoScreen = document.getElementById("videoScreen");

generateBtn.addEventListener("click", () => {

  // Hide start screen
  startScreen.classList.remove("active");

  // Show loading screen
  loadingScreen.classList.add("active");

  // Fake AI generation delay
  setTimeout(() => {
    loadingScreen.classList.remove("active");
    videoScreen.classList.add("active");
  }, 3000);


});
