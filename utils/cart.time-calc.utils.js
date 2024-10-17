function getColonNotation(time) {
  if (!time.days && !time.hours && !time.minutes) {
    return `00:${time.seconds.toString().padStart(2, "0")}`;
  } else if (!time.days && !time.hours) {
    return `${time.minutes.toString().padStart(2, "0")}:${time.seconds
      .toString()
      .padStart(2, "0")}`;
  } else if (!time.days) {
    return `${time.hours.toString().padStart(2, "0")}:${time.minutes
      .toString()
      .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;
  } else {
    return `${time.day.toString().padStart(2, "0")}:${time.hours
      .toString()
      .padStart(2, "0")}:${time.minutes
      .toString()
      .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;
  }
}

function toMinutes(time) {
  let minutes;

  minutes =
    time.days * 24 * 60 + time.hours * 60 + time.minutes + time.seconds / 60;

  return +minutes.toFixed(2);
}

function calculateETA(duration) {
  if (duration < 10) {
    return "6 hours";
  } else if (duration < 20) {
    return "7 hours";
  } else if (duration < 30) {
    return "8 hours";
  } else if (duration < 40) {
    return "12 hours";
  } else if (duration < 50) {
    return "1 day";
  } else if (duration < 120) {
    return "2 days";
  } else {
    return "3 days";
  }
}

module.exports = {
  getColonNotation: getColonNotation,
  toMinutes: toMinutes,
  calculateETA: calculateETA,
};
