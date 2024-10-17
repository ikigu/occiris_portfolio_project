// These functions are used to determine which name or email address to use in the order model
// If an admin is creating an order, they're prompted to enter client's email address before placing the order.
// If a client is placing an order, the email and name to use are retrieved from the session

function nameToUse(req) {
  let clientName;
  if (req.body.name) {
    clientName = req.body.name;
  } else {
    clientName = req.session.user.firstName + " " + req.session.user.lastName;
  }
  return clientName;
}

function emailToUse(req) {
  let clientEmail;
  if (req.body.email) {
    clientEmail = req.body.email;
  } else {
    clientEmail = req.session.user.email;
  }
  return clientEmail;
}

module.exports = {
  nameToUse: nameToUse,
  emailToUse: emailToUse,
};
