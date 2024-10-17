const checkbox = document.getElementById("checkbox");
const btn = document.querySelector("button");

btn.classList.add("inactive")

function submitInactive() {
  if (!checkbox.checked) {
    btn.classList.add("inactive");
  } else {
    btn.classList.remove("inactive");
  }
}

checkbox.addEventListener("change", submitInactive)