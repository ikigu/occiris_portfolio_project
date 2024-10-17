const express = require("express");
const router = express.Router();
const companyControllers = require("../controllers/company.controllers");

router.get("/", companyControllers.getHomePage);

router.post("/", companyControllers.cookieBannerUnderstood);

router.get("/our-philosophy", companyControllers.getCompanyPhilosophy);

router.get("/how-we-started", companyControllers.getHowWeStarted);

router.get("/privacy-policy", companyControllers.getPrivacyPolicy);

router.get("/terms", companyControllers.getTermsOfService);

router.get("/sitemap.xml", companyControllers.getSitemap);

router.get("/robots.txt", companyControllers.getRobotsTXT);

module.exports = router;
