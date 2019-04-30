const longMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const longWeekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const shortWeekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const format = (oDate, sFormat) => {
  var year = oDate.getFullYear().toString();
  var monthIndex = oDate.getMonth();
  var month = (monthIndex + 1).toString();
  var paddedMonth = month;
  if (month.length < 2) {
    paddedMonth = "0" + month;
  }
  var day = oDate.getDate().toString();
  var paddedDay = day;
  if (day.length < 2) {
    paddedDay = "0" + day;
  }
  var dayOfWeekIndex = oDate.getDay();
  var hour = oDate.getHours().toString();
  var paddedHour = hour;
  if (hour.length < 2) {
    paddedHour = "0" + hour;
  }
  var minute = oDate.getMinutes().toString();
  var paddedMinute = minute;
  if (minute.length < 2) {
    paddedMinute = "0" + minute;
  }
  var second = oDate.getSeconds().toString();
  var paddedsecond = second;
  if (second.length < 2) {
    paddedsecond = "0" + second;
  }
  var millisecond = oDate.getMilliseconds().toString();

  var sDate = sFormat;
  var regex = /YYYY/g;
  sDate = sDate.replace(regex, year);
  regex = /YY/g;
  sDate = sDate.replace(regex, year.substr(-2));

  regex = /MMMM/g;
  sDate = sDate.replace(regex, longMonths[monthIndex]);
  regex = /MMM/g;
  sDate = sDate.replace(regex, shortMonths[monthIndex]);
  regex = /MM/g;
  sDate = sDate.replace(regex, paddedMonth);
  regex = /M(?!(ar|arch|ay))/g;
  sDate = sDate.replace(regex, month);

  regex = /DDDD/g;
  sDate = sDate.replace(regex, longWeekDays[dayOfWeekIndex]);
  regex = /DDD/g;
  sDate = sDate.replace(regex, shortWeekDays[dayOfWeekIndex]);
  regex = /DD/g;
  sDate = sDate.replace(regex, paddedDay);
  regex = /D(?!(ec|ecember))/g;
  sDate = sDate.replace(regex, day);

  regex = /HH/g;
  sDate = sDate.replace(regex, paddedHour);
  regex = /H/g;
  sDate = sDate.replace(regex, hour);

  regex = /mm/g;
  sDate = sDate.replace(regex, paddedMinute);
  regex = /m/g;
  sDate = sDate.replace(regex, minute);

  regex = /ss/g;
  sDate = sDate.replace(regex, paddedsecond);
  regex = /s/g;
  sDate = sDate.replace(regex, second);

  regex = /fffff/g;
  sDate = sDate.replace(regex, millisecond.substring(0, 5));
  regex = /ffff/g;
  sDate = sDate.replace(regex, millisecond.substring(0, 4));
  regex = /fff/g;
  sDate = sDate.replace(regex, millisecond.substring(0, 3));
  regex = /ff/g;
  sDate = sDate.replace(regex, millisecond.substring(0, 2));
  regex = /f/g;
  sDate = sDate.replace(regex, millisecond.substring(0, 1));

  return sDate;
};
