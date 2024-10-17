function showLoader() {
  if (clientInput.value.trim) {
    submitButton.innerHTML = '<div class="loader"></div>';
  }
}

function hideLoader() {
  submitButton.innerHTML = "Submit";
}

function hideEmptyState(responseData) {
  if (responseData.cart.length == 0) {
    cartEmptyState.style.display = "block";
  } else {
    cartEmptyState.style.display = "none";
  }
}

function clearInputAndErrors(input, error) {
  clientInput.placeholder = "";
  linkInvalid.style.display = "none";
}

function showModal() {
  modal.classList.add("visible");
  grayBackground.classList.add("visible");
  hideLoader();
}

function hideModal() {
  modal.classList.remove("visible");
  grayBackground.classList.remove("visible");
  clientInput.value = "";
  clearInputAndErrors();
}

function animate(orderItem) {
  setTimeout(function () {
    orderItem.style.borderColor = "blue";
  }, 500);

  setTimeout(function () {
    orderItem.style.borderColor = "transparent";
  }, 1650);
}

function updateCheckoutCard(response) {
  response.cart.length === 1
    ? (numOfItems.innerText = `${response.cart.length} item:`)
    : (numOfItems.innerText = `${response.cart.length} items:`);

  !response.totalCost
    ? (totalCost.innerText = `$0.00`)
    : (totalCost.innerText = `$${response.totalCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`);
}

function createNewCartItem(item) {
  const newCartItem = cartItemTemplate.cloneNode(true);

  newCartItem.removeAttribute("id");
  newCartItem.removeAttribute("style");
  newCartItem.classList.add("active-cart-item"); // In case you want to undo delete items in the future.

  newCartItem.querySelector(".video-title").innerText = item.name;
  newCartItem.querySelector(".order-type").innerText = item.type;
  newCartItem.querySelector(".video-duration").innerText =
    item.time.colonNotation;
  newCartItem.querySelector(".eta").innerText = item.time.eta;
  newCartItem.querySelector(".item-cost").innerText = item.cost.toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  const deleteButton = newCartItem.querySelector(".delete-cart-item-button");

  deleteButton.dataset.videoid = item.id;
  deleteButton.dataset.videoduration = item.time.minutes;

  return newCartItem;
}

function linkIsInvalid() {
  if (
    !clientInput.value.includes("https://www.youtube.com/watch?v=") &&
    !clientInput.value.includes("https://youtu.be/")
  ) {
    linkInvalid.style.display = "block";
    linkInvalid.innerText = "Link invalid. Please try again.";
    clientInput.value = "";
    clientInput.placeholder = `Your link should start with either "https://www.youtube.com/watch?v=" or "https://youtu.be/"`;
    hideLoader();
    return true;
  }
}

function showNewCartItem(responseData, orderItem) {
  hideModal();
  clearInputAndErrors(clientInput, linkInvalid);
  hideEmptyState(responseData);
  window.scrollTo(0, document.body.scrollHeight);
  animate(orderItem);
}

function extraAddLinkBtnXorO(responseData) {
  if (responseData.cart.length < 2) {
    bottomButton.style.display = "none";
  } else {
    bottomButton.style.display = "block";
  }
}

function displayResponseError(message) {
  linkInvalid.style.display = "block";
  clientInput.value = "";
  hideLoader();
  linkInvalid.innerText = message;
}

function removeCartItemFromPage(event) {
  event.target.parentElement.parentElement.parentElement.remove();
}

function clearErrorMessage() {
  linkInvalid.style.display = "none";
  clientInput.placeholder = "";
}

clientInput.addEventListener("click", clearErrorMessage);
