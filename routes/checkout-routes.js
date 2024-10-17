const express = require("express");
const router = express.Router();
const checkoutControllers = require("../controllers/checkout.controllers");

router.get("/checkout", checkoutControllers.getCustomerCheckoutPage);

router.get("/admin/checkout", checkoutControllers.getAdminCheckoutPage);

module.exports = router;
