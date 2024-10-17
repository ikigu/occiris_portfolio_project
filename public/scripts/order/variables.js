const cartEmptyState = document.getElementById("order-item-empty-state");
const cartItemTemplate = document.getElementById("cart-item-template");
const orderItemsList = document.getElementById("order-items-list");
const orderForm = document.getElementById("form");
const orderType = orderForm.dataset.ordertype;
const clientInput = document.getElementById("links");
const modal = document.getElementById("form-control");
const grayBackground = document.getElementById("gray-background");
const resetModalButton = document.getElementById("reset-btn");
const getMoreLinksBtns = document.querySelectorAll(".more-links-button");
const submitButton = document.querySelector(".submit-button");
const linkInvalid = document.querySelector(".invalid");

const numOfItems = document.getElementById("total-items");
const totalCost = document.getElementById("total-cost");

const deleteButtons = document.querySelectorAll(".delete-cart-item-button");
const bottomButton = document.querySelector(".bottom-button");

// const checkoutCard = document.getElementById("checkout-card");

// const summaryTitle = document.getElementById("summary-title");
