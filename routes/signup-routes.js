const express = require("express");
const router = express.Router();
const { text } = require("express");
const signupControllers = require("../controllers/signup.controllers");

router.get("/signup", signupControllers.getSignup);

router.post("/signup", signupControllers.createNewUser);

module.exports = router;
