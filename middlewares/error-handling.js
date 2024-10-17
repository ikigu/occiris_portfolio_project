function handleErrors(error, req, res, next) {
  console.log(error);

  res.status(500).render("error/error-page", {
    errorMessage: "Something went wrong! Please try again later.",
  });
}

module.exports = handleErrors;
