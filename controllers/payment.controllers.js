const paypal = require("@paypal/checkout-server-sdk");
const mailConfig = require("../config/mail-config");
const { text } = require("express");
const hbs = require("nodemailer-express-handlebars");
const transporter = mailConfig.initializeTransporter();
const handlebarOptions = mailConfig.createHandlebarOptions();
const Order = require("../models/order");
const orderDetails = require("../utils/order.creation.details");
const costCalcs = require("../utils/cart.cost-calc.utils");

transporter.use("compile", hbs(handlebarOptions));

const Environment =
  process.env.NODE_ENV === "production"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);

async function makePayment(req, res) {
  const request = new paypal.orders.OrdersCreateRequest();
  const cart = req.session.cart;

  const items = [];

  for (const item of cart) {
    const list = {
      name: item.name,
      unit_amount: { currency_code: "USD", value: item.cost },
      quantity: "1",
    };
    items.push(list);
  }

  request.prefer("return=representation");

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: costCalcs.getTotalCost(cart),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: costCalcs.getTotalCost(cart),
            },
          },
        },
        items: items,
      },
    ],
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function createOrders(req, res) {
  let cart = req.session.cart;

  async function saveOrders(cart, req) {
    const userIsAdmin = res.locals.user.isAdmin;

    for (const item of cart) {
      const order = new Order(req, item);

      try {
        result = await order.save();
      } catch (error) {
        console.log(error);
        if (!userIsAdmin) {
          return res.json({
            message:
              "We couldn't create your order. Please contact us at support@occiris.com to sort this.",
          });
        } else {
          return res.json({ message: "Order was not saved." });
        }
      }
    }
  }

  // Notify customer that order has been created

  const mailOptions = {
    from: "Occiris <ikigu.geo@gmail.com>",
    to: orderDetails.emailToUse(req),
    subject: "Your order has been received!",
    template: "order-received",
    context: {
      cart: cart,
      totalCost: costCalcs.getTotalCost(cart).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      date: new Date().toLocaleString(),
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(
        `Mail sending failed\nClient name: ${orderDetails.nameToUse(req)}`
      );
    } else {
      console.log(
        `"Order received" email sent to ${orderDetails.nameToUse(req)}`
      );
    }
  });

  // Create orders and empty cart

  saveOrders(cart, req).then(function () {
    console.log(`${res.locals.user.firstName} just placed an order!`);
  });

  req.session.cart = [];

  // Send response

  req.session.save(function () {
    res.json({
      message: "You order has been placed successfully!",
    });
  });
}

module.exports = {
  makePayment: makePayment,
  createOrders: createOrders,
};
