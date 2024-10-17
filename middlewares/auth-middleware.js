function auth(req, res, next) {
  const user = req.session.user;

  if (!user) {
    return next();
  }

  res.locals.user = user;

  next();
}

module.exports = auth;
