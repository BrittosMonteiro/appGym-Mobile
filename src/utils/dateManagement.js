export function getWeekNumber() {
  const date = new Date();
  const newDate = new Date();

  newDate.setDate(date.getDate() + (0 - (date.getDay() || 7)));

  const year = newDate.getFullYear();

  const firstThursday = new Date(
    year,
    0,
    1 + (0 - (new Date(year, 0, 1).getDay() || 7)),
  );
  const weekNumber = Math.ceil(((newDate - firstThursday) / 86400000 + 1) / 7);

  return weekNumber;
}

export function getTotalWeeksInYear() {
  const year = new Date().getFullYear();
  const firstDayOfYear = new Date(year, 0, 1);

  const firstDayOfWeek = firstDayOfYear.getDay();

  if (firstDayOfWeek !== 4 || !isLeapYear(year)) {
    return 52;
  }
  return 53;
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
