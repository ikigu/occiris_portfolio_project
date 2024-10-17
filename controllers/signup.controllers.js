const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const hbs = require("nodemailer-express-handlebars");
const mailConfig = require("../config/mail-config");

const transporter = mailConfig.initializeTransporter();
const handlebarOptions = mailConfig.createHandlebarOptions();
transporter.use("compile", hbs(handlebarOptions));

function getSignup(req, res) {
  console.log("Somebody wants to sign up!");
  const loginErrorMessage = req.session.loginErroMessage;
  req.session.loginErroMessage = null;

  req.session.save(function () {
    res.render("auth/sign-up", {
      loginErrorMessage: loginErrorMessage,
    });
  });
}

async function createNewUser(req, res, next) {
  const credentials = req.body;
  const enteredEmail = credentials.email.trim().toLowerCase();
  const firstName = credentials.firstName;
  const lastName = credentials.lastName;
  const enteredPassword = credentials.password;
  const businessName = credentials["business-name"];
  const vatId = credentials.vatId;

  const userInstant = new User(enteredEmail, null, null, null, null, null);

  let existingUser;
  try {
    existingUser = await userInstant.find();
  } catch (error) {
    next(error);
  }

  if (existingUser) {
    req.session.loginErroMessage = "User exists! Try logging in.";
    return req.session.save(function () {
      res.redirect("/signup");
    });
  }

  const user = new User(
    enteredEmail,
    enteredPassword,
    firstName,
    lastName,
    businessName,
    vatId
  );

  try {
    await user.save();
  } catch (error) {
    next(error);
  }

  console.log(`${user.firstName} ${user.lastName} just signed up!`);

  const mailOptions = {
    from: "Occiris <support@occiris.com>",
    to: enteredEmail,
    subject: "Welcome to Occiris!",
    template: "welcome",
    context: { firstName: firstName },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Welcome email sending failed");
    } else {
      console.log(`${firstName} ${lastName} signed up!`);
    }
  });

  res.redirect("/login");
}

module.exports = {
  getSignup: getSignup,
  createNewUser: createNewUser,
};
