const addDateSuffix = (date) => {
  let dateStr = date.toString();

  const lastChar = dateStr.charAt(dateStr.length - 1);

  if (lastChar === '1' && dateStr !== '11') {
      dateStr = `${dateStr}st`;
  } else if (lastChar === '2' && dateStr !== '12') {
      dateStr = `${dateStr}nd`;
  } else if (lastChar === '3' && dateStr !== '13') {
      dateStr = `${dateStr}rd`;
  } else {
      dateStr = `${dateStr}th`;
  }

return dateStr;
};

module.exports = (timestamp, { monthLength = 'short', dateSuffix = true } = {}) => {
  const monthsShort = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const monthsLong = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dateObj = new Date(timestamp);
  const months = monthLength === 'short' ? monthsShort : monthsLong;
  const formattedMonth = months[dateObj.getMonth()];

  const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();
  const year = dateObj.getFullYear();

  let hour = dateObj.getHours() > 12 ? Math.floor(dateObj.getHours() / 2) : dateObj.getHours();
  hour = hour === 0 ? 12 : hour;

  const minutes = dateObj.getMinutes();

  const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes < 10 ? '0' : ''}${minutes} ${periodOfDay}`;

  return formattedTimeStamp;
};