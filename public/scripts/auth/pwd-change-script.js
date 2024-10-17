const pwdChangeForm = document.getElementById("password-change-form");
const newPwdField = document.getElementById("new-password");
const confirmPwdField = document.getElementById("confirm-password");
const warningMessage = document.getElementById("warning-message");
const successMessage = document.getElementById("success-message");
const loginLink = document.getElementById("login-link");
const token = pwdChangeForm.dataset.token;
const csrfToken = document.getElementById("csrf-token").value;

// handles password reset via email tokens

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
  const newPassword = newPwdField.value;
  const newPwdConfirmation = confirmPwdField.value;

  const pwdIsSecure = isValidPassword(newPassword);
  console.log(pwdIsSecure);

  if (newPassword !== newPwdConfirmation) {
    warningMessage.textContent = "Passwords don't match. Please try again.";
    return (warningMessage.style.display = "block");
  } else if (!pwdIsSecure) {
    warningMessage.style.display = "block";
    return (warningMessage.textContent = `Password is too weak or common`);
  }

  const response = await fetch(`/change-password/${token}`, {
    method: "POST",
    body: JSON.stringify({ newPassword: newPassword, csrfToken: csrfToken }),
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const responseData = await response.json();
  console.log(responseData.message);

  if (responseData.message === "Password change successful!") {
    pwdChangeForm.style.display = "none";
    warningMessage.style.display = "none";
    loginLink.style.display = "block";
    successMessage.style.display = "block";
    successMessage.textContent = responseData.message;
  } else {
    warningMessage.style.display = "block";
    warningMessage.textContent = responseData.message;
  }
}

pwdChangeForm.addEventListener("submit", changePassword);
