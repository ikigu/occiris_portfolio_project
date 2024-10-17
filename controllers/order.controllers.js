const { v4: uuidv4 } = require("uuid");
const { google } = require("googleapis");
const time = require("iso8601-duration");
const orderPage = require("../utils/order.page.utils");
const costCalcs = require("../utils/cart.cost-calc.utils");
const timeCalcs = require("../utils/cart.time-calc.utils");
const getVideoId = require("../utils/cart.youtubeID.utils");
const cartUtils = require("../utils/cart.00.general.utils");

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_AUTH,
});

function getOrderPage(req, res) {
  const orderType = req.params.type;

  console.log(`The ${orderType} order page was requested.`);

  if (
    orderType !== "captions" &&
    orderType !== "transcript" &&
    orderType !== "both"
  ) {
    const errorMessage = "Error: Page could not found";
    return res
      .status(404)
      .render("error/error-page", { errorMessage: errorMessage });
  }

  res.render("cart/order/order-page", {
    title: orderPage.createOrderPageTitle(orderType),
    heading: orderPage.createOrderPageHeading(orderType),
    btntext: orderPage.textOnAddLinksButton(orderType),
    orderType: orderType,
  });
}

function fetchCart(req, res) {
  const cart = req.session.cart;
  const totalCost = costCalcs.getTotalCost(cart);

  res.json({ cart, totalCost });
}

async function addToCart(req, res, next) {
  const orderType = req.params.type;
  const cart = req.session.cart;
  const videoID = getVideoId(req.body.link.trim());

  // Fetch video details from YouTube API

  let response;

  try {
    response = await youtube.videos.list({
      part: ["contentDetails", "snippet"],
      id: videoID,
    });
  } catch (error) {
    next(error);
  }

  if (response.data.items.length == 0) {
    return res.json({ message: "This video is not available on YouTube." });
  }

  // Create cart item
  const timeObject = time.parse(response.data.items[0].contentDetails.duration);
  const minutes = timeCalcs.toMinutes(timeObject);
  const newCartItem = {
    name: response.data.items[0].snippet.title,
    id: uuidv4(),
    type: orderType,
    cost: costCalcs.getItemCost(orderType, minutes),
    youtube: {
      link: req.body.link.trim(),
      id: videoID,
    },
    time: {
      object: timeObject,
      colonNotation: timeCalcs.getColonNotation(timeObject),
      minutes: minutes,
      eta: timeCalcs.calculateETA(minutes),
    },
  };

  // Add item to cart and send it to client
  cart.push(newCartItem);
  req.session.cart = cart;
  req.session.save(function () {
    res.redirect("/cart/mine");
  });
}

function deleteCartItem(req, res) {
  const cartItemID = req.params.cartItemID;
  const cart = req.session.cart;

  const itemRemoved = cart.splice(
    cartUtils.findCartItemIndex(cart, cartItemID),
    1
  );

  req.session.cart = cart;

  if (itemRemoved.length === 1) {
    req.session.save(() => res.redirect("/cart/mine"));
  }
}

module.exports = {
  getOrderPage: getOrderPage,
  addToCart: addToCart,
  deleteCartItem: deleteCartItem,
  fetchCart: fetchCart,
};
