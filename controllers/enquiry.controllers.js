const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "support@occiris.com",
    pass: "mzzvmniyrtteupcn",
  },
});

function getEnquiryForm(req, res) {
  res.render("company/contact-us/enquiry");
}

function makeEnquiry(req, res) {
  const formData = req.body;
  const name = formData.name;
  const email = formData.email;
  const companyName = formData.companyName;
  const volume = formData.volume;
  const optionalMessage = formData.optionalMessage;

  const mailOptions = {
    from: "Occiris <support@occiris.com>",
    to: "ikigu.geo@gmail.com",
    subject: "You have an enquiry!",
    text: `Hi! You have an enquiry from ${name} of email address, ${email} and ${companyName}. They have an estimated volume of ${volume} hours.
      
      This is their message: "${optionalMessage}"`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.json({ message: "Server error. Please try again later." });
    } else {
      return res.json({
        message:
          "Your request has been received. A member of our team will be in touch shortly.",
      });
    }
  });
}

module.exports = {
  getEnquiryForm: getEnquiryForm,
  makeEnquiry: makeEnquiry,
};
