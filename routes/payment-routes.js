require("dotenv").config();
const express = require("express");
const router = express.Router();
const paymentControllers = require("../controllers/payment.controllers")

//change the below end-point to pay/paypal

router.post("/create-order", paymentControllers.makePayment);

// change the below end-point to order/create

router.post("/order-successful", paymentControllers.createOrders);

module.exports = router;
