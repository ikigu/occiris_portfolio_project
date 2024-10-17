const express = require("express");
const router = express.Router();

router.get("/guides/how-to-add-closed-captions", function (req, res) {
  res.render("guides/how-to-add-closed-captions-to-your-youtube-video");
});

router.get("/guides/auto-tranlate-captions-upload", function (req, res) {
  res.render("guides/how-to-auto-translate-captions-before-you-upload-them");
});

router.get("/guides/auto-translate-captions-viewing", function (req, res) {
  res.render("guides/auto-translate-captions-during-viewing");
});

module.exports = router;
