function getTotalCost(cart) {
  let cost = 0;

  for (const item of cart) {
    cost += item.cost;
  }

  return +cost.toFixed(2);
}

function getItemCost(orderType, minutes) {
  orderType === "both" ? (minutes = minutes * 1.5) : minutes;

  return +minutes.toFixed(2);
}

module.exports = {
  getItemCost: getItemCost,
  getTotalCost: getTotalCost,
};
