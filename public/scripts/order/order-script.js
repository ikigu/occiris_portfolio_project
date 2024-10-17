async function fetchCart() {
  const response = await fetch("/cart/mine");
  const responseData = await response.json();

  hideEmptyState(responseData);
  updateCheckoutCard(responseData);
  extraAddLinkBtnXorO(responseData);

  responseData.cart.forEach((item) => {
    orderItemsList.appendChild(createNewCartItem(item));
  });
}

fetchCart();

async function addItemToCart(event) {
  event.preventDefault();
  const link = { link: clientInput.value };

  if (linkIsInvalid()) {
    return;
  }

  const response = await fetch(`/cart/add/${orderType}`, {
    method: "POST",
    body: JSON.stringify(link),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    return displayResponseError(
      "Something went wrong. Please try again later."
    );
  }

  if (responseData.message === "This video is not available on YouTube.") {
    return displayResponseError(responseData.message);
  }

  const lastIndex = responseData.cart.length - 1;
  const orderItem = orderItemsList.appendChild(
    createNewCartItem(responseData.cart[lastIndex])
  );

  showNewCartItem(responseData, orderItem);
  updateCheckoutCard(responseData);
  extraAddLinkBtnXorO(responseData);
}

async function deleteOrderItem(event) {
  if (event.target.matches(".delete-cart-item-button")) {
    const videoId = event.target.dataset.videoid;

    const response = await fetch(`/cart/delete/${videoId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    const responseData = await response.json();

    removeCartItemFromPage(event);
    hideEmptyState(responseData);
    updateCheckoutCard(responseData);
    extraAddLinkBtnXorO(responseData);
  }
}

orderForm.addEventListener("submit", addItemToCart);
getMoreLinksBtns.forEach((button) => {
  button.addEventListener("click", showModal);
});
grayBackground.addEventListener("click", hideModal);
resetModalButton.addEventListener("click", hideModal);
submitButton.addEventListener("click", showLoader);
document.addEventListener("click", deleteOrderItem);
