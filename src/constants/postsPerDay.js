function getDaysInCurrentMonth() {
  // Get the current date
  let now = new Date();

  // Get the current year
  let year = now.getFullYear();

  // Get the current month
  let month = now.getMonth();

  // Get the first day of the next month
  let firstDayOfNextMonth = new Date(year, month + 1, 1);

  // Subtract one day to get the last day of the current month
  let lastDayOfCurrentMonth = new Date(firstDayOfNextMonth - 1);

  // Get the number of days in the current month
  let numberOfDays = lastDayOfCurrentMonth.getDate();

  return numberOfDays;
}

const postsPerDay = 6;
const daysInCurrentMonth = getDaysInCurrentMonth();
const postsPerMonth = postsPerDay * daysInCurrentMonth;
// const postsPerMonth = 5

module.exports = {
  postsPerMonth,
};
