const emailInput = document.getElementById("email-address");
const nameInput = document.getElementById("name");
const csrfTokenInput = document.getElementById("csrf-token");
const adminOrderform = document.getElementById("admin-order");
const successMessage = document.getElementById("success-message");
const createOrderBtn = document.getElementById("create-order-btn");
const title = document.querySelector("h4");
const instructions = document.getElementById("instructions");

async function createOrder(event) {
  event.preventDefault();
  const email = emailInput.value;
  const csrfToken = csrfTokenInput.value;
  const name = nameInput.value;

  const body = { email: email, csrfToken: csrfToken, name: name };

  const response = await fetch("/order-successful", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  title.innerText = "Success";
  adminOrderform.style.display = "none";
  successMessage.style.display = "block";
  successMessage.innerText = responseData.message;
  instructions.style.display = "none";
}

adminOrderform.addEventListener("submit", createOrder);
