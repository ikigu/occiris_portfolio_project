const User = require("../models/user");
const handleInvalidCredentials = require("../utils/auth.invalid-login-credentials");

function getLogin(req, res) {
  console.log("Log in page requested");

  const loginErrorMessage = req.session.loginErrorMessage;
  const enteredDetails = req.session.enteredDetails;
  const isAuthenticated = res.locals.isAuth;

  req.session.loginErrorMessage = null;
  req.session.enteredDetails = null;

  if (isAuthenticated) {
    return res.redirect("/myfiles");
  }

  req.session.save(function () {
    res.render("auth/log-in", {
      loginErrorMessage: loginErrorMessage,
      enteredDetails: enteredDetails,
    });
  });
}

async function loginUser(req, res, next) {
  const credentials = req.body;
  const enteredEmail = credentials.email.toLowerCase();
  const enteredPassword = credentials.password;
  const rememberMe = credentials.checkbox;
  const wantsCheckout = req.session.wantsCheckout;

  const user = new User(enteredEmail, enteredPassword);

  let existingUser;

  try {
    existingUser = await user.find();
  } catch (error) {
    return next(error);
  }

  if (!existingUser) {
    return handleInvalidCredentials(req, res, enteredEmail, enteredPassword);
  }

  let passwordIsCorrect;

  try {
    passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);
  } catch (error) {
    return next(error);
  }

  if (!passwordIsCorrect) {
    return handleInvalidCredentials(req, res, enteredEmail, enteredPassword);
  }

  const loggedInUser = {
    id: existingUser._id.toString(),
    email: existingUser.email,
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    isAdmin: existingUser.isAdmin,
    isAuth: true,
  };

  req.session.user = loggedInUser;
  req.session.loginErrorMessage = null;
  req.session.enteredDetails = null;

  console.log(`${loggedInUser.firstName} ${loggedInUser.lastName} logged in.`);

  if (!rememberMe) {
    req.session.cookie.maxAge = 1000 * 60 * 15; // 15 minutes
  }

  if (existingUser.isAdmin) {
    return req.session.save(function () {
      res.redirect("/admin");
    });
  } else if (wantsCheckout) {
    req.session.wantsCheckout = null;
    return req.session.save(function () {
      res.redirect("/checkout");
    });
  } else {
    return req.session.save(function () {
      res.redirect("/myfiles");
    });
  }
}

function logout(req, res) {
  console.log(`A user logged out.`);

  req.session.user = null;

  req.session.save(function () {
    res.redirect("/");
  });
}

module.exports = {
  getLogin: getLogin,
  loginUser: loginUser,
  logout: logout,
};
