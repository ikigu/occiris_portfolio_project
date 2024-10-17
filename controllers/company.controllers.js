const path = require("path");
const fs = require("fs");

function getHomePage(req, res) {
  const cookieBannerUnderstood = req.session.cookieBannerUnderstood;

  if (!req.session.oldVisitor) {
    console.log(`You have a new visitor to the site!`);
  }

  req.session.oldVisitor = true;

  res.render("company/homepage/index", {
    cookieBannerUnderstood: cookieBannerUnderstood,
  });
}

function cookieBannerUnderstood(req, res) {
  const message = req.body.message;
  if (message == "agreed") {
    req.session.cookieBannerUnderstood = true;
  }
  req.session.save();
}

function getSitemap(req, res) {
  res.sendFile(path.join(__dirname, "../views/company/sitemap/sitemap.xml"));
}

function getRobotsTXT(req, res) {
  const filePath = path.join(__dirname, "../robots/robots.txt");
  const fileContents = fs.readFileSync(filePath, "utf8");
  res.type("text/plain").send(fileContents);
}

function getCompanyPhilosophy(req, res) {
  res.render("company/about/our-philosophy");
}

function getHowWeStarted(req, res) {
  res.render("company/about/how-we-started");
}

function getPrivacyPolicy(req, res) {
  res.render("company/legal/privacy-policy");
}

function getTermsOfService(req, res) {
  res.render("company/legal/terms-of-service");
}

module.exports = {
  getHomePage: getHomePage,
  cookieBannerUnderstood: cookieBannerUnderstood,
  getSitemap: getSitemap,
  getCompanyPhilosophy: getCompanyPhilosophy,
  getHowWeStarted: getHowWeStarted,
  getPrivacyPolicy: getPrivacyPolicy,
  getTermsOfService: getTermsOfService,
  getRobotsTXT: getRobotsTXT,
};
