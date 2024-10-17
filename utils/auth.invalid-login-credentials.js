function handleInvalidLoginCredentials(
  req,
  res,
  enteredEmail,
  enteredPassword
) {
  req.session.loginErrorMessage = "Invalid e-mail or password.";
  req.session.enteredDetails = {
    enteredEmail: enteredEmail,
    enteredPassword: enteredPassword,
  };
  return req.session.save(function () {
    res.redirect("/login");
  });
}

module.exports = handleInvalidLoginCredentials;
