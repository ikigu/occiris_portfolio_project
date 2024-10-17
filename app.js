const path = require("path");
require("dotenv").config();

const express = require("express");
const app = express();

const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");
const MongoDBStore = mongodbStore(session);

const db = require("./data/database");

const sessionConfig = require("./config/session-config");

const adminRoutes = require("./routes/admin-routes");
const loginRoutes = require("./routes/login-routes");
const checkoutRoutes = require("./routes/checkout-routes");
const clientfilesRoutes = require("./routes/clientfiles-routes");
const companyRoutes = require("./routes/company-routes");
const enquiryRoutes = require("./routes/enquiry-routes");
const guideRoutes = require("./routes/guide-routes");
const orderRoutes = require("./routes/order-routes");
const paymentRoutes = require("./routes/payment-routes");
const signupRoutes = require("./routes/signup-routes");
const pwdChangeRoutes = require("./routes/pwd-change-routes");

const authMiddleware = require("./middlewares/auth-middleware");
const errorMiddleware = require("./middlewares/error-handling");
const routeProtectionMiddleware = require("./middlewares/route-protection");
const csrfMiddleware = require("./middlewares/csrf");

let mongoDbURL = "mongodb://127.0.0.1:27017";

if (process.env.MONGODB_URL) {
  mongoDbURL = process.env.MONGODB_URL;
}

const sessionStore = new MongoDBStore(
  sessionConfig.createSessionStore(mongoDbURL)
);

app.use(session(sessionConfig.createSessionCookie(sessionStore)));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(function (req, res, next) {
  if (!req.session.cart) {
    req.session.cart = [];
  }

  next();
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(authMiddleware);
app.use(csrfMiddleware); // Might need to configure some json responses.

app.use(companyRoutes);
app.use(orderRoutes);
app.use(signupRoutes);
app.use(loginRoutes);
app.use(paymentRoutes);
app.use(enquiryRoutes);
app.use(guideRoutes);
app.use(pwdChangeRoutes);
app.use(checkoutRoutes);

app.use(routeProtectionMiddleware);

app.use(clientfilesRoutes);
app.use(adminRoutes);

app.use(errorMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(8080);
  })
  .then(function () {
    console.log("Server started on port 8080");
  });
