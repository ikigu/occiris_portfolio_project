const { v4: uuidv4 } = require("uuid");

function csrf(req, res, next) {
  const tokenExpiryDuration = 15 * 60 * 1000; // 15 minutes in milliseconds

  if (!req.body.csrf) {
    const csrfToken = uuidv4();
    const tokenExpiry = Date.now() + tokenExpiryDuration; // Set the token's expiry timestamp
    res.locals.csrf = csrfToken;
    req.session.csrf = { token: csrfToken, expiry: tokenExpiry };
    return next();
  }

  const storedToken = req.session.csrf;
  const serverToken = storedToken.token;
  const serverExpiry = storedToken.expiry;
  const clientToken = req.body.csrfToken;

  if (serverToken !== clientToken || Date.now() > serverExpiry) {
    const error = new Error("Invalid csrf token or token has expired");
    return next(error);
  }

  req.session.csrf = null;
  res.locals.csrf = null;

  req.session.save(() => next());
}

module.exports = csrf;
