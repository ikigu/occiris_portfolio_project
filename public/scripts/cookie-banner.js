const cookieBanner = document.getElementById("cookie-banner");
const cookieAccept = document.getElementById("cookie-accept");

function displayCookieBanner() {
  if (window.innerWidth < 765) {
    cookieBanner.style.display = "block";
  } else {
    cookieBanner.style.display = "flex";
  }
}

setTimeout(displayCookieBanner, 2500);
window.addEventListener("resize", displayCookieBanner);

cookieAccept.addEventListener("click", async function () {
  cookieBanner.remove();
  const message = { message: "agreed" };
  console.log("button clicked");
  const response = await fetch("/", {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let responseData = await response.json();
});
