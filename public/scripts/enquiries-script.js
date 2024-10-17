const form = document.querySelector("form");
const successMessage = document.getElementById("success-message");
const warningMessage = document.getElementById("warning-message");
const submitButton = document.getElementById("submit-button");
const inputEmail = document.getElementById("email");
const inputFullName = document.getElementById("name");
const inputCompanyName = document.getElementById("company-name");
const inputVolume = document.getElementById("volume-hours");
const inputOptionalMessage = document.getElementById("message");
const csrfTokenInput = document.getElementById("csrfToken");

successMessage.style.display = "none";
warningMessage.style.display = "none";

function showLoader() {
  submitButton.innerHTML = '<div class="loader"></div>';
}

async function submitLargeOrdersForm(event) {
  event.preventDefault();
  showLoader();

  const email = inputEmail.value;
  const fullName = inputFullName.value;
  const companyName = inputCompanyName.value;
  const volume = inputVolume.value;
  const optionalMessage = inputOptionalMessage.value;
  const csrfToken = csrfTokenInput.value;

  const formData = {
    email: email,
    name: fullName,
    companyName: companyName,
    volume: volume,
    optionalMessage: optionalMessage,
    csrfToken: csrfToken,
  };

  const response = await fetch("/enquiries/submit", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const responseData = await response.json();

  console.log(responseData);

  if (
    responseData.message ==
    "Your request has been received. A member of our team will be in touch shortly."
  ) {
    successMessage.style.display = "block";
    successMessage.innerText = responseData.message;
    submitButton.style.display = "none";
    inputEmail.value = "";
    inputFullName.value = "";
    inputCompanyName.value = "";
    inputOptionalMessage.value = "";
    receivedCsrfToken.value = "";
  } else {
    warningMessage.style.display = "block";
    warningMessage.innerText = responseData.message;
    submitButton.style.display = "none";
    inputEmail.value = "";
    inputFullName.value = "";
    inputCompanyName.value = "";
    inputOptionalMessage.value = "";
    receivedCsrfToken.value = "";
  }
}

form.addEventListener("submit", submitLargeOrdersForm);
