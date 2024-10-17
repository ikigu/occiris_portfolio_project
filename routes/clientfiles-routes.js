const express = require("express");
const router = express.Router();
const clientControllers = require("../controllers/client-files.controllers");

router.get("/myfiles", clientControllers.getClientFiles);

module.exports = router;
