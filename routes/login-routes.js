const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth.controllers");

router.get("/login", authControllers.getLogin);

router.post("/login", authControllers.loginUser);

router.get("/logout", authControllers.logout);

module.exports = router;
