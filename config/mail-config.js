const nodemailer = require("nodemailer");
const path = require("path");

function initializeTransporter() {
  const nodemailerOptions = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ikigu.geo@gmail.com",
      pass: process.env.MAILER_PASSWORD,
    },
  });
  return nodemailerOptions;
}

function createHandlebarOptions() {
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./email-templates"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./email-templates"),
    extName: ".handlebars",
  };
  return handlebarOptions;
}

function createMailOptions(receiver, subject, template, context) {
  const mailOptions = {
    from: "Occiris <ikigu.geo@gmail.com>",
    to: receiver,
    subject: subject,
    template: template,
    context: context,
  };

  return mailOptions;
}

module.exports = {
  initializeTransporter: initializeTransporter,
  createHandlebarOptions: createHandlebarOptions,
  createMailOptions: createMailOptions
};
