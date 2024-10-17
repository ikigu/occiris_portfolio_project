const express = require("express");
const router = express.Router();
const enquiryControllers = require("../controllers/enquiry.controllers");

router.get("/contact-sales", enquiryControllers.getEnquiryForm);

router.post("/enquiries/submit", enquiryControllers.makeEnquiry);

module.exports = router;
