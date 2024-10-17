function createHandlebarOptions() {
  return {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./email-templates"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./email-templates"),
    extName: ".handlebars",
  };
}

module.exports = createHandlebarOptions;
