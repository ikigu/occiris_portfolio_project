function createNodemailerTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ikigu.geo@gmail.com",
      pass: process.env.MAILER_PASSWORD,
    },
  });
}

module.exports = createNodemailerTransporter; 