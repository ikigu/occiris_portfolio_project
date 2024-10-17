async function createOrder() {
  const res = await fetch("/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({}),
  });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error);
  }
  const { id } = await res.json();
  return id;
}

async function onApprove(data, actions) {
  return actions.order
    .capture()
    .then(async function () {
      try {
        const response = await fetch("/order-successful", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({}),
        });
        const responseData = await response.json();
        const successMessage = document.getElementById("success-message");
        const paypalBtnContainer = document.getElementById(
          "paypal-button-container"
        );
        const paymentDetails = document.getElementById("container");
        const viewFilesLink = document.getElementById("view-files-link");
        const orderTitle = document.getElementById("order-title");
        const checkoutCard = document.querySelector("main");
        const paymentTitle = document.getElementById("payment-title");

        checkoutCard.style.height = "245px";
        checkoutCard.style.marginTop = "200px";
        orderTitle.innerText = "Thank you!";
        paymentDetails.style.display = "none";
        paypalBtnContainer.style.display = "none";
        successMessage.style.display = "block";
        viewFilesLink.style.display = "block";
        viewFilesLink.innerText = "View my orders";
        successMessage.innerText = "Your order has been placed.";
        paymentTitle.innerText = "Payment received!";
      } catch (error) {
        console.log("failed");
      }
    })
    .then(function () {
      console.log(data);
    });
}

paypal
  .Buttons({
    createOrder: createOrder,
    onApprove: onApprove,
  })
  .render("#paypal-button-container");
