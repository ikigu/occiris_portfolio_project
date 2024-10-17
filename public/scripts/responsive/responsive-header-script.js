const hbButton = document.querySelector(".hamburger-button");
const sideMenu = document.getElementById("side-menu");
const logInButton = document.getElementById("log-in-button");

function removeClass() {
  if (window.innerWidth < 520) {
    logInButton.classList.remove("side-menu-link");
  }
}

function toggleButton() {
  if (hbButton.dataset.onstate == "0") {
    sideMenu.style.display = "block";
    hbButton.dataset.onstate = "1";
  } else if (hbButton.dataset.onstate == "1") {
    sideMenu.style.display = "none";
    hbButton.dataset.onstate = "0";
  }
  if (window.innerWidth < 520) {
    logInButton.classList.remove("side-menu-link");
  }
}

function hideSideMenu() {
  if (window.innerWidth > 1020) {
    sideMenu.style.display = "none";
  }
  return;
}
window.addEventListener("resize", hideSideMenu);
hbButton.addEventListener("click", toggleButton, removeClass);
