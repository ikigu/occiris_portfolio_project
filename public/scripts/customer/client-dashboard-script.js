const settingsModal = document.getElementById("settings-modal");
const grayBackground = document.getElementById("gray-background");
const settingsButton = document.getElementById("settings-btn");
const pwdChangeForm = document.getElementById("password-change-form");
const newPwdField = document.getElementById("new-password");
const confirmPwdField = document.getElementById("confirm-password");
const warningMessage = document.getElementById("warning-message");
const successMessage = document.getElementById("success-message");
const guidesModal = document.getElementById("guides-modal");
const guidesBtn = document.getElementById("guides-btn");
const csrfTokenInput = document.getElementById("csrf-token");

function isValidPassword(password) {
  if (password.length < 8) {
    return false;
  }

  let hasNumber = false;
  for (let i = 0; i < password.length; i++) {
    if (!isNaN(parseInt(password[i]))) {
      hasNumber = true;
      break;
    }
  }

  let hasSpecialChar = false;
  const specialChars = "!@#$%^&*()_+-=[]{}|;':\"<>,.?/\\";
  for (let i = 0; i < password.length; i++) {
    if (specialChars.includes(password[i])) {
      hasSpecialChar = true;
      break;
    }
  }
  if (!hasSpecialChar && !hasNumber) {
    return false;
  }

  return true;
}

async function changePassword(event) {
  event.preventDefault();
  const newPwd = newPwdField.value;
  const newPwdConfirmation = confirmPwdField.value;
  const csrfToken = csrfTokenInput.value;

  const pwdIsSecure = isValidPassword(newPwd);

  if (newPwd !== newPwdConfirmation) {
    warningMessage.textContent = "Passwords don't match. Please try again.";
    return (warningMessage.style.display = "block");
  } else if (!pwdIsSecure) {
    warningMessage.style.display = "block";
    return (warningMessage.textContent = `Password is too weak or common`);
  }

  const response = await fetch("/password-change", {
    method: "POST",
    body: JSON.stringify({ newPassword: newPwd, csrfToken: csrfToken }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const responseData = await response.json();

  if (responseData.message === "Password change successful!") {
    newPwdField.value = "";
    confirmPwdField.value = "";
    warningMessage.style.display = "none";
    successMessage.style.display = "block";
    successMessage.textContent = responseData.message;
  } else {
    successMessage.style.display = "none";
    warningMessage.style.display = "block";
    warningMessage.textContent = responseData.message;
  }
}

function hideModals() {
  successMessage.style.display = "none";
  warningMessage.style.display = "none";

  if (settingsModal.style.display == "block") {
    settingsModal.style.display = "none";
  } else if (guidesModal.style.display == "block") {
    guidesModal.style.display = "none";
  }
  grayBackground.style.display = "none";
}

function showSettingsModal() {
  settingsModal.style.display = "block";
  grayBackground.style.display = "block";
}

function showGuidesModal() {
  guidesModal.style.display = "block";
  grayBackground.style.display = "block";
}

guidesBtn.addEventListener("click", showGuidesModal);
settingsButton.addEventListener("click", showSettingsModal);
grayBackground.addEventListener("click", hideModals);
pwdChangeForm.addEventListener("submit", changePassword);
