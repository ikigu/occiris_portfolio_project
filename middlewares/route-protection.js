function protectRoutes(req, res, next) {
  const userIsAuthenticated = res.locals.user;

  if (!userIsAuthenticated) {
    req.session.loginErrorMessage = "Please log in first.";
    return req.session.save(() => res.redirect("/login"));
  }

  if (req.path.startsWith("/admin") && !res.locals.user.isAdmin) {
    return res.status(403).render("/error/error-page", {
      errorMessage: "You're not allowed to view this page!",
    });
  }

  next();
}

module.exports = protectRoutes;
