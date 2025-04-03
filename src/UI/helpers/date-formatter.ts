export default function formattedDate(date: string): string {
  const [dayStr, monthStr, yearStr] = date.split("/");
  let day = parseInt(dayStr, 10);
  let month = parseInt(monthStr, 10);
  let year = parseInt(yearStr, 10);

  // Ensure year is always 4 digits
  year = Math.max(0, year);
  const formattedYear = year.toString().padStart(4, "0");

  // Adjust month if greater than 12
  if (month > 12) {
    month = 1;
  }

  // Adjust day based on month
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    // Leap year adjustment for February
    daysInMonth[1] = 29;
  }
  if (day > daysInMonth[month - 1]) {
    day = daysInMonth[month - 1];
  }

  // Adjust day if greater than 31
  if (day > 31) {
    day = 1;
  }

  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");

  return `${formattedYear}/${formattedMonth}/${formattedDay}`;
}
