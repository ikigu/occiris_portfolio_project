const costCalcs = require("../utils/cart.cost-calc.utils");

async function getCustomerCheckoutPage(req, res) {
  const authenticationStatus = res.locals.user;

  if (!authenticationStatus) {
    req.session.wantsCheckout = true;
    req.session.loginErrorMessage = "Please login so you can checkout.";
    return req.session.save(function () {
      res.redirect("/login");
    });
  } else if (res.locals.user.isAdmin) {
    return res.redirect("/admin/checkout");
  } else {
    console.log(
      `${res.locals.user.firtName} ${res.locals.user.lastName} requested the checkout page`
    );
    res.render("checkout/customer-checkout", {
      totalCost: costCalcs.getTotalCost(req.session.cart),
      paypalClientId: process.env.PAYPAL_CLIENT_ID,
    });
  }
}

function getAdminCheckoutPage(req, res) {
  res.render("admin/admin-checkout");
}

module.exports = {
  getCustomerCheckoutPage: getCustomerCheckoutPage,
  getAdminCheckoutPage: getAdminCheckoutPage,
};
