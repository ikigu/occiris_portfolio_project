const Order = require("../models/order");
const timeAgo = require("../utils/time/time-ago");

async function getClientFiles(req, res, next) {
  if (res.locals.user.isAdmin) {
    return res.redirect("/admin");
  }

  const order = new Order(req);

  let orders;
  try {
    orders = await order.findSingleClientOrders();
  } catch (error) {
    return next(error);
  }

  // console.log(timeAgo(Date.parse(orders[0].date.placed)));

  console.log(
    `${res.locals.user.firstName} ${res.locals.user.lastName} requested their files page.`
  );

  res.render("customer/dashboard", {
    orders: orders.reverse(),
    timeAgo: timeAgo,
  });
}

module.exports = {
  getClientFiles: getClientFiles,
};
