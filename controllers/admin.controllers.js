const createEmailSubject = require("../utils/order.completed.email-subject.utils");
const Order = require("../models/order");
const mailConfig = require("../config/mail-config");
const timeAgo = require("../utils/time/time-ago");

const hbs = require("nodemailer-express-handlebars");
const transporter = mailConfig.initializeTransporter();
const handlebarOptions = mailConfig.createHandlebarOptions();

const { Storage } = require("@google-cloud/storage");

let projectId = "peak-theorem-371221";
let keyFilename = "mykey.json";
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("occiris");

transporter.use("compile", hbs(handlebarOptions));

async function getAdmin(req, res, next) {
  let allOrders;

  try {
    allOrders = await Order.findAll();
  } catch (error) {
    next(error);
  }

  res.render("admin/dashboard", {
    allOrders: allOrders.reverse(),
    timeAgo: timeAgo,
  });
}

async function uploadFile(req, res, next) {
  const fileName = req.file.originalname;

  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream();
  blobStream.on("finish", function () {
    res.status(200).send("success");
  });
  blobStream.end(req.file.buffer);

  const url = `https://storage.googleapis.com/occiris/${fileName}`;

  const orderInstance = new Order(null, null, req.body.orderId, url);

  let result;

  try {
    result = await orderInstance.markAsComplete();
  } catch (error) {
    next(error);
  }

  const order = result.value;

  const mailOptions = {
    from: "Occiris <support@occiris.com>",
    to: order.client.email,
    subject: createEmailSubject(order.type),
    template: "order-completed",
    context: { orderName: order.name },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(
        `"Order completed" mail sending failed.\nClient name: ${order.client.name}\nClient email: ${order.client.email}\nOrder name: ${order.name}`
      );
      return res.json({ message: "fail" });
    } else {
      console.log(`"Order completed" email sent to ${order.client.name}`);
      res.json({ message: "success" });
    }
  });
}

module.exports = {
  getAdmin: getAdmin,
  uploadFile: uploadFile,
};
