const second = 1000; // a moment ago, less than 1000 ? just now
const minute = 60000; // 1 min ago, 2 mins ago
const hour = 3600000; // 1 hr ago, 2 hrs ago
const day = 86400000; // 1 day ago, 2 day ago
const week = 604800000; // 1 wk ago, 2
const month = 2629746000; // 1 month ago, 2 months ago
const year = 31557600000; // 1 yr ago, 2 yrs ago

// check if greater than a year, divide by year, give result
// Repeat for all other time dimensions

function giveTimeBlock(timePeriod) {
  if (timePeriod == year || timePeriod > month * 12) {
    return "year";
  } else if (timePeriod == month) {
    return "month";
  } else if (timePeriod == week) {
    return "wk";
  } else if (timePeriod == day) {
    return "day";
  } else if (timePeriod == hour) {
    return "hr";
  } else if (timePeriod == minute) {
    return "min";
  } else if (timePeriod == second) {
    return "second";
  }
}

function giveTimeAgo(difference, timePeriod) {
  const blocks = difference / timePeriod;

  return blocks < 2
    ? `1 ${giveTimeBlock(timePeriod)} ago`
    : `${Math.floor(blocks)} ${giveTimeBlock(timePeriod)}s ago`;
}

function timeAgo(timePast) {
  const difference = Date.now() - new Date(timePast);

  let returnValue;

  if (difference >= year) {
    returnValue = giveTimeAgo(difference, year);
  } else if (difference >= month) {
    returnValue = giveTimeAgo(difference, month);
  } else if (difference >= week) {
    returnValue = giveTimeAgo(difference, week);
  } else if (difference >= day) {
    returnValue = giveTimeAgo(difference, day);
  } else if (difference >= hour) {
    returnValue = giveTimeAgo(difference, hour);
  } else if (difference >= minute) {
    returnValue = giveTimeAgo(difference, minute);
  } else if (difference >= second) {
    returnValue = giveTimeAgo(difference, second);
  } else {
    returnValue = "just now";
  }

  return returnValue;
}

module.exports = timeAgo;
