const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const formatDate = (date) => {
  return dayjs(date).format("MMMM D, YYYY");
};

const formatTime = (time) => {
  // Parse the time in the "HH:mm" format
  const parsedTime = dayjs(time, "HH:mm");

  // Format the parsed time in the "hh:mm A" format
  return parsedTime.format("hh:mm A");
};

module.exports = { formatDate, formatTime };
