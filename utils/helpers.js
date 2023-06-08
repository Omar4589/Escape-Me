// Import dayjs and its customParseFormat plugin for handling dates and times
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

// Helper function to format dates
const formatDate = (date) => {
  // Format the date to "Month Day, Year" format
  //The dayjs() method takes in a date, if empty, it uses today's date ie.	"June 5, 2023"
  return dayjs(date).format('MMMM D, YYYY');
};

// Helper function to format times
const formatTime = (time) => {
  // Parse the time in the "HH:mm" format
  const parsedTime = dayjs(time, 'HH:mm');

  // Format the parsed time in the "hh:mm A" format ie. "03:31pm"
  return parsedTime.format('hh:mm A');
};

//Export both funcitons
module.exports = { formatDate, formatTime };
