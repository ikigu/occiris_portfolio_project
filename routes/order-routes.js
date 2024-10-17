const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/order.controllers");

router.get("/order/:type", orderControllers.getOrderPage);

router.post("/cart/add/:type", orderControllers.addToCart);

router.get("/cart/mine", orderControllers.fetchCart);

router.post("/cart/delete/:cartItemID", orderControllers.deleteCartItem);

module.exports = router;
