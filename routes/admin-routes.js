const adminControllers = require("../controllers/admin.controllers");

const express = require("express");
const router = express.Router();
const Multer = require("multer");
const multer = Multer({
  storage: Multer.memoryStorage(),
});

router.get("/admin", adminControllers.getAdmin);

router.post(
  "/admin/send-files",
  multer.single("file"),
  adminControllers.uploadFile
);

module.exports = router;
