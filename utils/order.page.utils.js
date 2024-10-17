function createOrderPageHeading(orderType) {
  let heading;

  if (orderType == "captions") {
    heading = "Order English Closed Captions";
  } else if (orderType == "transcript") {
    heading = "Order English Transcripts";
  } else if (orderType == "both") {
    heading = "Order Both English Closed Captions and Transcripts";
  }

  return heading;
}

function textOnAddLinksButton(orderType) {
  let text;

  if (orderType == "both") {
    text = "Add YouTube links to get your estimate ($1.50/min)";
  } else {
    text = "Add YouTube links to get your estimate ($1.00/min)";
  }

  return text;
}

function createOrderPageTitle(orderType) {
  let title;

  if (orderType == "captions") {
    title = "Order Closed Captions for YouTube";
  } else if (orderType == "transcript") {
    title = "Order Transcript";
  } else {
    title = "Order Both";
  }

  return title;
}

module.exports = {
  createOrderPageHeading: createOrderPageHeading,
  textOnAddLinksButton: textOnAddLinksButton,
  createOrderPageTitle: createOrderPageTitle,
};
