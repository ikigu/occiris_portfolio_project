const express = require("express");
const path = require("path");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const User = require("../models/user");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "support@occiris.com",
    pass: "mzzvmniyrtteupcn",
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./email-templates"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./email-templates"),
  extName: ".handlebars",
};
transporter.use("compile", hbs(handlebarOptions));

router.get("/forgot-password", function (req, res) {
  res.render("auth/forgot-password");
});

router.post("/get-pwd-reset-link", async function (req, res) {
  const enteredEmail = req.body.enteredEmail;

  const pwdResetToken = uuidv4();
  const user = new User(
    enteredEmail,
    null,
    null,
    null,
    null,
    null,
    null,
    pwdResetToken
  );

  let result;

  try {
    result = await user.setPasswordResetToken();
  } catch (error) {
    console.log(error);
    // It appears that mongodb always returns a success. Fix this later.
  }

  if (result.modifiedCount) {
    const mailOptions = {
      from: "Occiris Support <support@occiris.com>",
      to: enteredEmail,
      subject: "Password reset",
      template: "password-reset",
      context: { pwdResetToken: pwdResetToken },
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Mail sending failed");
      } else {
        console.log(`Password reset token successfully sent to ${firstName}`);
      }
    });
  }

  req.session.userEmail = enteredEmail;

  req.session.save(function () {
    res.json({
      message:
        "We've just sent you the password reset link if the email entered is in our system.",
    });
  });
});

router.get("/change-password/:token", function (req, res) {
  const resetToken = req.params.token;

  res.render("auth/change-password", {
    resetToken: resetToken,
  });
});

router.post("/change-password/:token", async function (req, res, next) {
  const pwdResetToken = req.params.token;
  const newPassword = req.body.newPassword;

  const user = new User(
    null,
    newPassword,
    null,
    null,
    null,
    null,
    null,
    pwdResetToken
  );

  let result;

  try {
    result = await user.changePasswordWithToken();
  } catch (error) {
    next(error);
  }

  if (!result.acknowledged) {
    return res.json({ message: "Server error. Try again later." });
  } else if (!result.matchedCount) {
    return res.json({ message: "Your reset link is invalid." });
  }

  res.json({ message: "Password change successful!" });
});

// password reset on client dashboard

router.post("/password-change", async function (req, res) {
  const newPassword = req.body.newPassword;

  const user = new User(
    null,
    newPassword,
    null,
    null,
    null,
    null,
    req.session.user.id,
    null
  );

  let result;
  try {
    result = await user.changePasswordWithId();
  } catch (error) {
    next(error);
  }

  if (result.modifiedCount && result.matchedCount) {
    res.json({ message: "Password change successful!" });
  } else {
    res.json({ message: "Password change failed. Please try again later." });
  }
});

module.exports = router;
