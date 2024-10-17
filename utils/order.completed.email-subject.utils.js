// Email subject for notifying client that an order has been completed
// This function determines what subject to use depending on order type

function createEmailSubject(orderType) {
  if (orderType == "captions") {
    return "Your captions are ready!";
  } else if (orderType == "transcript") {
    return "Your transcript is ready!";
  } else {
    return "Your files are ready!";
  }
}

module.exports =  createEmailSubject