const pwdResetForm = document.getElementById("password-reset-form");
const emailField = document.getElementById("email-address");
const successMessage = document.getElementById("success-message");
const formSection = document.getElementById("form-section");
const csrfToken = document.getElementById("csrf-token").value;

// This handles reset link request via email

async function sendLink(event) {
  event.preventDefault();

  const response = await fetch("/get-pwd-reset-link", {
    method: "POST",
    body: JSON.stringify({
      enteredEmail: emailField.value.trim().toLowerCase(),
      csrfToken: csrfToken,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  formSection.style.display = "none";
  successMessage.innerText = responseData.message;
  successMessage.style.display = "block";
}

pwdResetForm.addEventListener("submit", sendLink);
